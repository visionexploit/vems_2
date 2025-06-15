import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiMapPin, FiGlobe, FiMail, FiPhone, FiUsers } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useApp } from '../../../context/AppContext';

// Move UniversityForm outside the main component to prevent recreation
const UniversityForm = ({ formData, onInputChange, onSubmit, onCancel, submitText }) => (
  <form onSubmit={onSubmit} className="p-6 space-y-4">
    <div>
      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">University Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
        required
      />
    </div>
    <div>
      <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
      <input
        type="text"
        id="country"
        name="country"
        value={formData.country}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
        required
      />
    </div>
    <div>
      <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
      <input
        type="text"
        id="city"
        name="city"
        value={formData.city}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      />
    </div>
    <div>
      <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      />
    </div>
    <div>
      <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
      <input
        type="email"
        id="contact_email"
        name="contact_email"
        value={formData.contact_email}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      />
    </div>
    <div>
      <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
      <input
        type="tel"
        id="contact_phone"
        name="contact_phone"
        value={formData.contact_phone}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      />
    </div>
    <div>
      <label htmlFor="number_of_students" className="block text-sm font-medium text-gray-700 mb-1">Number of Students</label>
      <input
        type="number"
        id="number_of_students"
        name="number_of_students"
        value={formData.number_of_students}
        onChange={onInputChange}
        min="0"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      />
    </div>
    <div>
      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        id="status"
        name="status"
        value={formData.status}
        onChange={onInputChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
      >
        <option value="active">Active</option>
        <option value="pending">Pending</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
    <div className="flex justify-end gap-4 mt-6">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-[#011ff3] text-white rounded-md hover:bg-[#011ff3] hover:bg-opacity-90"
      >
        {submitText}
      </button>
    </div>
  </form>
);

const Universities = () => {
  const { universities, addUniversity, updateUniversity, deleteUniversity } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    city: '',
    website: '',
    contact_email: '',
    contact_phone: '',
    number_of_students: 0,
    status: 'pending'
  });

  useEffect(() => {
    setLoading(false);
  }, [universities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'number_of_students' ? parseInt(value) || 0 : value
    }));
  };

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    try {
      await addUniversity(formData);
      setShowAddModal(false);
      setFormData({
        name: '',
        country: '',
        city: '',
        website: '',
        contact_email: '',
        contact_phone: '',
        number_of_students: 0,
        status: 'pending'
      });
      toast.success('University added successfully');
    } catch (error) {
      console.error('Error adding university:', error);
      toast.error(error.response?.data?.message || 'Failed to add university');
    }
  };

  const handleEdit = (university) => {
    setEditingUniversity(university);
    setFormData({
      name: university.name,
      country: university.country,
      city: university.city || '',
      website: university.website || '',
      contact_email: university.contact_email || '',
      contact_phone: university.contact_phone || '',
      number_of_students: university.number_of_students || 0,
      status: university.status
    });
    setShowEditModal(true);
  };

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      country: '',
      city: '',
      website: '',
      contact_email: '',
      contact_phone: '',
      number_of_students: 0,
      status: 'pending'
    });
    setShowAddModal(true);
  };

  const handleUpdateUniversity = async (e) => {
    e.preventDefault();
    try {
      await updateUniversity(editingUniversity.id, formData);
      setShowEditModal(false);
      setEditingUniversity(null);
      toast.success('University updated successfully');
    } catch (error) {
      console.error('Error updating university:', error);
      toast.error(error.response?.data?.message || 'Failed to update university');
    }
  };

  const handleDelete = async (universityId) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      try {
        await deleteUniversity(universityId);
        toast.success('University deleted successfully');
      } catch (error) {
        console.error('Error deleting university:', error);
        toast.error('Failed to delete university');
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setEditingUniversity(null);
  };

  const filteredUniversities = universities.filter(university =>
    `${university.name} ${university.country} ${university.city} ${university.website}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#011ff3]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#011ff3]">Universities</h1>
        <button
          onClick={handleOpenAddModal}
          className="bg-[#011ff3] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#011ff3] hover:bg-opacity-90"
        >
          <FiPlus /> Add University
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search universities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-[#011ff3]"
          />
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Universities Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUniversities.map((university) => (
              <tr key={university.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {university.name}
                  </div>
                  {university.website && (
                    <div className="flex items-center text-sm text-gray-500">
                      <FiGlobe className="mr-2" />
                      <a
                        href={university.website.startsWith('http') ? university.website : `https://${university.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#011ff3] hover:text-[#011ff3] hover:underline"
                      >
                        {university.website}
                      </a>
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiMapPin className="mr-2" />
                    {university.city}, {university.country}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="space-y-1">
                    {university.contact_email && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMail className="mr-2" />
                        {university.contact_email}
                      </div>
                    )}
                    {university.contact_phone && (
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-2" />
                        {university.contact_phone}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500">
                    <FiUsers className="mr-2" />
                    {university.number_of_students?.toLocaleString() || 0}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      university.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : university.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {university.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleEdit(university)}
                      className="text-[#011ff3] hover:text-[#011ff3] hover:opacity-90"
                    >
                      <FiEdit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(university.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FiTrash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {filteredUniversities.length} of {universities.length} universities
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Previous
          </button>
          <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Total Universities</h3>
          <p className="text-2xl font-bold text-[#011ff3]">{universities.length}</p>
          <p className="text-green-600 text-sm">↑ 5% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Total Students</h3>
          <p className="text-2xl font-bold text-[#011ff3]">
            {universities.reduce((sum, uni) => sum + (parseInt(uni.number_of_students) || 0), 0).toLocaleString()}
          </p>
          <p className="text-green-600 text-sm">↑ 8% from last month</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-gray-500 text-sm">Average Students per University</h3>
          <p className="text-2xl font-bold text-[#011ff3]">
            {universities.length > 0 
              ? Math.round(universities.reduce((sum, uni) => sum + (parseInt(uni.number_of_students) || 0), 0) / universities.length).toLocaleString()
              : 0}
          </p>
          <p className="text-green-600 text-sm">↑ 3% from last month</p>
        </div>
      </div>

      {/* Add University Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#011ff3]">Add New University</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiPlus className="w-6 h-6 transform rotate-45" />
              </button>
            </div>
            <UniversityForm 
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleAddUniversity}
              onCancel={handleCloseModal}
              submitText="Add University"
            />
          </div>
        </div>
      )}

      {/* Edit University Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#011ff3]">Edit University</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiPlus className="w-6 h-6 transform rotate-45" />
              </button>
            </div>
            <UniversityForm 
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleUpdateUniversity}
              onCancel={handleCloseModal}
              submitText="Update University"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Universities;