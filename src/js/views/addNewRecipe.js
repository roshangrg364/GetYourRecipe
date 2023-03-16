import icons from 'url:../../img/icons.svg';

class addNewRecipe {
  #overLay = document.querySelector('.overlay');
  #addRecipeWindow = document.querySelector('.add-recipe-window');
  #btnClose = document.querySelector('.btn--close-modal');
  #btnAddRecipe = document.querySelector('.nav__btn--add-recipe');

  #formUpload = document.querySelector('.formUpload');

  #errorMsg = 'Cannot add recipe';
  #successMessage = 'Successfully added Recipe';

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.#clear();
    this.#formUpload.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this.#errorMsg) {
    const errorHtml = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div>`;

    this.#clear();
    this.#formUpload.insertAdjacentHTML('afterbegin', errorHtml);
  }

  renderMessage(message = this.#successMessage) {
    const errorHtml = `<div class="message">
  <div>
    <svg>
      <use href="${icons}#icon-smile"></use>
    </svg>
  </div>
  <p>${message}</p>
</div>`;

    this.#clear();
    this.#formUpload.insertAdjacentHTML('afterbegin', errorHtml);
  }

  #clear() {
    this.#formUpload.innerHTML = '';
  }

  addRecipeEventListener() {
    this.#btnAddRecipe.addEventListener('click', this.openModel.bind(this));
  }

  closeModelEventListener() {
    this.#btnClose.addEventListener('click', this.closeModal.bind(this));
  }

  addUploadNewRecipeEventListener(handler) {
    this.#addRecipeWindow.addEventListener('submit', function (e) {
      e.preventDefault();
      const elm = e.target.closest('.upload');
      if (!elm) return;
      const formData = [...new FormData(elm)];
      const data = Object.fromEntries(formData);
      handler(data);
    });
  }
  openModel() {
    this.toggleWindow();
    this.#formUpload.innerHTML = `  <form class="upload">
  <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="Test Recipe" required name="title" type="text" />
    <label>URL</label>
    <input
      value="http:/SourceUrl"
      required
      name="sourceUrl"
      type="text"
    />
    <label>Image URL</label>
    <input
      value="http://forkify-api.herokuapp.com/images/BBQChickenPizzawithCauliflowerCrust5004699695624ce.jpg"
      required
      name="image"
      type="text"
    />
    <label>Publisher</label>
    <input value="Roshan Gurung" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="30" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="2" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value="0.5,kg,Rice"
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value="1,,Avocado"
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=",,salt"
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg>
      <use href="src/img/icons.svg#icon-upload-cloud"></use>
    </svg>
    <span>Upload</span>
  </button>
</form>`;
  }

  closeModal() {
    this.toggleWindow();
  }
  toggleWindow() {
    this.#addRecipeWindow.classList.toggle('hidden');
    this.#overLay.classList.toggle('hidden');
  }
}

export default new addNewRecipe();
