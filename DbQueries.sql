-- Create the RecipeBook database
CREATE DATABASE RecipeBook;

-- Create the recipes table
CREATE TABLE recipes (
    id SERIAL PRIMARY KEY,
    title TEXT,
    ingredients TEXT,
    steps TEXT,
    image_url TEXT
);

-- Create the ratings table
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER,
    user_id INTEGER,
    rating INTEGER
);