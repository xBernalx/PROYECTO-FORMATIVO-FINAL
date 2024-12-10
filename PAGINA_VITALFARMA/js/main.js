const productos = [
    {
        id: "vitamina-01",
        titulo: "Vitamina",
        imagen: "/assets/img/vitamina-c.png",
        categoria: {
            nombre: "vitamina",
            id: "vitamina"
        },
        precio: 5000
    },
    {
        id: "dolor-01",
        titulo: "Acetaminofen",
        imagen: "/assets/img/acetaminofen.png",
        categoria: {
            nombre: "Acetaminofen",
            id: "dolor"
        },
        precio: 1400
    },
    {
        id: "dolor-02",
        titulo: "Advil",
        imagen: "/assets/img/advil.png",
        categoria: {
            nombre: "Advil",
            id: "dolor"
        },
        precio: 3500
    },
    {
        id: "dolor-03",
        titulo: "Dolex +2",
        imagen: "/assets/img/dolex2+.png",
        categoria: {
            nombre: "Dolex +2",
            id: "dolor"
        },
        precio: 16500
    },
    {
        id: "dolor-04",
        titulo: "ibuprofeno",
        imagen: "/assets/img/ibuprofeno.png",
        categoria: {
            nombre: "Ibuprofeno",
            id: "dolor"
        },
        precio: 4000
    },
    {
        id: "dolor-06",
        titulo: "naproxeno",
        imagen: "/assets/img/naproxeno.png",
        categoria: {
            nombre: "Naproxeno",
            id: "dolor"
        },
        precio: 6000
    },
    {
        id: "gripa-01",
        titulo: "Pax",
        imagen: "/assets/img/pax.png",
        categoria: {
            nombre: "Pax",
            id: "gripa"
        },
        precio: 2600
    },
    {
        id: "dolor-05",
        titulo: "X-ray",
        imagen: "/assets/img/x-ray.png",
        categoria: {
            nombre: "X-ray",
            id: "dolor"
        },
        precio: 3500
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
            <div class="col mb-5">
            <div class="card h-100">
            <img class="card-img-top" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="card-body p-4">
            <div class="text-center">
            <h5 class="fw-bolder">${producto.titulo}</h5>
            <div class="d-flex justify-content-center small text-warning mb-2">
            <div class="bi-star-fill"></div>
            <div class="bi-star-fill"></div>
            <div class="bi-star-fill"></div>
            <div class="bi-star-fill"></div>
            <div class="bi-star-fill"></div>
        </div>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
            </div>
            </div>
        </div>
    </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}