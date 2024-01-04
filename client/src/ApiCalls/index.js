import axios from 'axios';

// Create an instance of Axios with custom configuration
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/thaiIDCards', // Set the base URL for all requests
  // timeout: 5000, // Set a timeout for requests (in milliseconds)
  headers: {
    'Content-Type': 'application/json',
    // Add any other default headers you need
  },
});

// Usage example for POST request to create a Thai ID card entry
const createThaiIDCard = async (data) => {
  try {
    const response = await instance.post('/create', data);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error creating Thai ID card:', error);
    throw error; // Rethrow the error for further handling
  }
};
// GET all Thai ID cards
const getAllThaiIDCards = async () => {
    try {
      const response = await instance.get('/');
      return response.data;
    } catch (error) {
      console.error('Error fetching all Thai ID cards:', error);
      throw error;
    }
  };
  
  // Edit a Thai ID card by ID
  const editThaiIDCardById = async (id, updatedData) => {
    try {
      const response = await instance.post(`/edit/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error(`Error editing Thai ID card with ID ${id}:`, error);
      throw error;
    }
  };
  
  // Delete a Thai ID card by ID
  const deleteThaiIDCardById = async (id) => {
    try {
      const response = await instance.get(`/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting Thai ID card with ID ${id}:`, error);
      throw error;
    }
  };
  
export {
  createThaiIDCard,
  getAllThaiIDCards,
  editThaiIDCardById,
  deleteThaiIDCardById
};
