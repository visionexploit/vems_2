import React, { useState, useEffect } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiPlus, FiX, FiFileText } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { useApp } from '../../../context/AppContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { jsPDF } from 'jspdf';

// Reusable Modal Form Component
const ApplicationForm = ({ isOpen, onClose, onSubmit, title, submitText, formData, onInputChange, students, departments, universities }) => {
  if (!isOpen) return null;

  // Filter departments based on selected university
  const filteredDepartments = departments.filter(
    (dept) => dept.university_id === Number(formData.selected_university_id)
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-[#011ff3]">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <FiX className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={onSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Student</label>
              <select
                name="student_id"
                value={formData.student_id}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="">Select Student</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.first_name} {student.last_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
              <select
                name="selected_university_id"
                value={formData.selected_university_id}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="">Select University</option>
                {universities.map(university => (
                  <option key={university.id} value={university.id}>
                    {university.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Program</label>
              <select
                name="program"
                value={formData.program}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="">Select Program</option>
                {filteredDepartments.map(department => (
                  <option key={department.id} value={department.name}>
                    {department.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Application Date</label>
              <DatePicker
                selected={formData.submission_date}
                onChange={(date) => onInputChange({ target: { name: 'submission_date', value: date } })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                dateFormat="yyyy-MM-dd"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                required
              >
                <option value="">Select Status</option>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={onInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                rows="3"
              />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Required Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diploma (PDF)</label>
                <input
                  type="file"
                  name="diploma"
                  onChange={onInputChange}
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transcript (PDF)</label>
                <input
                  type="file"
                  name="transcript"
                  onChange={onInputChange}
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passport (PDF)</label>
                <input
                  type="file"
                  name="passport"
                  onChange={onInputChange}
                  accept=".pdf"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Photo (PNG)</label>
                <input
                  type="file"
                  name="photo"
                  onChange={onInputChange}
                  accept=".png"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
                  required
                />
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

const Applications = () => {
  const { applications, students, departments, universities, addApplication, updateApplication, deleteApplication, fetchApplications, fetchStudents, fetchDepartments, fetchUniversities } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    student_id: '',
    selected_university_id: '',
    program: '',
    submission_date: null,
    status: '',
    notes: '',
    diploma: null,
    transcript: null,
    passport: null,
    photo: null
  });

  useEffect(() => {
    fetchApplications();
    fetchStudents();
    fetchDepartments();
    fetchUniversities();
  }, [fetchApplications, fetchStudents, fetchDepartments, fetchUniversities]);

  const resetFormData = () => {
    setFormData({
      student_id: '',
      selected_university_id: '',
      program: '',
      submission_date: null,
      status: '',
      notes: '',
      diploma: null,
      transcript: null,
      passport: null,
      photo: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    
    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    } else {
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'selected_university_id' && { department_id: '' })
    }));
    }
  };

  const handleAddApplication = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append basic form data
      formDataToSend.append('student_id', formData.student_id);
      formDataToSend.append('university_id', formData.selected_university_id);
      formDataToSend.append('program', formData.program);
      formDataToSend.append('submission_date', formData.submission_date ? formData.submission_date.toISOString().split('T')[0] : '');
      formDataToSend.append('status', formData.status);
      formDataToSend.append('notes', formData.notes);

      // Append files
      if (formData.diploma) formDataToSend.append('diploma', formData.diploma);
      if (formData.transcript) formDataToSend.append('transcript', formData.transcript);
      if (formData.passport) formDataToSend.append('passport', formData.passport);
      if (formData.photo) formDataToSend.append('photo', formData.photo);

      // Log FormData contents for debugging
      console.log('FormData contents before sending:');
      for (let pair of formDataToSend.entries()) {
          console.log(pair[0]+ ': ' + pair[1]); 
      }

      await addApplication(formDataToSend);
      toast.success('Application added successfully');
      handleCloseModal();
      resetFormData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add application');
    }
  };

  const handleEditApplication = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      
      // Append basic form data
      formDataToSend.append('student_id', formData.student_id);
      formDataToSend.append('program', formData.program);
      formDataToSend.append('submission_date', formData.submission_date ? formData.submission_date.toISOString().split('T')[0] : null);
      formDataToSend.append('status', formData.status);
      formDataToSend.append('notes', formData.notes);

      // Append files only if they've been changed
      if (formData.diploma) formDataToSend.append('diploma', formData.diploma);
      if (formData.transcript) formDataToSend.append('transcript', formData.transcript);
      if (formData.passport) formDataToSend.append('passport', formData.passport);
      if (formData.photo) formDataToSend.append('photo', formData.photo);

      await updateApplication(currentApplication.id, formDataToSend);
      toast.success('Application updated successfully');
      handleCloseModal();
      resetFormData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update application');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      try {
        await deleteApplication(id);
        toast.success('Application deleted successfully');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete application');
      }
    }
  };

  const openAddModal = () => {
    resetFormData();
    setShowAddModal(true);
  };

  const openEditModal = (application) => {
    setCurrentApplication(application);

    const department = departments.find(d => d.id === application.department_id);
    const universityId = department ? department.university_id : '';

    setFormData({
      student_id: application.student_id,
      selected_university_id: universityId,
      department_id: application.department_id,
      submission_date: application.submission_date ? new Date(application.submission_date) : null,
      status: application.status,
      notes: application.notes || '',
    });
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentApplication(null);
    resetFormData();
  };

  const filteredApplications = applications.filter(application =>
    (application.student_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     application.department_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     application.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
     application.university_name?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // PDF Generation Logic
  const generateApplicationPdf = (application) => {
    const doc = new jsPDF();
    let y = 10;

    // Company Heading
    doc.setFontSize(24);
    doc.text('VisionExploit Consultants', 10, y);
    y += 10;

    // Document Title
    doc.setFontSize(18);
    doc.text('Completed Application', 10, y);
    y += 20;

    // Student Information
    doc.setFontSize(14);
    doc.text('Student Information:', 10, y);
    doc.setFontSize(12);
    y += 7;
    doc.text(`Name: ${application.student_name}`, 15, y);
    y += 7;
    // Assuming you have more student details like email, phone in the application object
    // For example, if you fetch the full student object: student.email, student.phone_number
    doc.text(`Student ID: ${application.student_id}`, 15, y);
    y += 10;

    // University Information
    doc.setFontSize(14);
    doc.text('University Information:', 10, y);
    doc.setFontSize(12);
    y += 7;
    doc.text(`University Name: ${application.university_name}`, 15, y);
    y += 10;

    // Department Name
    doc.setFontSize(14);
    doc.text('Department Information:', 10, y);
    doc.setFontSize(12);
    y += 7;
    doc.text(`Department Name: ${application.department_name}`, 15, y);
    y += 10;

    // Application Confirmation
    doc.setFontSize(14);
    doc.text('Application Status:', 10, y);
    doc.setFontSize(12);
    y += 7;
    doc.text(`Status: ${application.status.replace(/_/g, ' ').toUpperCase()}`, 15, y);
    y += 7;
    doc.text('Application Completed Confirmation: This application has been successfully processed.', 15, y);
    y += 10;

    doc.save(`Application_${application.id}.pdf`);
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-[#011ff3] mb-6">Applications Management</h1>

      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#011ff3] focus:border-transparent"
          />
          <FiSearch className="absolute right-3 top-3 text-gray-400" />
        </div>
        <button
          onClick={openAddModal}
          className="bg-[#011ff3] text-white px-5 py-2 rounded-md shadow-sm hover:bg-[#011ff3] hover:bg-opacity-90 flex items-center"
        >
          <FiPlus className="mr-2" /> Add Application
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">University</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredApplications.map((application) => (
              <tr key={application.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{application.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.student_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.university_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{application.program}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {application.submission_date ? new Date(application.submission_date).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {application.status.replace(/_/g, ' ').toUpperCase()}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => openEditModal(application)}
                    className="text-[#011ff3] hover:text-[#011ff3] mr-4"
                  >
                    <FiEdit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteApplication(application.id)}
                    className="text-red-600 hover:text-red-900 mr-4"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                  {application.status === 'completed' && ( // Only show if application is completed
                    <button
                      onClick={() => generateApplicationPdf(application)}
                      className="text-green-600 hover:text-green-900"
                      title="Generate PDF"
                    >
                      <FiFileText className="w-5 h-5" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Application Modal */}
      <ApplicationForm
        isOpen={showAddModal}
        onClose={handleCloseModal}
        onSubmit={handleAddApplication}
        title="Add New Application"
        submitText="Add Application"
        formData={formData}
        onInputChange={handleInputChange}
        students={students}
        departments={departments}
        universities={universities}
      />

      {/* Edit Application Modal */}
      <ApplicationForm
        isOpen={showEditModal}
        onClose={handleCloseModal}
        onSubmit={handleEditApplication}
        title="Edit Application"
        submitText="Update Application"
        formData={formData}
        onInputChange={handleInputChange}
        students={students}
        departments={departments}
        universities={universities}
      />
    </div>
  );
};

export default Applications;
