import icons from 'url:../../img/icons.svg';

class searchResultView {
  #parentElm = document.querySelector('.results');
  #Data;
  #errorMsg = 'Result is empty.Please search again!';
  #successMessage = '';
  render(data) {
    if (data.length == 0) {
      this.renderError();
      return;
    }
    this.#Data = data;
    const markUp = this.#generateResultView(data);
    this.clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markUp);
  }

  update(data) {
    this.#Data = data;
    const newRecipeHtml = this.#generateResultView(data);

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
    this.clear();
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

    this.clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', errorHtml);
  }

  clear() {
    this.#parentElm.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>`;
    this.clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markup);
  }
  #generateResultView(data) {
    const id = window.location.hash.slice(1);
    return `${data
      .map(recp => {
        return `<li class="preview">
            <a class="preview__link ${
              id == recp.id ? 'preview__link--active' : ''
            }" href="#${recp.id}">
            <figure class="preview__fig">
                <img src="${recp.image}" alt="${recp.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">${recp.title}</h4>
                <p class="preview__publisher">${recp.publisher}</p>
                <div class="preview__user-generated ${
                  recp.key ? '' : 'hidden'
                }">
                <svg>
                    <use href="${icons}#icon-user"></use>
                </svg>
                </div>
            </div>
            </a>
        </li>`;
      })
      .join('')}`;
  }
}

export default new searchResultView();
