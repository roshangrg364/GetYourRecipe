import icons from 'url:../../img/icons.svg';

class PaginationView {
  #parentElm = document.querySelector('.pagination');
  #Data;

  render(data) {
    this.#Data = data;
    const markUp = this.#generatepaginationView(data);
    this.clear();
    this.#parentElm.insertAdjacentHTML('afterbegin', markUp);
  }

  clear() {
    this.#parentElm.innerHTML = '';
  }

  renderEventListener(handler) {
    this.#parentElm.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline ');
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  #generatepaginationView(data) {
    const noOfPages = Math.ceil(
      data.searchResult.length / data.maxNoOfItemInPage
    );
    const currentPageNo = data.page;
    if (currentPageNo == 1 && noOfPages > 1) {
      return `
        <button data-goto=${
          currentPageNo + 1
        } class="btn--inline pagination__btn--next">
        <span>Page ${currentPageNo + 1}</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button> 
        `;
    }

    if (currentPageNo == noOfPages && noOfPages > 1) {
      return `<button data-goto=${
        currentPageNo - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPageNo - 1}</span>
      </button>`;
    }

    if (currentPageNo < noOfPages) {
      return `
        <button data-goto=${
          currentPageNo + 1
        } class="btn--inline pagination__btn--next">
        <span>Page ${currentPageNo + 1}</span>
        <svg class="search__icon">
          <use href="src/img/icons.svg#icon-arrow-right"></use>
        </svg>
      </button> 

      <button data-goto=${
        currentPageNo - 1
      } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPageNo - 1}</span>
      </button>
        `;
    }

    return '';
  }
}

export default new PaginationView();
