const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection pool configuration
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'RecipeBook',
  password: 'admin',
  port: 5432,
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use(express.static('public/view'));

// Routes for displaying all recipes, showing a single recipe by ID, adding a new recipe,
// updating a recipe's details, and rating a recipe

// Display all recipes
app.get('/recipes', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recipes');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Show a single recipe by ID
app.get('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM recipes WHERE id = $1', [id]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add a new recipe
app.post('/recipes', async (req, res) => {
  const { title, ingredients, steps, image_url } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO recipes (title, ingredients, steps, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, ingredients, steps, image_url]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a recipe's details
app.put('/recipes/:id', async (req, res) => {
  const { id } = req.params;
  const { title, ingredients, steps, image_url } = req.body;
  try {
    const { rows } = await pool.query(
      'UPDATE recipes SET title = $1, ingredients = $2, steps = $3, image_url = $4 WHERE id = $5 RETURNING *',
      [title, ingredients, steps, image_url, id]
    );
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a recipe by ID
app.delete("/recipes/:id", async (req, res) => {
  const recipeId = req.params.id;

  try {
      await pool.query('DELETE FROM recipes WHERE id=$1', [recipeId]);
      res.sendStatus(204); // No content
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Rating a recipe (you can implement this route as needed)

// API endpoint to get recipe ratings
app.get("/recipes/:recipeId/ratings", async(req, res) => {
  const { recipeId } = req.params;
  try {
    const { rows } = await pool.query('SELECT * FROM ratings WHERE recipe_id = $1', [recipeId]);
    if (rows.length === 0) {
      res.status(404).json({ error: 'Recipe not found' });
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API endpoint to add a new rating to a recipe
app.post("/recipes/:recipeId/ratings", async(req, res) => {
  const { rating } = req.body;
  const { user_id } = req.body;
  const { recipe_id  } = req.body;
  // Validate the rating (ensure it's between 1 and 5, for example)
  if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating value" });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO ratings (recipe_id, user_id, rating) VALUES ($1, $2, $3) RETURNING *',
      [recipe_id, user_id,  rating]
    );
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
