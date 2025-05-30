import { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { Plus } from 'lucide-react';

interface ParticularService {
  id: number;
  title: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  published: boolean;
  createdAt: string;
}

export default function ParticularServices() {
  const [services, setServices] = useState<ParticularService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ParticularService | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    duration: '',
    image: null as File | null,
  });

  const fetchServices = async () => {
    try {
      const response = await axios.get('/api/admin/particular-services');
      setServices(response.data);
    } catch (error) {
      console.error('Error fetching particular services:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleCreate = () => {
    setSelectedService(null);
    setFormData({
      title: '',
      description: '',
      price: 0,
      duration: '',
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (service: ParticularService) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration,
      image: null,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`/api/admin/particular-services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting particular service:', error);
      }
    }
  };

  const handleTogglePublish = async (id: number, currentStatus: boolean) => {
    try {
      await axios.patch(`/api/admin/particular-services/${id}`, {
        published: !currentStatus,
      });
      fetchServices();
    } catch (error) {
      console.error('Error toggling particular service status:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('duration', formData.duration);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (selectedService) {
        await axios.put(`/api/admin/particular-services/${selectedService.id}`, formDataToSend);
      } else {
        await axios.post('/api/admin/particular-services', formDataToSend);
      }
      setIsModalOpen(false);
      fetchServices();
    } catch (error) {
      console.error('Error saving particular service:', error);
    }
  };

  const columns = [
    { header: 'Title', accessor: 'title' },
    { header: 'Price', accessor: 'price' },
    { header: 'Duration', accessor: 'duration' },
    { header: 'Created At', accessor: 'createdAt' },
    {
      header: 'Status',
      accessor: 'published',
      cell: (item: ParticularService) => (
        <span className={`px-2 py-1 rounded ${item.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {item.published ? 'Published' : 'Draft'}
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Particular Services</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
        >
          <Plus className="w-5 h-5" />
          Add New Service
        </button>
      </div>

      <DataTable
        data={services}
        columns={columns}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onTogglePublish={handleTogglePublish}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedService ? 'Edit Service' : 'Add Service'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price (CHF)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              min="0"
              step="0.01"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Duration</label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 1 hour, 2 hours"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              className="mt-1 block w-full"
              accept="image/*"
              required={!selectedService}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {selectedService ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
} 