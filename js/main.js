//MARKET.
//Creo un formulario en una constante para agregarlo al html.
const formularioProductos = () => {
    const formProducto = `
            <form action="" id="form">
                <h1 id="title-form">Agrega tus productos</h1>
                <div class="d-flex flex-wrap align-self-center justify-content-around w-50 text-light"
                    style="column-gap: 10px;">
                    <h2 class="align-self-center text-primary ">Tipo:</h2>
                    <div class="form-check align-self-end">
                        <label class="form-check-label fs-5" for="tipo">
                            Comida
                            <input required class="form-check-input " type="radio" name="tipo" value="comida"
                                id="comida">
                        </label>
                    </div>
                    <div class="form-check align-self-end">
                        <label class="form-check-label fs-5 " for="tipo">
                            Tecnologia
                            <input class="form-check-input" type="radio" value="tecnologia" name="tipo"
                                id="tecnologia">
                        </label>
                    </div>
                    <div class="form-check align-self-end">
                        <label class="form-check-label fs-5" for="tipo">
                            Inmueble
                            <input class="form-check-input" type="radio" value="inmueble" name="tipo"
                                id="inmueble">
                        </label>
                    </div>
                    <div class="form-check align-self-end">
                        <label class="form-check-label fs-5" for="tipo">
                            Otros (default)
                            <input class="form-check-input" type="radio" value="otros" name="tipo"
                                id="otros">
                        </label>
                    </div>
                </div>

                <div class="input-group align-self-center w-50" for="nombre">
                    <input type="text" id="nombre" name="nombre" class="form-control ms-3" placeholder="Nombre..."
                        aria-label="Username" aria-describedby="basic-addon1" required>
                </div>

                <div class="input-group w-50 align-self-center">
                    <span class="input-group-text ms-3">$</span>
                    <input type="number" name="precio" class="form-control " id="precio" placeholder="Precio..."
                        aria-label="Amount (to the nearest dollar)" required>
                    <span class="input-group-text">.00</span>
                </div>

                <div class=" d-flex form-check ms-3 align-self-center">
                    <h3 class="text-primary">Posee envio?</h3>
                    <label class="form-check-label text-light fs-5 ms-5" for="flexRadioDefault1">
                        <input class="form-check-input " type="radio" name="envio" id="envioSi" value="Si">Si
                    </label>
                    <label class="form-check-label text-light fs-5 ms-5" for="flexRadioDefault1">
                        <input required class="form-check-input" type="radio" name="envio" id="envioNo" value="No">No (default)
                    </label>
                </div>
                <button type="submit" class="btn btn-primary fs-3 mw-50 align-self-center mb-2">Agregar</button>
            </form>
        `
    const body = document.getElementById('formulario');
    //agrego el formulario al html.
    body.innerHTML = formProducto;
}

//genero una funcion asincronica para llamar los productos que tengo en la base de datos mediente un fetch y el metodo POST.
const getProductos = async () => {
    const response = await fetch('/productos')
    //traigo los productos guardados y los paso a objeto js.
    const productos = await response.json();
    //genero el html para cargargar los productos.
    const template = producto =>
       `<div class="producto">
            <ul class="list-group list-group-flush" id="productoLista">
                <li class="list-group-item">  <h5>  TIPO DE PRODUCTO:</h5><p>${producto.tipo}</p></li>
                <li class="list-group-item">  <h5>  NOMBRE: </h5><p>${producto.nombre} </p></li>
                <li class="list-group-item">  <h5>  PRECIO:  </h5><p> ${producto.precio} </p></li>
                <li class="list-group-item">  <h5> POSEE ENVIO: </h5> <p>${producto.envio} </p></li>
            </ul><button class="btn-eliminar btn btn-primary fs-3 mw-50 align-self-center mb-2" data-id="${producto._id}"> Eliminar</button>
        </div>`
        //paso los productos a traves de un .map al html.
        const productList = document.getElementById('mostrar-productos');
        productList.innerHTML = productos.map(producto => template(producto)).join('')
        //hago un foreach para tener accion en el btn de eliminar trayendo el id y mediante fetch y su id hago uso del metodo delete del producto.
        productos.forEach(producto => {
            const productoNode = document.querySelector(`[data-id="${producto._id}"]`);
            //escucho el evento click para eliminar.
            productoNode.onclick = async e => {
                await fetch(`/productos/${producto._id}`,{
                    method: 'DELETE',
                })
                productoNode.parentNode.remove();
            }
        })
}

//Funcion para crear productos a traves del formulario.
const addFormListener = () => {
    const prodForm = document.getElementById('form');
    prodForm.onsubmit = async (e) => {
        e.preventDefault();
        //busco los valores del formulario a traves de la funcion FormData.
        const formData = new FormData(prodForm);
        //lo transformo en objeto Json gracias ala funcion que proporciona FormData que es .entries().
        const data = Object.fromEntries(formData.entries())
        await fetch('/productos', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        prodForm.reset();
        getProductos();
    }
}

window.onload = () => {
    //ejecuto las funciones cuando se termina de cargar la pagina para crear, traer los productos.
    formularioProductos();
    addFormListener();
    getProductos();

    //funcion de una libreria para llevar a la cabecera la pagina.
    const elevator = new Elevator({
        element: document.querySelector('#subir'),
        duration: 1000 // milliseconds
    });
}