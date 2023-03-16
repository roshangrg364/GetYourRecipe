import 'core-js/stable';
import 'regenerator-runtime';
import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultView from './views/searchResultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addNewRecipe from './views/addNewRecipe.js';
// https://forkify-api.herokuapp.com/v2

const showRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    searchResultView.update(model.getPaginatedSearchResult());
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const recipe = model.state.recipe;
    recipeView.render(recipe);
    bookmarkView.render(model.state.bookMarks);
  } catch (err) {
    recipeView.renderError();
  }
};

const showSearchResult = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultView.renderSpinner();
    await model.getRecipeResult(query);
    searchResultView.render(model.getPaginatedSearchResult());
    paginationView.render(model.state);
  } catch (err) {
    searchResultView.renderError();
  }
};

const showPagination = function (pageNo) {
  searchResultView.render(model.getPaginatedSearchResult(pageNo));
  paginationView.render(model.state);
};

const updateServing = function (newServings) {
  model.updateServing(newServings);
  recipeView.update(model.state.recipe);
};

const addDeleteBookMark = function () {
  if (model.state.recipe.bookMarked) model.deleteBookMark(model.state.recipe);
  else model.addBookMark(model.state.recipe);
  recipeView.update(model.state.recipe);
  bookmarkView.render(model.state.bookMarks);
};

const getBookMarkFromLocalStorage = function () {
  model.getRecipeBookMarkFromLocalStorage();
  bookmarkView.render(model.state.bookMarks);
};

const UploadNewRecipe = async function (uploadData) {
  try {
    addNewRecipe.renderSpinner();
    await model.addNewRecipe(uploadData);
    recipeView.render(model.state.recipe);
    addNewRecipe.renderMessage('Successfully Added Recipe');
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(function () {
      addNewRecipe.toggleWindow();
    }, 2000);
  } catch (err) {
    console.log(err);
    addNewRecipe.renderError(err);
  }
};

const init = function () {
  recipeView.renderEventListener(showRecipe);
  searchView.renderEventListener(showSearchResult);
  paginationView.renderEventListener(showPagination);
  recipeView.updateServingEventListener(updateServing);
  recipeView.renderBookmarkEventListener(addDeleteBookMark);
  getBookMarkFromLocalStorage();
  addNewRecipe.addRecipeEventListener();
  addNewRecipe.closeModelEventListener();
  addNewRecipe.addUploadNewRecipeEventListener(UploadNewRecipe);
};

init();
