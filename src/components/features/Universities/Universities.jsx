import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiMapPin, FiGlobe, FiMail, FiPhone, FiUsers, FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useApp } from '../../../context/AppContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Reusable Modal Form Component
const UniversityForm = ({ isOpen, onClose, onSubmit, title, submitText, formData, onInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#011ff3]">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University Type
              </label>
              <select
                name="university_type"
                value={formData.university_type}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="">Select University Type</option>
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Intake Dates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Diploma Intake */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Diploma</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <DatePicker
                      selected={formData.diploma_intake_start ? new Date(formData.diploma_intake_start) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'diploma_intake_start', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <DatePicker
                      selected={formData.diploma_intake_end ? new Date(formData.diploma_intake_end) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'diploma_intake_end', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Bachelors Intake */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Bachelors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <DatePicker
                      selected={formData.bachelors_intake_start ? new Date(formData.bachelors_intake_start) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'bachelors_intake_start', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <DatePicker
                      selected={formData.bachelors_intake_end ? new Date(formData.bachelors_intake_end) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'bachelors_intake_end', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Masters Intake */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Masters</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <DatePicker
                      selected={formData.masters_intake_start ? new Date(formData.masters_intake_start) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'masters_intake_start', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <DatePicker
                      selected={formData.masters_intake_end ? new Date(formData.masters_intake_end) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'masters_intake_end', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* PhD Intake */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-3">PhD</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Start Date</label>
                    <DatePicker
                      selected={formData.phd_intake_start ? new Date(formData.phd_intake_start) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'phd_intake_start', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">End Date</label>
                    <DatePicker
                      selected={formData.phd_intake_end ? new Date(formData.phd_intake_end) : null}
                      onChange={(date) => onInputChange({
                        target: { name: 'phd_intake_end', value: date }
                      })}
                      dateFormat="yyyy-MM-dd"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
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
      </div>
    </div>
  );
};

const Universities = () => {
  const { universities, addUniversity, updateUniversity, deleteUniversity } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    website: '',
    university_type: '',
    diploma_intake_start: null,
    diploma_intake_end: null,
    bachelors_intake_start: null,
    bachelors_intake_end: null,
    masters_intake_start: null,
    masters_intake_end: null,
    phd_intake_start: null,
    phd_intake_end: null
  });

  useEffect(() => {
    setLoading(false);
  }, [universities]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      location: '',
      website: '',
      university_type: '',
      diploma_intake_start: null,
      diploma_intake_end: null,
      bachelors_intake_start: null,
      bachelors_intake_end: null,
      masters_intake_start: null,
      masters_intake_end: null,
      phd_intake_start: null,
      phd_intake_end: null
    });
  };

  const handleAddUniversity = async (e) => {
    e.preventDefault();
    try {
      // Format dates to YYYY-MM-DD
      const formattedData = {
        ...formData,
        diploma_intake_start: formData.diploma_intake_start ? formData.diploma_intake_start.toISOString().split('T')[0] : null,
        diploma_intake_end: formData.diploma_intake_end ? formData.diploma_intake_end.toISOString().split('T')[0] : null,
        bachelors_intake_start: formData.bachelors_intake_start ? formData.bachelors_intake_start.toISOString().split('T')[0] : null,
        bachelors_intake_end: formData.bachelors_intake_end ? formData.bachelors_intake_end.toISOString().split('T')[0] : null,
        masters_intake_start: formData.masters_intake_start ? formData.masters_intake_start.toISOString().split('T')[0] : null,
        masters_intake_end: formData.masters_intake_end ? formData.masters_intake_end.toISOString().split('T')[0] : null,
        phd_intake_start: formData.phd_intake_start ? formData.phd_intake_start.toISOString().split('T')[0] : null,
        phd_intake_end: formData.phd_intake_end ? formData.phd_intake_end.toISOString().split('T')[0] : null
      };

      await addUniversity(formattedData);
      toast.success('University added successfully');
      handleCloseModal();
      resetFormData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add university');
    }
  };

  const handleEditUniversity = async (e) => {
    e.preventDefault();
    try {
      // Format dates to YYYY-MM-DD
      const formattedData = {
        ...formData,
        diploma_intake_start: formData.diploma_intake_start ? formData.diploma_intake_start.toISOString().split('T')[0] : null,
        diploma_intake_end: formData.diploma_intake_end ? formData.diploma_intake_end.toISOString().split('T')[0] : null,
        bachelors_intake_start: formData.bachelors_intake_start ? formData.bachelors_intake_start.toISOString().split('T')[0] : null,
        bachelors_intake_end: formData.bachelors_intake_end ? formData.bachelors_intake_end.toISOString().split('T')[0] : null,
        masters_intake_start: formData.masters_intake_start ? formData.masters_intake_start.toISOString().split('T')[0] : null,
        masters_intake_end: formData.masters_intake_end ? formData.masters_intake_end.toISOString().split('T')[0] : null,
        phd_intake_start: formData.phd_intake_start ? formData.phd_intake_start.toISOString().split('T')[0] : null,
        phd_intake_end: formData.phd_intake_end ? formData.phd_intake_end.toISOString().split('T')[0] : null
      };

      await updateUniversity(formData.id, formattedData);
      toast.success('University updated successfully');
      handleCloseModal();
      resetFormData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update university');
    }
  };

  const openEditModal = (university) => {
    setFormData({
      id: university.id,
      name: university.name,
      location: university.location,
      website: university.website,
      university_type: university.university_type,
      diploma_intake_start: university.diploma_intake_start ? new Date(university.diploma_intake_start) : null,
      diploma_intake_end: university.diploma_intake_end ? new Date(university.diploma_intake_end) : null,
      bachelors_intake_start: university.bachelors_intake_start ? new Date(university.bachelors_intake_start) : null,
      bachelors_intake_end: university.bachelors_intake_end ? new Date(university.bachelors_intake_end) : null,
      masters_intake_start: university.masters_intake_start ? new Date(university.masters_intake_start) : null,
      masters_intake_end: university.masters_intake_end ? new Date(university.masters_intake_end) : null,
      phd_intake_start: university.phd_intake_start ? new Date(university.phd_intake_start) : null,
      phd_intake_end: university.phd_intake_end ? new Date(university.phd_intake_end) : null
    });
    setShowEditModal(true);
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
          onClick={() => {
            resetFormData();
            setShowAddModal(true);
          }}
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Intake Dates
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {universities.map((university) => (
              <tr key={university.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-[#011ff3] flex items-center justify-center text-white font-semibold">
                        {university.name.charAt(0)}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{university.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{university.location}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    university.university_type === 'public' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {university.university_type}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a 
                    href={university.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[#011ff3] hover:text-[#011ff3] hover:underline"
                  >
                    {university.website}
                  </a>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <div className="grid grid-cols-2 gap-2">
                      {university.diploma_intake_start && (
                        <div>
                          <span className="font-medium">Diploma:</span>
                          <br />
                          {new Date(university.diploma_intake_start).toLocaleDateString()} - {new Date(university.diploma_intake_end).toLocaleDateString()}
                        </div>
                      )}
                      {university.bachelors_intake_start && (
                        <div>
                          <span className="font-medium">Bachelors:</span>
                          <br />
                          {new Date(university.bachelors_intake_start).toLocaleDateString()} - {new Date(university.bachelors_intake_end).toLocaleDateString()}
                        </div>
                      )}
                      {university.masters_intake_start && (
                        <div>
                          <span className="font-medium">Masters:</span>
                          <br />
                          {new Date(university.masters_intake_start).toLocaleDateString()} - {new Date(university.masters_intake_end).toLocaleDateString()}
                        </div>
                      )}
                      {university.phd_intake_start && (
                        <div>
                          <span className="font-medium">PhD:</span>
                          <br />
                          {new Date(university.phd_intake_start).toLocaleDateString()} - {new Date(university.phd_intake_end).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(university)}
                    className="text-[#011ff3] hover:text-[#011ff3] mr-4"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(university.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
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
        <UniversityForm 
          isOpen={showAddModal}
          onClose={handleCloseModal}
          onSubmit={handleAddUniversity}
          title="Add New University"
          submitText="Add University"
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}

      {/* Edit University Modal */}
      {showEditModal && (
        <UniversityForm 
          isOpen={showEditModal}
          onClose={handleCloseModal}
          onSubmit={handleEditUniversity}
          title="Edit University"
          submitText="Update University"
          formData={formData}
          onInputChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Universities;