import icons from 'url:../../img/icons.svg';

class bookMarkView {
  #parentElm = document.querySelector('.bookmarks__list');
  #bookMarkData;
  #errorMsg = 'Cannot load bookmarks';
  render(data) {
    this.#bookMarkData = data;
    const markUp = this.#generatebookMarkView();
    this.#clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markUp);
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

  #clear() {
    this.#parentElm.innerHTML = '';
  }

  #generatebookMarkView() {
    const data = this.#bookMarkData;
    const id = window.location.hash.slice(1);

    if (data.length == 0)
      return ` <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>
      No bookmarks yet. Find a nice recipe and bookmark it :)
    </p>
  </div>
  `;
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

export default new bookMarkView();
