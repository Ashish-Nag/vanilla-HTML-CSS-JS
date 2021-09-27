const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsElement = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealElement = document.getElementById('single-meal');

//search meal and fetch from the API

function searchMeal(e) {
    e.preventDefault();

    // clear single meal
    single_mealElement.innerHTML = '';

    //get search term

    const term = search.value;

    //check for empty 
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`).then(res => res.json()).then(data => {
            resultHeading.innerHTML = `<h3>Search Results for '${term}': `;

            if (data.meals == null) {
                resultHeading.innerHTML = `<p> There are no results. Try Again</p>`;
            } else {
                mealsElement.innerHTML = data.meals.map(meal => `<div class="meal"> <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/> <div class="meal-info" data-mealID="${meal.idMeal}"><h3>${meal.strMeal}</h3></div></div>`).join('');
            }
        });
        // clear the search text
        search.value = '';
    } else {
        alert('please enter a search term');
    }

}

// fetch meal by Id

function getMealId(mealId) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`).then(res => res.json()).then(data => {
        const meal = data.meals[0];

        addMealtoDom(meal);
    });
}

// Add meal to dom

function addMealtoDom(meal) {
    const ingredients = [];

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
        }
        else {
            break;
        }
    }

    single_mealElement.innerHTML = `
    <div class= "single-meal"> 
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">${meal.strCategory ? `<p> ${meal.strCategory}</p>` : ''} 
        ${meal.strArea ? `<p> ${meal.strArea}</p>` : ''}</div>
        <div class="main">
        <h5>Ingredients</h5>
        <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')} </ul>
        <p>${meal.strInstructions}</p>
        </div>
        </div>`;
}

// get random meal

function randomMeal() {
    // clear meals and heading 
    mealsElement.innerHTML = '';
    resultHeading.innerHTML = '';


    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data => {
        const meal = data.meals[0];

        addMealtoDom(meal);
    })
}



// event listeners

submit.addEventListener('submit', searchMeal);
random.addEventListener('click', randomMeal);
mealsElement.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        if (item.classList) {
            return item.classList.contains('meal-info');

        }
        else {
            return false;
        }
    });

    if (mealInfo) {
        const mealId = mealInfo.getAttribute('data-mealid');
        // console.log(mealId);
        getMealId(mealId);
    }
})