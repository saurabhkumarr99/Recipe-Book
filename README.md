# Recipe Book

Welcome to the Recipe Book project! This is a simple web application for managing and sharing your favorite recipes.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Author](#Author)

## Features

- **Recipe Management:** Create, edit, and delete your recipes.
- **Recipe Details:** View detailed information about each recipe, including ingredients, steps, and images.
- **Recipe Ratings:** Rate and review recipes to help others discover the best dishes.
- **Sorted:**   Recipes sorted by ratings.
- **Responsive Design:** Access your recipe book on desktop, tablet, or mobile devices.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your computer.
- Node.js: [Download and Install Node.js](https://nodejs.org/)

### Installation


1. **Create a folder Recipe-Book:**

2. **Install Dependencies:**

   ```bash
   npm install express pg body-parser
   ``` 

3. **Create a DB in postgress as RecipeBook:**

   Create the 'recipes' table

   ```bash
  
     CREATE TABLE recipes (
       id SERIAL PRIMARY KEY,
       title TEXT,
       ingredients TEXT,
       steps TEXT,
       image_url TEXT
    );
   ```

   Create the 'ratings' table

    ```bash
       CREATE TABLE ratings (
        id SERIAL PRIMARY KEY,
        recipe_id INTEGER,
        user_id INTEGER,
        rating INTEGER
    );
 
    ```

2. **Run :**

   ```bash
       node app.js
   ``` 
## Usage

1. Start adding your favorite recipes to your recipe book.
2. Rate and review recipes that you've tried.
3. Enjoy cooking and sharing your culinary creations with the community!


## Screenshots

<p align="center">
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/1.Home%20Page.png?raw=true" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/2.Add%20Recepi%20Page.png?raw=true" alt="Screenshot 2" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/3.New%20Recepi%20Added.png?raw=true" alt="Screenshot 3" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/4.Update%20Recepi.png?raw=true" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/5.View%20Recepi.png?raw=true" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/6.Rate%20Recepe.png?raw=true" alt="Screenshot 2" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/7.Recepi%20Rating%20Sorted.png?raw=true" alt="Screenshot 1" width="300" />
</p

<p align="center">
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/1.Home%20Page.png?raw=true" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Recipe-Book/blob/master/ScreenShots/2.Add%20Recepi%20Page.png?raw=true" alt="Screenshot 2" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/3.BlogDetailsWithoutComments.png" alt="Screenshot 3" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/4.b-Comments.png" alt="Screenshot 1" width="300" />
  <img src="https://github.com/saurabhkumarr99/Blogging-Platform/raw/master/ScreenShots/4.BlogDetailsWithComments.png" alt="Screenshot 2" width="300" />
</p

## Author

- SAURABH KUMAR RAI

