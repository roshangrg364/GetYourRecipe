class searchView {
  #parentElm = document.querySelector('.search');

  getQuery() {
    const query = this.#parentElm.querySelector('.search__field').value;
    this.#clearInput();
    return query;
  }

  #clearInput() {
    this.#parentElm.querySelector('.search__field').value = '';
  }

  renderEventListener(handler) {
    this.#parentElm.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
