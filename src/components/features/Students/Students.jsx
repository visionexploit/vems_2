import React, { useState, useEffect } from 'react';
import { Plus, Search, Download, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useApp } from '../../../context/AppContext';

// Reusable Modal Form Component - moved outside to prevent re-creation
const StudentModal = ({ isOpen, onClose, onSubmit, title, submitText, formData, handleInputChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#011ff3]">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course
              </label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar URL
              </label>
              <input
                type="url"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              />
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

const Students = () => {
  const { students, addStudent, updateStudent, deleteStudent } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    status: 'Pending',
    avatar_url: 'https://ui-avatars.com/api/?name=John+Doe'
  });

  const resetFormData = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      university: '',
      course: '',
      status: 'Pending',
      avatar_url: 'https://ui-avatars.com/api/?name=John+Doe'
    });
  };

  useEffect(() => {
    setLoading(false);
  }, [students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await addStudent(formData);
      setShowAddModal(false);
      resetFormData();
      toast.success('Student added successfully');
    } catch (error) {
      console.error('Error adding student:', error);
      toast.error(error.response?.data?.message || 'Failed to add student');
    }
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(editingStudent.id, formData);
      setShowEditModal(false);
      setEditingStudent(null);
      resetFormData();
      toast.success('Student updated successfully');
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error(error.response?.data?.message || 'Failed to update student');
    }
  };

  const openEditModal = (student) => {
    setEditingStudent(student);
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      phone: student.phone,
      university: student.university,
      course: student.course,
      status: student.status,
      avatar_url: student.avatar_url
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingStudent(null);
    resetFormData();
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    resetFormData();
  };

  const handleDeleteStudent = async (student) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(student.id);
        toast.success('Student deleted successfully');
      } catch (error) {
        console.error('Error deleting student:', error);
        toast.error('Failed to delete student');
      }
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['Name', 'Status', 'University', 'Course', 'Email', 'Phone'],
      ...students.map(student => [
        `${student.first_name} ${student.last_name}`,
        student.status,
        student.university,
        student.course,
        student.email,
        student.phone
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'students.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredStudents = students.filter(student =>
    `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-[#011ff3]">Students</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-[#011ff3] text-white rounded-md hover:bg-[#011ff3] hover:bg-opacity-90 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Student
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-[#011ff3] text-[#011ff3] rounded-md hover:bg-[#011ff3] hover:bg-opacity-10 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={student.avatar_url}
                          alt=""
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {`${student.first_name} ${student.last_name}`}
                        </div>
                        <div className="text-sm text-gray-500">{student.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        student.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : student.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {student.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.university}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => openEditModal(student)}
                      className="text-[#011ff3] hover:text-[#011ff3] hover:bg-opacity-90 mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteStudent(student)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <StudentModal
        isOpen={showAddModal}
        onClose={closeAddModal}
        onSubmit={handleAddStudent}
        title="Add New Student"
        submitText="Add Student"
        formData={formData}
        handleInputChange={handleInputChange}
      />

      {/* Edit Student Modal */}
      <StudentModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        onSubmit={handleEditStudent}
        title="Edit Student"
        submitText="Update Student"
        formData={formData}
        handleInputChange={handleInputChange}
      />
    </div>
  );
};

export default Students;