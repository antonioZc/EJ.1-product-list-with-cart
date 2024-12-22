import desserts from "./data";
const formatearMoneda = new Intl.NumberFormat("ES-es", {
  style: "currency",
  currency: "EUR",
});

const contenedorDeserts = document.querySelector(".desserts__grid");

const cargarProductos = () => {
  desserts.forEach((dessert) => {
    let plantilla = ` <div class="desserts__card" data-id ="${dessert.id}">
            <div class="card__picture">
              <img
                src="${dessert.img}"
                alt=""
                class="card__img"
              />
              <button class="card__button card__button--active" data-action="añadir">
                <img src="assets/images/icon-add-to-cart.svg" alt="" />Add to
                Cart
              </button>
              <div class="card__button">
                <button class="btnMasMenos" data-action="decrementar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="2"
                    viewBox="0 0 10 2"
                    class="svg"
                  >
                    <path d="M0 .375h10v1.25H0V.375Z" />
                  </svg>
                </button>

                <span id="cantidad">1</span>
                <button class="btnMasMenos" data-action="aumentar">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    class="svg"
                  >
                    <path
                      d="M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="card__content">
              <p class="card__type">${dessert.type}</p>
              <h4 class="card__title">${dessert.title}</h4>
              <p class="card__price">${formatearMoneda.format(
                dessert.price
              )}</p>
            </div>
          </div>`;
    contenedorDeserts.innerHTML += plantilla;
  });
};

export default cargarProductos;
