
const recipes = [
    { title: "Pasta Alfredo", difficulty: "easy", time: 20 },
    { title: "Chicken Curry", difficulty: "medium", time: 45 },
    { title: "Paneer Tikka", difficulty: "medium", time: 35 },
    { title: "Grilled Sandwich", difficulty: "easy", time: 10 },
    { title: "Biryani", difficulty: "hard", time: 60 },
    { title: "Maggi Masala", difficulty: "easy", time: 5 },
    { title: "Sushi Roll", difficulty: "hard", time: 50 },
    { title: "Fried Rice", difficulty: "easy", time: 25 }
];



let currentFilter = "all";
let currentSort = "none";



const recipeContainer = document.getElementById("recipe-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const sortButtons = document.querySelectorAll(".sort-btn");



const filterByDifficulty = (recipes, filter) => {
    if (filter === "all") return recipes;
    if (filter === "quick") return recipes.filter(r => r.time < 30);

    return recipes.filter(r => r.difficulty === filter);
};



const sortByName = (recipes) => {
    return [...recipes].sort((a, b) => a.title.localeCompare(b.title));
};

const sortByTime = (recipes) => {
    return [...recipes].sort((a, b) => a.time - b.time);
};



const applyFilter = (recipes, filterType) => {
    return filterByDifficulty(recipes, filterType);
};



const applySort = (recipes, sortType) => {
    switch (sortType) {
        case "name":
            return sortByName(recipes);
        case "time":
            return sortByTime(recipes);
        default:
            return recipes; // No sorting
    }
};



const renderRecipes = (recipesToShow) => {
    recipeContainer.innerHTML = "";

    recipesToShow.forEach(recipe => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
            <h3>${recipe.title}</h3>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Time:</strong> ${recipe.time} min</p>
        `;

        recipeContainer.appendChild(card);
    });
};



const updateButtonStates = () => {
    filterButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === currentFilter);
    });

    sortButtons.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.sort === currentSort);
    });
};



const updateDisplay = () => {
    let result = recipes;

    result = applyFilter(result, currentFilter);
    result = applySort(result, currentSort);

    console.log(`Displaying ${result.length} recipes (Filter: ${currentFilter}, Sort: ${currentSort})`);

    renderRecipes(result);
};



filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentFilter = btn.dataset.filter;
        updateButtonStates();
        updateDisplay();
    });
});

sortButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        currentSort = btn.dataset.sort;
        updateButtonStates();
        updateDisplay();
    });
});



updateDisplay();
updateButtonStates();

