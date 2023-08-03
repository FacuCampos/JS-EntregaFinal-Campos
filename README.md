# EntregaFinal-Campos
## Herramientas
### Lenguajes
- HTML 5
- CSS 3
- JS

### Frameworks
- Bootstrap

### Librerias
- Toastify
- Sweet Alert
- Luxon

### Software de control de versiones
- git

### Diseño de imágenes
- Adobe Ilustrator

### Fuentes
- Google fonts

## Arkham store
Se utilizo como modelo para el diseño la pagina "tienda" del proyecto final del curso de Desarrollo web: https://facucampos.github.io/DW-PF-Campos/pages/tienda.html

### Navegador
<img width="900" alt="navegador" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/0304c9e9-7b21-4d30-b224-a5d91833f8b9">
Este nav solo contiene el logo (enlazado al index) y el boton para abrir el carrito, el cual al tener un producto agregara un contador.

### Carrito
<img width="300" alt="carrito" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/ee9e0c89-4da7-4c1e-a3bb-3c673ffca553">
Al hacer click en el botón del carrito en el nav, se le quitará la propiedad de display: none al carrito, haciéndolo visible.
Los productos agregados al carrito se guardarán en el local storage en caso de que se refresque o cierre la ventana.
El carrito esta formado por una tabla donde se muestran los productos con su imagen, una celda con la cantidad (Acompañada de los botones para incrementar o decrementar la cantidad, al decrementar a 0 se eliminará el elemento del carrito), y el subtotal que refleja el precio multiplicado por la cantidad.
Todos los productos se agregan a un array y luego se actualiza la vista que muestra los productos elegidos, se crea una fila de la tabla por cada elemento que contenga. Al decrementar un producto a 0, éste es eliminado del array. 
Cada cambio también actualiza el local storage.
Luego se agregó una fila que muestra el total a pagar.
Debajo de la tabla, se encuentran los botones de limpiar y comprar. 
Al apretar limpiar, saltará una alerta con Sweet Alert pidiendo confirmación. Al confirmar se eliminarán todos los elementos del array y se acualizarán la vista del carrito y el local storage.
Al apretar comprar saltará una alerta (También con Sweet Alert) pidiendo confirmación. Al confirmar otra alerta nos dirá que el pago se ha realizado, simulando una compra exitosa y salteándose el paso de ingresar una tarjeta. 

### Promos
<img width="900" alt="promo" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/b4dc84b3-e8c3-40d7-b637-8c13b057af95">
Luego viene una seccion que puede o no estar, es un contenedor con un contador del tiempo restante para que se acabe la promo.
Todos los productos tienen la propiedad "descuento", al cargar la página y el catalogo, se fijará si algún producto tiene descuento mayor a 0, en caso de que asi sea, se mostrará el contenedor de promo. Dentro del mismo se mostrará el valor del descuento más grande, seguido de una cuentra regresiva con el tiempo restante hasta el fin de la promo. La cuenta regresiva está hecha utilizando la libreria Luxon y la propiedad setInterval. Al llegar a 0, la propiedad "descuento de todos los productos se cambiará a 0, se eliminará el setInterval y se ocultará el contenedor.
