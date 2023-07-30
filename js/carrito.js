// Constructor de cada item de la factura
class ItemFactura{
    id;
    nombre;
    precio;
    cantidad;
    imagen;
    alternativo;

    constructor(id, nombre, precio, cantidad, imagen, alternativo){
        this.id =id;
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
        this.imagen = imagen;
        this.alternativo = alternativo;
    }
}


// Items del carrito
let arrayCarrito = [];

// Me fijo si hay un carrito guardado en local storage o traigo un array vacio
function traerCarrito(){ 
    arrayCarrito = JSON.parse(localStorage.getItem("carrito")) || []; 
    refrescarCarito();
}

function carritoAlStorage(){
    localStorage.setItem("carrito", JSON.stringify(arrayCarrito));
}

//Creo la tabla que usare para mostrar el carrito
function crearCarrito(){
    let contenedor = document.getElementById('carritoContenedor');
    contenedor.classList.add('ocultar');
    contenedor.innerHTML = `<div id="ticketCarrito">
                                <table>
                                    <thead>
                                    <tr>
                                        <th class="headTabla productosCol" scope="col">Producto</th>
                                        <th class="headTabla cantidadCol" scope="col">Cantidad</th>
                                        <th class="headTabla subtotalCol" scope="col">Subtotal</th>
                                    </tr>
                                    </thead>
                                    <tbody id="tablaBody">
                                    </tbody>
                                </table>
                            </div>`;
    let botonAbrirCarrito = document.getElementById('botonCarrito'); // Boton del nav para abrir el carrito
    botonAbrirCarrito.addEventListener('click', () => {abrirCarrito()})

    let botonesCarritoInf = document.createElement('div'); // Contenedor inferior donde estan los botones limpiar y comprar
    botonesCarritoInf.classList.add('d-flex', 'justify-content-end');
    contenedor.appendChild(botonesCarritoInf);

    let botonLimpiar = document.createElement('button'); // Boton limpiar
    botonLimpiar.className = 'borrarCarrito';
    botonLimpiar.innerText = 'Limpiar';
    botonesCarritoInf.appendChild(botonLimpiar);
    botonLimpiar.addEventListener('click', () => {limpiarCarrito()})

    let botonComprar = document.createElement('button'); // Boton comprar
    botonComprar.className = 'botonComprar';
    botonComprar.innerText = 'Comprar';
    botonesCarritoInf.appendChild(botonComprar);
    botonComprar.addEventListener('click', () => {comprarCarrito()})
}

//Creo cada row de la tabla
function filaTabla(producto, tabla){
    const fila = document.createElement('tr');
    fila.classList.add('itemTicket');
    
    let dato = document.createElement('td');
    dato.innerHTML = `<div class="itemEnTabla"><img class="imgCarrito" src="./img/productos/${producto.imagen}" alt="${producto.alternativo}"><p class="nombreEnTabla">${producto.nombre}</p></div>`;
    fila.appendChild(dato);
    
    dato = document.createElement('td');
    dato.classList.add('tdCantidad')
    dato.innerHTML = `    <div class="celdaCantidad">
                            <button id="restar-${producto.id}">-</button>
                            <p class="cantidadTicket">${producto.cantidad}</p>
                            <button id="sumar-${producto.id}">+</button>
                        </div>`
    fila.appendChild(dato);
    
    dato = document.createElement('td');
    dato.classList.add('precioColumna');
    dato.innerHTML = `$ ${(producto.precio*producto.cantidad).toLocaleString()}`;
    fila.appendChild(dato);
    
    tabla.appendChild(fila);
    const botonResta = document.getElementById(`restar-${producto.id}`);
    botonResta.addEventListener('click', () => {decrementarProducto(producto)});
    const botonSuma = document.getElementById(`sumar-${producto.id}`);
    botonSuma.addEventListener('click', () => {agregarCarrito(producto)});

}

// Cargo todos los elementos del array al carrito y actualizo el contador y el precio total
function refrescarCarito() {
    const tabla = document.getElementById('tablaBody');
    tabla.innerHTML = '';
    arrayCarrito.forEach((producto) => {
        filaTabla(producto, tabla);
    })

    const filaTotal = document.createElement('tr'); // Ultima fila de la tabla con el precio final
    filaTotal.classList.add('itemTicket', 'filaTotal');

    let thTotal = document.createElement('th');
    thTotal.colSpan = 2;
    thTotal.classList.add('totalTexto');
    thTotal.textContent = 'Total:';
    filaTotal.appendChild(thTotal);

    let tdTotal = document.createElement('td'); 
    tdTotal.classList.add('precioColumna')
    tdTotal.innerHTML = `$ ${(arrayCarrito.reduce((total, producto) => total + (producto.precio*producto.cantidad), 0)).toLocaleString()}`;
    filaTotal.appendChild(tdTotal);

    tabla.appendChild(filaTotal);

    let contador = document.getElementById('contadorCarrito');
    if (arrayCarrito.length !== 0){
        contador.classList.remove('d-none');
        contador.innerText = `${arrayCarrito.length}`
    }else{
        contador.classList.add('d-none');
    }
}

function limpiarCarrito (){ // Elimino todos los elementos del array
    Swal.fire({
        title: 'Advertencia',
        text: '¿Seguro que desea borrar el carrito de compras? Esta acción no se puede revertir',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Mejor no',
        confirmButtonText: 'Si, seguro',
    }).then((result) => {
        if (result.isConfirmed){
            arrayCarrito.splice(0,arrayCarrito.length);
            arrayCarrito = [];
            carritoAlStorage();
            refrescarCarito();
        }
    })
}

function comprarCarrito(){ // Simulo una compra exitosa. No se pide tarjeta ni nada.
    Swal.fire({
        title: 'Pagar',
        text: '¿Desea comprar los productos de carrito?',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Pagar',
    }).then((result) => {
        if (result.isConfirmed){
            arrayCarrito.splice(0,arrayCarrito.length);
            arrayCarrito = [];
            carritoAlStorage();
            refrescarCarito();
            abrirCarrito();
            Swal.fire({
                title: 'Comprado',
                text: 'La compra se ha realizado con exito',
                icon: 'success',
            })          
        }
    })
}

function abrirCarrito(){
    const ticket = document.getElementById('carritoContenedor');
    const botonAbrirCarrito = document.getElementById('carritoLi');
    ticket.classList.toggle('d-none');
    botonAbrirCarrito.classList.toggle('carritoOnClick');
}

function agregarCarrito (eleccion){
    let indice = arrayCarrito.findIndex((el) => el.id === eleccion.id);
    if(indice !== -1){
        arrayCarrito[indice].cantidad++;
    }else{
        let nuevoItem = new ItemFactura(eleccion.id, eleccion.nombre, eleccion.precio*((100-eleccion.descuento)/100), 1, eleccion.imagen, eleccion.alternativo);
        arrayCarrito.push(nuevoItem);
    }
    carritoAlStorage();
    refrescarCarito();
}

function decrementarProducto(eleccion){
    let indice = arrayCarrito.findIndex((el) => el.id === eleccion.id);
    if (arrayCarrito[indice].cantidad == 1){
        arrayCarrito.splice([indice],1);
    }else{
        arrayCarrito[indice].cantidad--;
    }
    carritoAlStorage();
    refrescarCarito();
}