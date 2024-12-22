'use strict';

var desserts = [
  {
    id: 1,
    title: "Waffle with Berries",
    type: "Waffle",
    price: 6.5,
    img: "assets/images/image-waffle-desktop.jpg",
    thumb: "assets/images/image-waffle-thumbnail.jpg",
  },
  {
    id: 2,
    title: "Vanilla Bean Crème Brûlée",
    type: "Crème Brûlée",
    price: 7.0,
    img: "assets/images/image-creme-brulee-desktop.jpg",
    thumb: "assets/images/image-creme-brulee-thumbnail.jpg",
  },
  {
    id: 3,
    title: "Mix of Five",
    type: "Macaron",
    price: 8.0,
    img: "assets/images/image-macaron-desktop.jpg",
    thumb: "assets/images/image-macaron-thumbnail.jpg",
  },
  {
    id: 4,
    title: "Classic Tiramisu",
    type: "Tiramisu",
    price: 5.5,
    img: "assets/images/image-tiramisu-desktop.jpg",
    thumb: "assets/images/image-tiramisu-thumbnail.jpg",
  },
  {
    id: 5,
    title: "Pistachio Baklava",
    type: "Baklava",
    price: 4.0,
    img: "assets/images/image-baklava-desktop.jpg",
    thumb: "assets/images/image-baklava-thumbnail.jpg",
  },
  {
    id: 6,
    title: "Lemon Meringue Pie",
    type: "Pie",
    price: 5.0,
    img: "assets/images/image-meringue-desktop.jpg",
    thumb: "assets/images/image-meringue-thumbnail.jpg",
  },
  {
    id: 7,
    title: "Red Velvet Cake",
    type: "Cake",
    price: 4.5,
    img: "assets/images/image-cake-desktop.jpg",
    thumb: "assets/images/image-cake-thumbnail.jpg",
  },
  {
    id: 8,
    title: "Salted Caramel Brownie",
    type: "Brownie",
    price: 4.5,
    img: "assets/images/image-brownie-desktop.jpg",
    thumb: "assets/images/image-brownie-thumbnail.jpg",
  },
  {
    id: 9,
    title: "Vanilla Panna Cotta",
    type: "Panna Cotta",
    price: 6.5,
    img: "assets/images/image-panna-cotta-desktop.jpg",
    thumb: "assets/images/image-panna-cotta-thumbnail.jpg",
  },
];

const formatearMoneda$1 = new Intl.NumberFormat("ES-es", {
  style: "currency",
  currency: "EUR",
});

const contenedorDeserts$1 = document.querySelector(".desserts__grid");

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
              <p class="card__price">${formatearMoneda$1.format(
                dessert.price
              )}</p>
            </div>
          </div>`;
    contenedorDeserts$1.innerHTML += plantilla;
  });
};

const formatearMoneda = new Intl.NumberFormat("ES-es", {
  style: "currency",
  currency: "EUR",
});

const contenedorDeserts = document.querySelector(".desserts__grid");
var carrito = [];
const agregarCarrito = (productoId, ascDesc = "asc") => {
  const dessertAñadido = desserts.find((dessert) => {
    if (dessert.id === parseInt(productoId)) {
      return dessert;
    }
  });

  if (carrito.length == 0) {
    carrito.push(dessertAñadido);
    dessertAñadido.cantidad = 1;
  } else {
    let productoRepetido = false;
    carrito.forEach((producto) => {
      if (producto.id === parseInt(productoId)) {
        if (ascDesc === "asc") {
          producto.cantidad++;
        } else if (ascDesc === "desc" && producto.cantidad > 1) {
          producto.cantidad--;
        }

        productoRepetido = true;
      }
    });
    if (!productoRepetido) {
      carrito.push(dessertAñadido);
      dessertAñadido.cantidad = 1;
    }
  }
};

const mostrarCarrito = () => {
  const cartBody = document.querySelector(".cart__body");
  const cartFooter = document.querySelector(".cart__footer");
  const carritoVacio = document.getElementById("carrito-vacio");
  cartBody.innerHTML = "";
  document.getElementById("total-productos-carrito").innerText = carrito.length;
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      let plantilla = `<div class="cart__product" data-id="${producto.id}">
            <div class="product__content">
              <h5>${producto.title}</h5>
              <p class="product__details">
                <span id="cantidad-producto">${producto.cantidad}x</span>
                <span id="total-x-unidad">@ ${formatearMoneda.format(
                  producto.price
                )}</span>
                <span id="total-x-unidades">${formatearMoneda.format(
                  producto.price * producto.cantidad
                )}</span>
              </p>
            </div>
            <button class="product__delete" data-action="delete">
              <img
                src="assets/images/icon-remove-item.svg"
                alt="eliminarbtn"
                class="cart__img"
              />
            </button>
          </div>`;

      cartBody.innerHTML += plantilla;
    });

    cartFooter.classList.add("cart__footer--active");

    carritoVacio.classList.remove("carrito__vacio--active");
    actualizarTotal();
  } else {
    cartFooter.classList.remove("cart__footer--active");

    carritoVacio.classList.add("carrito__vacio--active");
  }
};

const actualizarTotal = () => {
  let total = 0;
  if (carrito.length > 0) {
    carrito.forEach((producto) => {
      total += producto.cantidad * producto.price;
    });

    document.getElementById("precio-total").innerText =
      formatearMoneda.format(total);
  }
};

const actualizarCantidadDesert = (spanCantidad) => {
  const idProductoDessert = spanCantidad.closest(".desserts__card").dataset.id;

  carrito.forEach((producto) => {
    if (producto.id === parseInt(idProductoDessert)) {
      spanCantidad.innerHTML = producto.cantidad;
    }
  });
};

const mostrarCarritoConfirm = () => {
  document.querySelector(".confirm__products").innerHTML = "";
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.price * producto.cantidad;
    let plantilla = `<div class="confirm__content">
            <div class="confirm__thumb">
              <img
                src="${producto.thumb}"
                alt="thumb"
                class="confirm__img"
              />
              <div class="confirm__texts">
                <h4 class="confirm__product">${producto.title}</h4>
                <p class="confirm__details">
                  <span class="confirm__cantidad">${producto.cantidad}x</span
                  ><span class="confirm__unidad">@${formatearMoneda.format(
                    producto.price
                  )}</span>
                </p>
              </div>
            </div>

            <p class="confirm__price">${formatearMoneda.format(
              producto.cantidad * producto.price
            )}</p>
          </div>`;
    document.querySelector(".confirm__products").innerHTML += plantilla;
  });
  document.getElementById("confirm__price").innerHTML =
    formatearMoneda.format(total);
  document.querySelector(".confirm").classList.add("confirm--active");
};

contenedorDeserts.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const objetivo = e.target.closest("button");
    if (objetivo.dataset.action === "añadir") {
      objetivo.classList.remove("card__button--active");
      objetivo
        .closest(".card__picture")
        .querySelector(".card__button + div")
        .classList.add("card__button--active");
      agregarCarrito(objetivo.closest(".desserts__card").dataset.id);
      mostrarCarrito();
    } else if (objetivo.dataset.action === "aumentar") {
      agregarCarrito(objetivo.closest(".desserts__card").dataset.id);
      mostrarCarrito();

      actualizarCantidadDesert(
        objetivo.closest("div").querySelector("#cantidad")
      );
    } else if (objetivo.dataset.action === "decrementar") {
      agregarCarrito(objetivo.closest(".desserts__card").dataset.id, "desc");
      mostrarCarrito();

      actualizarCantidadDesert(
        objetivo.closest("div").querySelector("#cantidad")
      );
    }
  }
});

const contenedorCarrito = document.getElementById("carrito-body");
const comprobarBtnAñadir = (idProductoEliminar) => {
  const productosDessert = document.querySelectorAll(".desserts__card");

  productosDessert.forEach((producto) => {
    if (producto.dataset.id === idProductoEliminar) {
      producto
        .querySelector(".card__button[data-action='añadir']")
        .classList.add("card__button--active");
      producto
        .querySelector(".card__button + div")
        .classList.remove("card__button--active");
      producto.querySelector("#cantidad").innerText = 1;
    }
  });
};
contenedorCarrito.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    const objetivo = e.target.closest("button");
    if (objetivo.dataset.action === "delete") {
      const idProductoEliminar = objetivo.closest("[data-id]").dataset.id;
      let carritoActualizado = carrito.filter((producto) => {
        if (producto.id !== parseInt(idProductoEliminar)) {
          return producto;
        }
      });
      carrito = carritoActualizado;
      mostrarCarrito();
      comprobarBtnAñadir(objetivo.closest(".cart__product").dataset.id);
    }
  }
});

const btnConfirm = document.getElementById("btnConfirm");

btnConfirm.addEventListener("click", () => {
  document.querySelector("body").style.overflow = "hidden";
  mostrarCarritoConfirm();
});

document.getElementById("btnNewOrder").addEventListener("click", () => {
  document.querySelector("body").style.overflow = "auto";
  document.querySelector(".confirm").classList.remove("confirm--active");
});

cargarProductos();
