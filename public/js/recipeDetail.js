
document.addEventListener("DOMContentLoaded", function () {
    const recipeDetailsContainer = document.getElementById("recipe-details");
    const ratingForm = document.getElementById("rating-form");
    const previousRatingsContainer = document.getElementById("previous-ratings");

    // Get the recipe ID from the URL query parameter
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const recipeId = urlParams.get("id");

    //Function to fetch and display recipe details
    function fetchAndDisplayRecipeDetails() {
        fetch(`/recipes/${recipeId}`)
            .then((response) => response.json())
            .then((recipe) => {
                // Clear the recipe details container
                const rcp_img=document.getElementById("recipe-img");
                rcp_img.innerHTML="";
                rcp_img.style.width = "20rem";
                rcp_img.style.margin = "0 auto";
                rcp_img.innerHTML=` <img src="${recipe.image_url}" class="card-img-top" alt="Recipe Image">`;

                recipeDetailsContainer.innerHTML = "";

                // Create Bootstrap card to display recipe details
                const recipeCard = document.createElement("div");
                recipeCard.className = "card";

                recipeCard.innerHTML = `
                <div class="card-body">
                    <h1 class="card-title" align="center">${recipe.title}</h5>
                    <h3 class="card-text">Ingredients: </h3>
                    <p >${recipe.ingredients}</p>
                    <h3 class="card-text">Steps:</h3>
                    <p > ${recipe.steps}</p>
                </div>
            `;

                recipeDetailsContainer.appendChild(recipeCard);
            })
            .catch((error) => {
                console.error("Error fetching recipe details:", error);
            });
    }

    // Function to fetch and display previous ratings
    function fetchAndDisplayPreviousRatings() {
        fetch(`/recipes/${recipeId}/ratings`)
            .then((response) => response.json())
            .then((ratings) => {
                // Clear the previous ratings container
                const previousRatingsContainer = document.getElementById("previous-ratings");
                previousRatingsContainer.innerHTML = "";

                // Loop through the retrieved ratings and create Bootstrap elements for each
                ratings.forEach((rating) => {
                    const ratingCard = document.createElement("div");
                    ratingCard.className = "card";
                    ratingCard.innerHTML = `
                    <div class="card-body">
                        <p class="card-text">User Id: ${rating.user_id}</p>
                        <p class="card-text">Rating: ${rating.rating}</p>
                    </div>
                `;

                    previousRatingsContainer.appendChild(ratingCard);
                });
            })
            .catch((error) => {
                console.error("Error fetching previous ratings:", error);
            });
    }

    // Call the functions to fetch and display recipe details and previous ratings
    fetchAndDisplayRecipeDetails();
    fetchAndDisplayPreviousRatings();

    // Handle form submission to submit a new rating
    ratingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the rating value from the form
        const rating = document.getElementById("rating").value;
        // Get the rating form data
        const formData = new FormData(ratingForm);

        // Create an object from the form data
        const recipeData = {};
        formData.forEach((value, key) => {
            recipeData[key] = value;
        });
        recipeData.recipe_id = recipeId;

        // Send a POST request to submit the rating
        fetch(`/recipes/${recipeId}/ratings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipeData),
        })
            .then((response) => {
                if (response.status === 201) {
                    // Rating submitted successfully, refresh the ratings
                    fetchAndDisplayPreviousRatings();
                } else {
                    console.error("Failed to submit rating");
                }
            })
            .catch((error) => {
                console.error("Error submitting rating:", error);
            });
    });
});
