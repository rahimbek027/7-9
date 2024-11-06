import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const fetchStudents = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/students`);
  return data;
};

export const addStudent = (student) => axios.post(`${API_BASE_URL}/students`, student);

export const deleteStudent = (id) => axios.delete(`${API_BASE_URL}/students/${id}`);
