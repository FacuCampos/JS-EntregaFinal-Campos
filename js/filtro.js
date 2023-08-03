
function crearFiltro(filtroBox){
    // Busco todas las categorias y editoriales existentes en catalogo
    const categorias = catalogo.filter((prod, index, self) => self.findIndex((el) => el.categoria === prod.categoria) === index)
    .map(prod => prod.categoria);
    const editoriales = catalogo.filter((prod, index, self) => self.findIndex((el) => el.editorial === prod.editorial) === index)
    .map(prod => prod.editorial);

    // Creo el HTML del filtro
    const filtro = document.createElement('div');
    filtro.classList.add('filtro');
    filtro.innerHTML = '<h3>Filtro</h3>';
    filtroBox.appendChild(filtro);

    const categoria = document.createElement('div');
    categoria.innerHTML = '<h4>Categoria</h4>';
    filtro.appendChild(categoria);

    let ul = document.createElement('ul');
    categoria.appendChild(ul);
    categorias.forEach((cat, index) => {
        let li = document.createElement('li');
        ul.appendChild(li);
        let form = document.createElement('form');
        form.innerHTML =   `<label class="labelCategoria d-flex">
                                <p class="txt-filtro">${cat}</p>
                                <input type="checkbox" id="cb-cat-${index}" class="cbox" data-tipo="categoria">
                            </label>`
        li.appendChild(form);
        const checkboxCat = document.getElementById(`cb-cat-${index}`);
        checkboxCat.onclick = () => {
            filtrar();
        }
    })

    const editorial = document.createElement('div');
    editorial.innerHTML = '<h4>Editorial</h4>';
    filtro.appendChild(editorial);
    
    ul = document.createElement('ul');
    editorial.appendChild(ul);
    editoriales.forEach((edi, index) => {
        let li = document.createElement('li');
        ul.appendChild(li);
        let form = document.createElement('form');
        form.innerHTML =   `<label class="labelEditorial d-flex">
                                <p class="txt-filtro">${edi}</p>
                                <input type="checkbox" id="cb-edi-${index}" class="cbox" data-tipo="editorial">
                            </label>`
        li.appendChild(form);
        const checkboxEdi = document.getElementById(`cb-edi-${index}`);
        checkboxEdi.onclick = () => {
            filtrar();
        }
    })
}

function filtrar(){
    const checkboxes = document.querySelectorAll('.cbox'); //Busco todos los checkbox
    const categoriasSeleccionadas = [];
    const editorialesSeleccionadas = [];

    checkboxes.forEach((checkbox) => {
        if (checkbox.checked){ // Busco solo aquellos checkbox que esten activados
            if(checkbox.getAttribute("data-tipo") === "categoria"){
                let label = checkbox.parentElement;
                categoriasSeleccionadas.push(label.querySelector('p').innerText); // Pusheo a categoriaSeleccionada el texto junto al checkbox elegido
            }else if (checkbox.getAttribute("data-tipo") === "editorial"){
                let label = checkbox.parentElement;
                editorialesSeleccionadas.push(label.querySelector('p').innerText); // Pusheo a editorialSeleccionada el texto junto al checkbox elegido
            }
        }
    })

    // Filtro los elementos del catalogo que coinciden con los checkbox marcados.
    // Pido que si no hay nada marcado, devuelva true, y que si se marca una checkbox filtre los elementos del catalogo con esa categoria o editorial. Por ultimo que retorne aquellos donde coinciden ambas.
    const filtrados = catalogo.filter((item) => { 
        const categoriaIncluida = categoriasSeleccionadas.length === 0 || categoriasSeleccionadas.includes(item.categoria);
        const editorialIncluida = editorialesSeleccionadas.length === 0 || editorialesSeleccionadas.includes(item.editorial);
        return categoriaIncluida && editorialIncluida;
    })

    mostrarProductos(filtrados) // Muestro los elementos que coinciden
}