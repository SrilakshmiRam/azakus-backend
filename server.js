const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Adjust to match your frontend URL
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

const jsonPlaceholderUrl = 'https://jsonplaceholder.typicode.com/users';

app.get('/users', async (req, res) => {
    try {
        const response = await axios.get(jsonPlaceholderUrl); // Fetching from JSONPlaceholder API
        res.status(200).json({ data: response.data });
    } catch (e) {
        console.error(`Error fetching users: ${e.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/users', async (req, res) => {
    try {
        const { firstname, lastname, email, department } = req.body;
      
        // Input validation
        if (!firstname || !lastname || !email || !department) {
           return res.status(400).json({ message: 'All fields are required.' });
        }
        
        // Mocking data for POST request to JSONPlaceholder (it doesn't actually store the data)
        const user = { firstname, lastname, email, department };
        const response = await axios.post(jsonPlaceholderUrl, user);
        
        res.status(200).json({ message: 'Data inserted successfully', data: response.data });
    } catch (e) {
        console.error(`Error inserting user: ${e.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`${jsonPlaceholderUrl}/${id}`);
        res.status(200).json({ message: 'User deleted successfully', data: response.data });
    } catch (e) {
        console.error(`Error deleting user: ${e.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, department } = req.body;
    
    try {
        const userUpdateData = { firstname, lastname, email, department };
        const response = await axios.put(`${jsonPlaceholderUrl}/${id}`, userUpdateData);
        res.status(200).json({ message: 'Data updated successfully', data: response.data });
    } catch (e) {
        console.error(`Error updating user: ${e.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(3000, () => {
    console.log('Backend Server is running at http://localhost:3000/');
});

