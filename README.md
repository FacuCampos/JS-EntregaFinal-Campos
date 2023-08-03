# EntregaFinal-Campos
## Herramientas
### Lenguajes
- HTML 5
- CSS 3
- Javascript

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
<img width="1000" alt="navegador" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/0304c9e9-7b21-4d30-b224-a5d91833f8b9">

Este nav solo contiene el logo (enlazado al index) y el boton para abrir el carrito, el cual al tener un producto agregara un contador.


### Carrito
<img width="300" alt="carrito" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/ee9e0c89-4da7-4c1e-a3bb-3c673ffca553">

Al hacer *click* en el botón del **carrito** en el nav, **se le quitará la propiedad de *display: none* al carrito**, haciéndolo visible.
Los productos agregados al carrito **se guardarán en el local storage** en caso de que se refresque o cierre la ventana.

El **carrito** esta formado por una tabla donde se muestran los productos con su imagen, una celda con la cantidad (Acompañada de los botones para incrementar o decrementar la cantidad, al decrementar a 0 se eliminará el elemento del carrito), y el subtotal que refleja el precio multiplicado por la cantidad.

Todos los productos **se agregan a un array** y luego **se actualiza la vista** que muestra los productos elegidos, se **crea una fila de la tabla por cada elemento** que contenga. **Al decrementar un producto a 0, éste es eliminado del array**. 

Cada cambio también **actualiza el local storage**.

Luego se agregó una fila que muestra el total a pagar.

Debajo de la tabla, se encuentran los botones de **limpiar** y **comprar**: 

- Al apretar **limpiar** saltará una alerta con **Sweet Alert** pidiendo confirmación. Al confirmar **se eliminarán todos los elementos del array** y **se acualizarán la vista del carrito y el local storage**.

- Al apretar **comprar** saltará una alerta (También con **Sweet Alert**) pidiendo confirmación. Al confirmar **otra alerta nos dirá que el pago se ha realizado**, simulando una compra exitosa y salteándose el paso de ingresar una tarjeta. 


### Promos
<img width="1000" alt="promo" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/b4dc84b3-e8c3-40d7-b637-8c13b057af95">

Luego viene una seccion que puede o no estar, es un contenedor con un contador del tiempo restante para que se acabe la promo.
Todos los productos tienen la clave *"descuento"*, al cargar la página y el catalogo, **se fijará si algún producto tiene descuento mayor a 0**, en caso de que asi sea, **se mostrará el contenedor** de promo. Dentro del mismo **se mostrará el valor del descuento más grande**, seguido de una cuentra regresiva con el tiempo restante hasta el fin de la promo. La cuenta regresiva está hecha utilizando la libreria **Luxon** y la propiedad *setInterval*. **Al llegar a 0, la propiedad "descuento de todos los productos se cambiará a 0, se eliminará el setInterval y se ocultará el contenedor**.


## Tienda
Luego viene la sección de tienda, la cual está dividida el 2 partes, el **filtro**, y el **catálogo**.


### Filtro
<img width="200" alt="filtro" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/3c3057f2-fddd-412e-914a-eb513816ea2b">

La primer sección del la tienda es el filtro, que se encuentra a la izquierda. Para crearlo, se agregaron 2 categorias: *"Categoria"* y *"Editorial"*. Cada producto contiene una categoria y una editorial a modo de clave-valor del objeto.

Una función **recorre el array de productos y busca todas las categorias y editoriales** que haya, luego **desde el DOM se agregan al filtro**, junto con un checkbox para seleccionarlas. Por este motivo, si llegase a haber un error al cargar el catálogo, tampoco se cargará el filtro.

Al hacer *click* en un checkbox, **se crea un array con todos los elementos que coinciden con la propiedad seleccionada**, en caso de seleccionar una categoria y una editorial, se buscaran los productos que satisfagan ambar al mismo tiempo. Si no hay coincidencias, se informará con un texto.

En caso de no haber nada seleccionado, se mostrará todo el catálogo.


### Catálogo
<img width="342" alt="catalogo" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/6efdee81-a1f6-42b3-870a-e210c8059b93">

Esta sección es la que agarra el array de productos y muestra en pantalla todo el catálogo. **Por cada producto de *productos.json*, se crea una tarjeta** desde el DOM y se la agrega a un grid.

En caso de que ocurra un error al traer y convertir el .json de productos, una tostada nos informará de dicho error.

<img width="271" alt="errorToast" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/356ff305-7a96-4de1-b73e-b1527b990a33">

Cada tarjeta contiene un botón de *"Agregar al carrito"*, al hacer *click* **se agregara el elemento seleciconado al array de productos** y una tostada nos avisará que se agregó correctamente.

<img width="251" alt="agregadoToast" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/8afbbb8c-4ddb-49f4-bc64-b57e652c7a31">

**Se puede hacer *click* en la tostada para abrir el carrito**.


### Footer
<img width="949" alt="footer" src="https://github.com/FacuCampos/EntregaFinal-Campos/assets/129131205/cb18b6c6-95e2-45ac-bf77-766a8315f03e">

Por último hay un footer con la info de contacto.



