import React, { createContext, useContext, useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      const [studentsResponse, universitiesResponse] = await Promise.all([
        api.get('/students'),
        api.get('/universities')
      ]);
      setStudents(studentsResponse.data);
      setUniversities(universitiesResponse.data);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Student functions
  const addStudent = async (studentData) => {
    try {
      const response = await api.post('/students', studentData);
      setStudents(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding student:', error);
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
      throw error;
    }
  };

  const deleteStudent = async (id) => {
    try {
      await api.delete(`/students/${id}`);
      setStudents(prev => prev.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
      throw error;
    }
  };

  // University functions
  const addUniversity = async (universityData) => {
    try {
      const response = await api.post('/universities', universityData);
      setUniversities(prev => [response.data, ...prev]);
      return response.data;
    } catch (error) {
      console.error('Error adding university:', error);
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
      throw error;
    }
  };

  const deleteUniversity = async (id) => {
    try {
      await api.delete(`/universities/${id}`);
      setUniversities(prev => prev.filter(university => university.id !== id));
    } catch (error) {
      console.error('Error deleting university:', error);
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

    return {
      totalStudents,
      activeStudents,
      totalUniversities,
      totalStudentsInUniversities,
      averageStudentsPerUniversity
    };
  };

  const value = {
    students,
    universities,
    loading,
    addStudent,
    updateStudent,
    deleteStudent,
    addUniversity,
    updateUniversity,
    deleteUniversity,
    getDashboardStats
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext; 