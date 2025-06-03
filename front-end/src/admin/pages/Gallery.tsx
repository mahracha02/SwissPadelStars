import { useState, useEffect, useRef } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import DeleteConfirmationModal from '../components/DeleteConfirmationModal';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus, Eye, Pencil, Trash2, Upload, X } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  image: string;
  description: string;
  published: boolean;
}

type GalleryFormData = Omit<GalleryItem, 'id'>;

interface Column {
  key: keyof GalleryItem | 'actions';
  label: string;
  render?: (value: any, item?: GalleryItem) => React.ReactNode;
}

const Gallery = () => {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<GalleryItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();

  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    { 
      key: 'description', 
      label: 'Description',
      render: (value: string) => (
        <div className="max-w-md">
          <p className="truncate" title={value}>
            {value}
          </p>
        </div>
      )
    },
    { 
      key: 'image', 
      label: 'Image',
      render: (value: string) => (
        value ? (
          <img
            src={`https://127.0.0.1:8000${value}`}
            alt="Gallery"
            className="h-16 w-16 object-contain rounded"
          />
        ) : (
          <span className="text-gray-500">Pas d'image</span>
        )
      )
    },
    {
      key: 'published',
      label: 'Published',
      render: (value: boolean) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' 
            : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300'
        }`}>
          {value ? 'Oui' : 'Non'}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (value: any, item?: GalleryItem) => {
        if (!item) return null;
        return (
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTogglePublish(item)}
              className={`p-2 rounded-full transition-colors ${
                item.published
                  ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                  : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
              title={item.published ? 'Dépublier' : 'Publier'}
            >
              <Eye className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleEdit(item)}
              className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors dark:text-blue-400 dark:hover:bg-blue-900/30"
              title="Modifier"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(item)}
              className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors dark:text-red-400 dark:hover:bg-red-900/30"
              title="Supprimer"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://127.0.0.1:8000/api/admin/gallery');
      if (!response.ok) {
        throw new Error('Failed to fetch gallery items');
      }
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching gallery items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setCurrentItem(item);
    setPreviewImage(item.image ? `https://127.0.0.1:8000${item.image}` : null);
    setIsModalOpen(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewImage(base64String);
        // Update form data with base64 string
        if (currentItem) {
          setCurrentItem({
            ...currentItem,
            image: base64String
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (item: GalleryItem) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    try {
      const response = await fetch(`https://127.0.0.1:8000/api/admin/gallery/${itemToDelete.id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete gallery item');
      }
      fetchItems();
    } catch (error) {
      console.error('Error deleting gallery item:', error);
    } finally {
      setDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const itemData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      image: previewImage || currentItem?.image || '',
      published: formData.get('published') === 'true'
    };

    try {
      if (currentItem) {
        const response = await fetch(`https://127.0.0.1:8000/api/admin/gallery/${currentItem.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(itemData),
        });
        if (!response.ok) {
          throw new Error('Failed to update gallery item');
        }
      } else {
        const response = await fetch('https://127.0.0.1:8000/api/admin/gallery', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(itemData),
        });
        if (!response.ok) {
          throw new Error('Failed to create gallery item');
        }
      }
      setIsModalOpen(false);
      setPreviewImage(null);
      fetchItems();
    } catch (error) {
      console.error('Error saving gallery item:', error);
    }
  };

  const handleTogglePublish = async (item: GalleryItem) => {
    try {
      const response = await fetch(`https://127.0.0.1:8000/api/admin/gallery/${item.id}/toggle-publish`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle publish status');
      }
      
      fetchItems();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleCreate = () => {
    setCurrentItem(null);
    setPreviewImage(null);
    setIsModalOpen(true);
  };

  if (loading) {
    return <div className="text-center py-4">Chargement...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark-500 dark:text-brand-blanc">
          Gallery
        </h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Ajouter un élément
        </button>
      </div>

      <DataTable
        data={items}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
        isPublished={(item) => item.published}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setPreviewImage(null);
        }}
        title={currentItem ? "Modifier l'élément" : "Ajouter un élément"}
      >
        <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Titre
            </label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={currentItem?.title}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              defaultValue={currentItem?.description}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>

          <div>
            <label
              htmlFor="image"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Image
            </label>
            <div className="mt-1 flex items-center space-x-4">
              <input
                type="file"
                name="image"
                id="image"
                ref={fileInputRef}
                accept="image/png,image/jpeg"
                onChange={handleImageChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
              >
                <Upload className="w-5 h-5" />
                Choisir une image
              </button>
              {previewImage && (
                <div className="relative w-20 h-20">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-full object-contain rounded"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Formats acceptés: PNG, JPEG. Taille maximale: 2MB
            </p>
          </div>

          <div>
            <label
              htmlFor="published"
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Publié
            </label>
            <select
              name="published"
              id="published"
              defaultValue={currentItem?.published.toString() || "false"}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-700 dark:text-white sm:text-sm"
            >
              <option value="true">Oui</option>
              <option value="false">Non</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(false);
                setPreviewImage(null);
              }}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 rounded-md transition-all duration-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-md transition-all duration-300"
            >
              <span>{currentItem ? 'Mettre à jour' : 'Créer'}</span>
            </button>
          </div>
        </form>
      </Modal>

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Supprimer l'élément"
        itemName={itemToDelete?.title || ''}
      />
    </div>
  );
};

export default Gallery; 