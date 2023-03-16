import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
class recipeView {
  #parentElm = document.querySelector('.recipe');
  #recipeData;
  #errorMsg = 'Cannot load recipe. Please try again';
  #successMessage = '';
  render(data) {
    this.#recipeData = data;
    const markUp = this.#generateRecipe();
    this.#clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this.#recipeData = data;
    const newRecipeHtml = this.#generateRecipe();

    const newDom = document
      .createRange()
      .createContextualFragment(newRecipeHtml);
    const newElms = Array.from(newDom.querySelectorAll('*'));
    const currentElms = Array.from(this.#parentElm.querySelectorAll('*'));

    newElms.forEach((newElm, i) => {
      const currentElm = currentElms[i];
      if (
        !newElm.isEqualNode(currentElm) &&
        newElm.firstChild?.nodeValue.trim() != ''
      ) {
        currentElm.textContent = newElm.textContent;
      }

      if (!newElm.isEqualNode(currentElm)) {
        const attributes = Array.from(newElm.attributes);
        attributes.forEach(attr =>
          currentElm.setAttribute(attr.name, attr.value)
        );
      }
    });
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
    this.#parentElm.insertAdjacentHTML('afterbegin', errorHtml);
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
    this.#parentElm.insertAdjacentHTML('afterbegin', errorHtml);
  }

  #clear() {
    this.#parentElm.innerHTML = '';
  }

  renderEventListener(handler) {
    window.addEventListener('hashchange', handler);
    window.addEventListener('load', handler);
  }

  updateServingEventListener(handler) {
    this.#parentElm.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-update-servings');
      if (!btn) return;
      const updateQty = +btn.dataset.updateqty;
      if (updateQty > 0) handler(updateQty);
    });
  }

  renderBookmarkEventListener(handler) {
    this.#parentElm.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn-bookmark');
      if (!btn) return;
      handler();
    });
  }
  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.#clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markup);
  }
  #generateRecipe() {
    return `
    <figure class="recipe__fig">
      <img src="${this.#recipeData.image}" alt="Tomato" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${this.#recipeData.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-clock"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--minutes">45</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
        <svg class="recipe__info-icon">
          <use href="${icons}#icon-users"></use>
        </svg>
        <span class="recipe__info-data recipe__info-data--people">${
          this.#recipeData.servings
        }</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button data-updateqty="${
            this.#recipeData.servings - 1
          }" class="btn--tiny btn-update-servings">
            <svg>
              <use href="${icons}#icon-minus-circle"></use>
            </svg>
          </button>
          <button data-updateqty="${
            this.#recipeData.servings + 1
          }" class="btn--tiny btn-update-servings">
            <svg>
              <use href="${icons}#icon-plus-circle"></use>
            </svg>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated ${
        this.#recipeData.key ? '' : 'hidden'
      }">
        <svg>
          <use href="${icons}#icon-user"></use>
        </svg>
      </div>
      <button class="btn--round btn-bookmark">
        <svg class="">
          <use href="${icons}#icon-bookmark${
      this.#recipeData.bookMarked ? '-fill' : ''
    }"></use>
        </svg>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
       ${this.#recipeData.ingredients
         .map(ing => {
           return `<li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}.svg#icon-check"></use>
        </svg>
        <div class="recipe__quantity">${
          ing.quantity ? new Fraction(ing.quantity).toString() : ''
        }</div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>`;
         })
         .join('')}

      </ul>
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__publisher">${
          this.#recipeData.publisher
        }</span>. Please check out
        directions at their website.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${this.#recipeData.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </a>
    </div>
    `;
  }
}

export default new recipeView();
