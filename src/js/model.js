import 'regenerator-runtime';
import * as config from './config.js';
import * as helper from './helper.js';
export const state = {
  recipe: {},
  searchResult: [],
  page: 1,
  maxNoOfItemInPage: config.maxItemPerPage,
  bookMarks: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await helper.getJson(`${config.recipeUrl}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      key: recipe.key ? recipe.key : null,
    };

    if (state.bookMarks.some(a => a.id == id)) state.recipe.bookMarked = true;

    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const getRecipeResult = async function (query) {
  try {
    const data = await helper.getJson(
      `${config.recipeUrl}?search=${query}&key=${config.apiKey}`
    );
    state.searchResult = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        key: recipe.key ? recipe.key : null,
      };
    });

    state.page = 1; // reset page to 1
  } catch (err) {
    throw err;
  }
};

export const getPaginatedSearchResult = function (page = state.page) {
  const skip = (page - 1) * config.maxItemPerPage;
  const take = page * config.maxItemPerPage;
  state.page = page;
  return state.searchResult.slice(skip, take);
};

export const updateServing = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookMark = function (recipe) {
  state.bookMarks.push(recipe);
  if (recipe.id == state.recipe.id) state.recipe.bookMarked = true;
  saveUpdateBookMarkInLocalStorage(state.bookMarks);
};

export const deleteBookMark = function (recipe) {
  const index = state.bookMarks.findIndex(a => a.id == recipe.id);
  state.bookMarks.splice(index, 1);
  if (recipe.id == state.recipe.id) state.recipe.bookMarked = false;
  saveUpdateBookMarkInLocalStorage(state.bookMarks);
};

const saveUpdateBookMarkInLocalStorage = function () {
  localStorage.setItem('recipeBookMarks', JSON.stringify(state.bookMarks));
};

export const getRecipeBookMarkFromLocalStorage = function () {
  const bookmarks = JSON.parse(localStorage.getItem('recipeBookMarks'));
  if (!bookmarks) return;
  state.bookMarks = bookmarks;
};

export const addNewRecipe = async function (newRecipe) {
  try {
    const apiKey = config.apiKey;
    const url = `${config.postRecipeUrl}${apiKey}`;

    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] != '')
      .map(ing => {
        const ingredients = ing[1].replaceAll(' ', '').split(',');
        console.log(ingredients);
        if (ingredients.length != 3)
          throw new Error(
            'Ingredients not in correct format. please enter ingredients in correct format'
          );
        const [quantity, unit, description] = ingredients;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipeData = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };

    const recipe = await helper.postJson(url, recipeData);

    const responseData = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
      key: recipe.key,
    };

    state.recipe = responseData;
  } catch (err) {
    throw err;
  }
};
