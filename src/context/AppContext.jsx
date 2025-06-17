import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../config/api';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  // Auth functions (defined using useCallback for stability)
  const login = useCallback((token, user) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setAuthToken(token);
    setCurrentUser(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setAuthToken(null);
    setCurrentUser(null);
    delete api.defaults.headers.common['Authorization'];
  }, []);

  // Effect to initialize auth state from localStorage and set Axios header
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const user = localStorage.getItem('currentUser');

    if (token && user) {
      setAuthToken(token);
      setCurrentUser(JSON.parse(user));
    } else {
      // Ensure header is cleared if no token is found on initial load
      delete api.defaults.headers.common['Authorization'];
    }
    setLoading(false); // Set loading to false once initial auth check is done
  }, []); // Run once on mount

  // Effect to fetch all data when authToken changes (e.g., after login/logout)
  useEffect(() => {
    if (authToken) {
      const fetchAllData = async () => {
        try {
          setLoading(true);
          const [studentsRes, universitiesRes, departmentsRes, applicationsRes] = await Promise.all([
            api.get('/students'),
            api.get('/universities'),
            api.get('/departments'),
            api.get('/applications')
          ]);

          setStudents(studentsRes.data);
          setUniversities(universitiesRes.data);
          setDepartments(departmentsRes.data);
          setApplications(applicationsRes.data);
          setError(null);
        } catch (err) {
          console.error('Error fetching data:', err);
          setError(err.response?.data?.message || err.message);
          // If token is invalid, log out user
          if (err.response?.status === 401) {
            logout();
          }
        } finally {
          setLoading(false);
        }
      };
      fetchAllData();
    } else {
      // If authToken is null (logged out), clear data and headers
      setStudents([]);
      setUniversities([]);
      setDepartments([]);
      setApplications([]);
      delete api.defaults.headers.common['Authorization'];
      setLoading(false); // Ensure loading is false when not authenticated
    }
  }, [authToken, logout]); // Depend on authToken and logout

  // Student functions
  const fetchStudents = useCallback(async () => {
    try {
      const response = await api.get('/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
      if (error.response?.status === 401) logout();
    }
  }, [logout]);

  const addStudent = async (studentData) => {
    try {
      console.log('Adding student with data:', studentData); // Debug log
      const response = await api.post('/students', studentData);
      console.log('Server response:', response.data); // Debug log
      setStudents(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error in addStudent:', error);
      console.error('Error response:', error.response?.data); // Debug log
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      const response = await api.put(`/students/${id}`, studentData);
      setStudents(prev => prev.map(student => 
        student.id === id ? response.data : student
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating student:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(prev => prev.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  // University functions
  const fetchUniversities = useCallback(async () => {
    try {
      const response = await api.get('/universities');
      setUniversities(response.data);
    } catch (error) {
      console.error('Error fetching universities:', error);
      if (error.response?.status === 401) logout();
    }
  }, [logout]);

  const addUniversity = async (universityData) => {
    try {
      const response = await api.post('/universities', universityData);
      setUniversities(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding university:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const updateUniversity = async (id, universityData) => {
    try {
      const response = await api.put(`/universities/${id}`, universityData);
      setUniversities(prev => prev.map(university => 
        university.id === id ? response.data : university
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating university:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const deleteUniversity = async (id) => {
    try {
      await api.delete(`/universities/${id}`);
      setUniversities(prev => prev.filter(university => university.id !== id));
    } catch (error) {
      console.error('Error deleting university:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  // Department functions
  const fetchDepartments = useCallback(async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      if (error.response?.status === 401) logout();
    }
  }, [logout]);

  const addDepartment = async (departmentData) => {
    try {
      const response = await api.post('/departments', departmentData);
      setDepartments(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding department:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const updateDepartment = async (id, departmentData) => {
    try {
      const response = await api.put(`/departments/${id}`, departmentData);
      setDepartments(prev => prev.map(department => 
        department.id === id ? response.data : department
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating department:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await api.delete(`/departments/${id}`);
      setDepartments(prev => prev.filter(department => department.id !== id));
    } catch (error) {
      console.error('Error deleting department:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  // Application functions
  const fetchApplications = useCallback(async () => {
    try {
      const response = await api.get('/applications');
      setApplications(response.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
      if (error.response?.status === 401) logout();
    }
  }, [logout]);

  const addApplication = async (applicationData) => {
    try {
      const response = await api.post('/applications', applicationData);
      setApplications(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding application:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const updateApplication = async (id, applicationData) => {
    try {
      const response = await api.put(`/applications/${id}`, applicationData);
      setApplications(prev => prev.map(application => 
        application.id === id ? response.data : application
      ));
      return response.data;
    } catch (error) {
      console.error('Error updating application:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  const deleteApplication = async (id) => {
    try {
      await api.delete(`/applications/${id}`);
      setApplications(prev => prev.filter(application => application.id !== id));
    } catch (error) {
      console.error('Error deleting application:', error);
      if (error.response?.status === 401) logout();
      throw error;
    }
  };

  // Dashboard statistics
  const getDashboardStats = () => {
    const totalStudents = students.length;
    const activeStudents = students.filter(student => student.status === 'active').length;
    const totalUniversities = universities.length;
    const totalStudentsInUniversities = universities.reduce((sum, uni) => sum + (uni.number_of_students || 0), 0);
    const averageStudentsPerUniversity = universities.length > 0 
      ? Math.round(totalStudentsInUniversities / universities.length)
      : 0;
    const totalApplications = applications.length;
    const submittedApplications = applications.filter(app => app.status === 'submitted').length;

    return {
      totalStudents,
      activeStudents,
      totalUniversities,
      totalStudentsInUniversities,
      averageStudentsPerUniversity,
      totalApplications,
      submittedApplications
    };
  };

  const value = {
    students,
    universities,
    departments,
    applications,
    loading,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
    fetchUniversities,
    addUniversity,
    updateUniversity,
    deleteUniversity,
    fetchDepartments,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    fetchApplications,
    addApplication,
    updateApplication,
    deleteApplication,
    getDashboardStats,
    currentUser,
    authToken,
    login,
    logout
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;