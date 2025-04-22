import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes';

export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

export const addNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error adding note:', error);
  }
};
