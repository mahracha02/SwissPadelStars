import { useState, useEffect } from 'react';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { useTheme } from '../../contexts/ThemeContext';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

interface Partner {
  id: number;
  name: string;
  logo: string;
  website: string;
  description: string;
  published: boolean;
}

type PartnerFormData = Omit<Partner, 'id' | 'logo'>;

// Temporary mock service until the real one is implemented
const partnersService = {
  getAll: async () => {
    // Mock data
    return [
      {
        id: 1,
        name: 'Partner 1',
        logo: 'logo1.png',
        website: 'https://partner1.com',
        description: 'Description 1',
        published: true,
      },
    ];
  },
  create: async (data: PartnerFormData) => {
    console.log('Creating partner:', data);
  },
  update: async (id: number, data: PartnerFormData) => {
    console.log('Updating partner:', id, data);
  },
  delete: async (id: number) => {
    console.log('Deleting partner:', id);
  },
};

interface Column {
  key: keyof Partner | 'actions';
  label: string;
  render?: (value: any, item?: Partner) => React.ReactNode;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState<Partner | null>(null);
  const { theme } = useTheme();

  const columns: Column[] = [
    {
      key: 'name',
      label: 'Nom',
      render: (value: string, item?: Partner) => (
        <div className={`flex items-center gap-2 ${!item?.published ? 'line-through opacity-50' : ''}`}>
          {item?.logo && (
            <img src={item.logo} alt={value} className="w-8 h-8 object-contain" />
          )}
          <span>{value}</span>
        </div>
      ),
    },
    {
      key: 'website',
      label: 'Site Web',
      render: (value: string, item?: Partner) => (
        <a 
          href={value} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ${!item?.published ? 'line-through opacity-50' : ''}`}
        >
          {value}
        </a>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      render: (value: string, item?: Partner) => (
        <div className={`max-w-md ${!item?.published ? 'line-through opacity-50' : ''}`}>
          {value}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_, item?: Partner) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => item && handleTogglePublish(item)}
            className={`p-2 rounded-full transition-colors ${
              item?.published
                ? 'text-green-600 hover:bg-green-100 dark:hover:bg-green-900/30'
                : 'text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            title={item?.published ? 'Dépublier' : 'Publier'}
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={() => item && handleEdit(item)}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors dark:text-blue-400 dark:hover:bg-blue-900/30"
            title="Modifier"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={() => item && handleDelete(item)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors dark:text-red-400 dark:hover:bg-red-900/30"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ),
    },
  ];

  const fetchPartners = async () => {
    try {
      const response = await fetch('https://127.0.0.1:8001/api/admin/partners');
      if (!response.ok) {
        throw new Error('Failed to fetch partners');
      }
      const data = await response.json();
      setPartners(data);
    } catch (error) {
      console.error('Error fetching partners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePublish = async (partner: Partner) => {
    try {
      const response = await fetch(`https://127.0.0.1:8001/api/admin/partners/${partner.id}/toggle-publish`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to toggle publish status');
      }
      
      fetchPartners();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const handleEdit = (partner: Partner) => {
    setCurrentPartner(partner);
    setIsModalOpen(true);
  };

  const handleDelete = async (partner: Partner) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) {
      try {
        const response = await fetch(`https://127.0.0.1:8001/api/admin/partners/${partner.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete partner');
        }
        fetchPartners();
      } catch (error) {
        console.error('Error deleting partner:', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const partnerData: PartnerFormData = {
      name: formData.get('name') as string,
      website: formData.get('website') as string,
      description: formData.get('description') as string,
      published: formData.get('published') === 'true',
    };

    try {
      if (currentPartner) {
        await partnersService.update(currentPartner.id, partnerData);
      } else {
        await partnersService.create(partnerData);
      }
      setIsModalOpen(false);
      fetchPartners();
    } catch (error) {
      console.error('Error saving partner:', error);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-dark-500 dark:text-brand-blanc">
          Partners
        </h1>
        <button
          onClick={() => {
            setCurrentPartner(null);
            setIsModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add Partner
        </button>
      </div>

      <DataTable
        data={partners}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isPublished={(item: Partner) => item.published}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={currentPartner ? 'Edit Partner' : 'Add Partner'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-dark-500 dark:text-brand-blanc"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={currentPartner?.name}
              required
              className="mt-1 block w-full rounded-md border-primary-200 dark:border-primary-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:text-brand-blanc sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="website"
              className="block text-sm font-medium text-dark-500 dark:text-brand-blanc"
            >
              Website
            </label>
            <input
              type="url"
              name="website"
              id="website"
              defaultValue={currentPartner?.website}
              required
              className="mt-1 block w-full rounded-md border-primary-200 dark:border-primary-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:text-brand-blanc sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-dark-500 dark:text-brand-blanc"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              defaultValue={currentPartner?.description}
              required
              className="mt-1 block w-full rounded-md border-primary-200 dark:border-primary-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:text-brand-blanc sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="published"
              className="block text-sm font-medium text-dark-500 dark:text-brand-blanc"
            >
              Status
            </label>
            <select
              name="published"
              id="published"
              defaultValue={currentPartner?.published ? 'true' : 'false'}
              className="mt-1 block w-full rounded-md border-primary-200 dark:border-primary-700 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-dark-600 dark:text-brand-blanc sm:text-sm"
            >
              <option value="true">Published</option>
              <option value="false">Draft</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-dark-500 bg-primary-100 hover:bg-primary-200 rounded-md transition-all duration-300 hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-dark-500 bg-secondary-500 hover:bg-secondary-600 rounded-md transition-all duration-300 hover:scale-105"
            >
              {currentPartner ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Partners; 