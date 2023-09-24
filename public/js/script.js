document.addEventListener("DOMContentLoaded", function () {

    const recipeForm = document.getElementById("recipe-form");

    recipeForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the default form submission

        // Get the form data
        const formData = new FormData(recipeForm);

        // Create an object from the form data
        const recipeData = {};
        formData.forEach((value, key) => {
            recipeData[key] = value;
        });

        // Send a POST request to the server
        fetch("/recipes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response (data) from the server
                console.log("Recipe added:", data);
                // Redirect to the home page
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Error adding recipe:", error);
                // Handle errors, show an error message, etc.
            });
    });

});


const recipeListContainer = document.getElementById("recipe-list");

async function fetchAndDisplayRecipes() {
    try {
        const response = await fetch("/recipes");
        const data = await response.json();

        // Clear the recipe list container
        recipeListContainer.innerHTML = "";

        // Create an array to store recipe objects with calculated average ratings
        const recipesWithAverageRatings = [];

        // Loop through the retrieved recipes and fetch ratings for each recipe
        for (const recipe of data) {
            const ratingsResponse = await fetch(`/recipes/${recipe.id}/ratings`);
            const ratingsData = await ratingsResponse.json();

            // Calculate the average rating
            let totalRating = 0;
            if (ratingsData.length > 0) {
                ratingsData.forEach((rating) => {
                    totalRating += rating.rating;
                });
                const averageRating = totalRating / ratingsData.length;
                recipe.averageRating = averageRating.toFixed(2); // Store average rating in the recipe object
            } else {
                recipe.averageRating = "N/A"; // No ratings yet
            }

            recipesWithAverageRatings.push(recipe);
        }

        // Sort recipes by average rating in descending order
        recipesWithAverageRatings.sort((a, b) => {
            if (a.averageRating === "N/A") return 1; // Move "N/A" to the end
            if (b.averageRating === "N/A") return -1; // Move "N/A" to the end
            return b.averageRating - a.averageRating;
        });

        // Loop through the sorted recipes and create HTML elements for each
        recipesWithAverageRatings.forEach((recipe) => {
            const recipeCard = document.createElement("div");
            recipeCard.className = "col-sm-6 recipe-card";
            recipeCard.innerHTML = ` 
                                     <div class="card">
                                            <div class="row no-gutters">
                                                <div class="col-md-4">
                                                   <img src="${recipe.image_url}" class="card-img recipe-image" alt="Recipe Image">
                                                </div>
                                               <div class="col-md-8">
                                                    <div class="card-body">
                                                       <h5 class="card-title text-center">${recipe.title}</h5>
                                                    </div>
                                                    <p class="average-rating recipe-title">Average Rating: ${recipe.averageRating}</p>
                                                    <div class="card-footer ">                   
                                                       <button class="btn btn-success" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                                                       <button class="btn btn-primary" onclick="updateRecipe(${recipe.id})">Update</button>
                                                       <button class="btn btn-danger" onclick="deleteRecipe(${recipe.id})">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
        
                                     </div>
            `;
            recipeListContainer.appendChild(recipeCard);
        });
    } catch (error) {
        console.error("Error fetching and displaying recipes:", error);
    }
}


// Function to update a recipe by ID
function viewRecipe(recipeId) {
    // Redirect to the update page with the recipe ID
    window.location.href = `/recipeDetails.html?id=${recipeId}`;
}

// Function to update a recipe by ID
function updateRecipe(recipeId) {
    // Redirect to the update page with the recipe ID
    window.location.href = `/update.html?id=${recipeId}`;
}

// Function to delete a recipe by ID
function deleteRecipe(recipeId) {
    // Send a DELETE request to the server to delete the recipe
    fetch(`/recipes/${recipeId}`, {
        method: "DELETE",
    })
        .then((response) => {
            if (response.status === 204) {
                // Recipe deleted successfully, remove it from the UI
                location.reload();
            } else {
                console.error("Failed to delete recipe");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

