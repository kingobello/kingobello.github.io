const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

const API_KEY = process.env.SPOONACULAR_API_KEY;

if (!API_KEY) {
  console.error('Error: SPOONACULAR_API_KEY is not defined in the .env file.');
  process.exit(1);
}

app.get('/api/recipes', async (req, res) => {
  const ingredients = req.query.ingredients;

  if (!ingredients) {
    return res.status(400).json({ error: 'Ingredients parameter is required.' });
  }

  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/findByIngredients`, {
        params: {
          ingredients: ingredients,
          apiKey: API_KEY
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching recipes:', error.message);
    res.status(500).json({ error: 'Failed to fetch recipes. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});