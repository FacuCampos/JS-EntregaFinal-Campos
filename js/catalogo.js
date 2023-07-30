const DateTime = luxon.DateTime;
const Duration = luxon.Duration;
const Interval = luxon.Interval;

const catalogo = []; //Creo un array al que le voy a agarrar todos los productos del JSON


function inicio(){
    document.addEventListener('DOMContentLoaded', traerCarrito); // Cuando termine de cargar el DOM, le pido que ejecute traerCarrito de carrito.js
    crearCarrito();
    cargarProductos();
}

// Traigo los productos del JSON y los pusheo a catalogo
async function cargarProductos(){
    const response = await fetch('./productos.json');
    if (response.ok){
        let productos = await response.json();
        productos.forEach((el) => {
            catalogo.push(el);
        });
        promocion();
        crearTienda(); // Si no hay problemas, creo la vista de la tienda y agrego la notificacion de promociones
    }else{
        Toastify({
            text:"Hubo un error, por favor intente mas tarde",
            duration: 10000,
            close: true,
            gravity: 'bottom',
            stopOnFocus:true,
        }).showToast();
    }
}

// Mediante Luxon creo un anuncio de ofertas con una cuenta regresiva
function promocion(){
    const promos = catalogo.map((item) => item.descuento); //Busco los descuentos de cada uno
    const divOferta = document.getElementById('promos');
    if (promos.some((el) => (el > 0))){ // Si hay al menos un producto con descuento, muestra el anuncio
        let interval = setInterval(() => {
            const hoy = DateTime.now();
            let durPromo = Duration.fromObject({months: 2});
            let inicioPromo = DateTime.local(2023,7,30);
            let finPromo = inicioPromo.plus(durPromo);
            let tiempo = Interval.fromDateTimes(hoy, finPromo).length('seconds');
    
            let dias = Math.floor(tiempo/60/60/24);
            let horas = Math.floor(tiempo/60/60%24);
            let minutos = Math.floor(tiempo/60%60);
            let segundos = Math.floor(tiempo%60);
    
            divOferta.innerHTML = `<p>¡Aprovecha estos descuentos por tiempo limitado! Ahorrate hasta un <span>¡¡¡${Math.max(...promos)}%!!!</span> Tiempo restante: <span>${dias} dias - ${horas}hs : ${minutos}min : ${segundos}seg</span></p>`;

            if (tiempo <= 0){ // Cuando el tiempo llegue a 0, elimina el anuncio y le quita el descuento a cada producto
                catalogo.forEach((item) => item.descuento = 0);
                clearInterval(interval);
                mostrarProductos();
                promocion();
            }
        }, 0)
    }else{ // Si no hay descuentos oculta el contenedor
        divOferta.classList.toggle('d-none');
    }
}


function crearTienda(){
    const seccionTienda = document.getElementById('tiendaContenedor');
    seccionTienda.classList.add('d-flex')
    seccionTienda.innerHTML = '';

    const filtroBox = document.createElement('div'); // Creo el contenedor del filtro
    filtroBox.classList.add('filtro-box');
    seccionTienda.appendChild(filtroBox);
    crearFiltro(filtroBox);

    const productosVista = document.createElement('div'); // Creo el contenedor de los productos
    productosVista.setAttribute('id', 'listaProductos');
    seccionTienda.appendChild(productosVista);
    filtrar(); // Llamo a filtrar en filtro.js , al iniciar la pagina, al no haber filtros, se muestra el catalogo completo
}

function mostrarProductos(productos){
    const vistaProductos = document.getElementById('listaProductos');
    vistaProductos.innerHTML = '';
    if (productos.length === 0){
        vistaProductos.classList.remove('vistaProductos');
        vistaProductos.classList.add('vistaVacia');
        const divVacio = document.createElement('div');
        divVacio.innerHTML =   `<p>No se ha encontrado ninguna coincidencia</p>
                                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#1b3039" class="bi bi-emoji-frown" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
                                </svg>`;
        vistaProductos.appendChild(divVacio); 
    }else{
        vistaProductos.classList.remove('vistaVacia');
        vistaProductos.classList.add('vistaProductos');
        productos.forEach((elemento) => {
            tarjeta(elemento, vistaProductos);
        });
    }
}

// Creo cada tarjeta de productos a mostrar
function tarjeta(producto, seccion){ 
    const {id, nombre, precio, imagen, alternativo, descuento} = producto;
    const card = document.createElement('div');
    card.classList.add('d-flex', 'justify-content-center');

    const figure = document.createElement('figure');
    figure.classList.add('producto');

    const image = document.createElement('div');
    image.innerHTML =`<img src="./img/productos/${imagen}" alt="${alternativo}">`
    figure.appendChild(image);
    
    const infoProducto = document.createElement('div');
    infoProducto.classList.add('info-producto');
    figure.appendChild(infoProducto);

    const figcaption = document.createElement('figcaption');
    figcaption.innerHTML = `<p>${nombre}</p>`
    infoProducto.appendChild(figcaption);

    const descuentoBox = document.createElement('div');
    descuentoBox.classList.add('descuentoBox');
    descuentoBox.innerHTML = `  <p class="descuento">Descuento ${descuento}%</p>
                                <p class="precioSinDescuento">$${precio.toLocaleString()}</p>`
    infoProducto.appendChild(descuentoBox);

    const precioProducto = document.createElement('p');
    precioProducto.classList.add('precioConDescuento');
    precioProducto.innerText = `$${(precio*((100-descuento)/100)).toLocaleString()}`;
    infoProducto.appendChild(precioProducto);

    const botonEnTarjeta = document.createElement('button');
    botonEnTarjeta.setAttribute('id', `agregar-${id}`);
    botonEnTarjeta.innerText = '+ Agregar al carrito';
    figure.appendChild(botonEnTarjeta);

    card.appendChild(figure);
    seccion.appendChild(card);
    botonEnTarjeta.onclick = () => {
        agregarCarrito(producto);
        mostrarTostada();
    };

    if (descuento == 0){
        descuentoBox.classList.add('d-none');
    }
}

//Tostada de producto agregado
function mostrarTostada(){
    Toastify({
        text: "Producto agregado al carrito",
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        className: 'tostada',
        //onClick: abrirCarrito()
      }).showToast();
}

//INICIO DEL PROGRAMA
inicio();