import desserts from "./data";
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
    actualizarTotal(carrito);
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
