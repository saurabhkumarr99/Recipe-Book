document.addEventListener("DOMContentLoaded", function () {
    const updateRecipeForm = document.getElementById("update-recipe-form");
    const recipeIdInput = document.getElementById("recipe-id");
    const titleInput = document.getElementById("title");
    const ingredientsInput = document.getElementById("ingredients");
    const stepsInput = document.getElementById("steps");
    const imageUrlInput = document.getElementById("image-url");

    // Get the recipe ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = urlParams.get("id");

    // Fetch the recipe data based on the recipe ID
    fetch(`/recipes/${recipeId}`)
        .then((response) => response.json())
        .then((recipe) => {
            // Populate the form inputs with the retrieved data
            recipeIdInput.value = recipe.id;
            titleInput.value = recipe.title;
            ingredientsInput.value = recipe.ingredients;
            stepsInput.value = recipe.steps;
            imageUrlInput.value = recipe.image_url;
        })
        .catch((error) => {
            console.error("Error fetching recipe:", error);
        });

    // Handle the form submission to update the recipe
    updateRecipeForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get the updated form data
        const updatedRecipeData = {
            id: recipeIdInput.value,
            title: titleInput.value,
            ingredients: ingredientsInput.value,
            steps: stepsInput.value,
            image_url: imageUrlInput.value,
        };

        // Send a PUT request to update the recipe
        fetch(`/recipes/${recipeId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRecipeData),
        })
            .then((response) => {
                if (response.status === 200) {
                    // Recipe updated successfully, redirect to the home page
                    window.location.href = "index.html";
                } else {
                    console.error("Failed to update recipe");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    });
});
