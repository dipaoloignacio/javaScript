//MARKET.
//Creo el Objeto de los productos .
class producto {
    constructor(tipo, nombre, precio, envio) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.envio = envio;
    }
}

//Agrego contadores para sacar el porcentaje de los tipos de productos que tengo.
let contador = 0;
let contador2 = 0;
let contador3 = 0;
let contador1 = 0;

//Funcion para sacar los porcentajes de productos.
function porcentaje() {

    productos.forEach(function (p) {
        if (p.tipo == "comida") {
            contador++;
        } else if (p.tipo == "tecnologia") {
            contador1++;
        } else if (p.tipo == "inmueble") {
            contador2++;
        } else if (p.tipo == "otros") {
            contador3++;
        }
    });

    console.log(contador, contador1, contador2, contador3);

    const porc = document.getElementById('prod1');
    const porc1 = document.getElementById('prod2');
    const porc2 = document.getElementById('prod3');
    const porc3 = document.getElementById('prod4');

    function sacarPorcentaje(num) {
        return ((num / productos.length) * 100).toFixed(0);
    }

    //hago el calculo para sacar el porcentaje del tipo de cada producto.
    if (contador > 0) {
        porc.innerHTML = '<h3>' + sacarPorcentaje(contador) + '%' + '</h3>';
    }
    if (contador1 > 0) {
        porc1.innerHTML = '<h3>' + sacarPorcentaje(contador1) + '%' + '</h3>';
    }
    if (contador2 > 0) {
        porc2.innerHTML = '<h3>' + sacarPorcentaje(contador2) + '%' + '</h3>';
    }
    if (contador3 > 0) {
        porc3.innerHTML = '<h3>' + sacarPorcentaje(contador3) + '%' + '</h3>';
    }

    //vuelvo los contadores a 0 para cada vez que se agregue un producto no sume los valores anteriores.
    contador1 = 0;
    contador = 0;
    contador2 = 0;
    contador3 = 0;
}

const productos = JSON.parse(localStorage.getItem('productos')) || [];

//Creo una funcion para renderizar la pagina cada vez que se elimina un producto.
const render = () => {
    const cant = document.getElementById('mostrar-productos');

    //hago un mapeo del array productos e inserto el codigo al HTML para crear el cuadro del producto.
    const cantTemplate = productos.map(p => '<div class="producto">' + '<ul class="list-group list-group-flush">' +
        '<li class="list-group-item">' + '<h5>' + "TIPO DE PRODUCTO: " + '</h5>' + '<p>' + p.tipo + '</p>' + '</li>' +
        '<li class="list-group-item">' + '<h5>' + "NOMBRE: " + '</h5>' + '<p>' + p.nombre + '</p>' + '</li>' +
        '<li class="list-group-item">' + '<h5>' + "PRECIO: " + '</h5>' + '<p>' + " $" + p.precio + '</p>' + '</li>' +
        '<li class="list-group-item">' + '<h5>' + "POSEE ENVIO: " + '</h5>' + '<p>' + p.envio + '</p>' + '</li>' + '</ul>' + '<button class="btn-eliminar btn btn-primary fs-3 mw-50 align-self-center mb-2"> ' + "Eliminar" + '</button>' + '</div>');

    cant.innerHTML = cantTemplate.join('');

    console.log(productos.tipo);
    //genero dos arrays donde estan los productos.
    const eli = document.querySelectorAll('.btn-eliminar');
    const eliminar = document.querySelectorAll('.producto');

    //llamo donde se van a colocar los porcentajes para pasarlos a 0 y actualizarlos
    //cuando se elimina un producto.
    const porc = document.getElementById('prod1');
    const porc1 = document.getElementById('prod2');
    const porc2 = document.getElementById('prod3');
    const porc3 = document.getElementById('prod4');

    //hago un foreach donde se almacenan los productos y poder eliminar el selecionado a travez de un evento 'Click'.
    eli.forEach((e, i) => {
        e.addEventListener('click', () => {
            console.log(e, i);
            eliminar[i].parentNode.removeChild(eliminar[i]);
            productos.splice(i, 1);

            //llamo la funcion para almacenar y actualizar los productos en el local storage.
            actualizaProdcutos(productos);

            //paso a 0 los porcentajes.
            porc.innerHTML = "";
            porc1.innerHTML = "";
            porc2.innerHTML = "";
            porc3.innerHTML = "";
            //llamo de nuevo la funcion para sacar nuevamente los pocentajes.
            porcentaje();

            render();
        })
    });
}

//Para no repetir codigo creo una funcion para actualizar, pasarlos a string los productos y setearlos en localStorage.
const actualizaProdcutos = (productos) => {
    const prodString = JSON.stringify(productos);
    localStorage.setItem('productos', prodString);
}

//creo un formulario para tomar los datos y asi crear productos dentro de window.onload para esperar que se cargue todo.

window.onload = () => {
    render();
    const form = document.getElementById('form');

    const elevator = new Elevator({
        element: document.querySelector('#subir'),
        duration: 1000 // milliseconds
      });
    form.onsubmit = (e) => {

        e.preventDefault();

        let tipo = '';

        const tipoComida = document.getElementById('comida');
        const tipoTecnologia = document.getElementById('tecnologia');
        const tipoInmueble = document.getElementById('inmueble');
        const tipoOtros = document.getElementById('otros');

        //valido que esta marcado, en caso que no se marque nada, Default es 'Otros'.
        if (tipoComida.checked) {
            tipo = tipoComida.value;
        } else if (tipoTecnologia.checked) {
            tipo = tipoTecnologia.value;
        } else if (tipoInmueble.checked) {
            tipo = tipoInmueble.value;
        } else {
            tipo = tipoOtros.value;
        }

        //asigno el valor que ingreso por el input al nombre, al precio y envio.
        const nombre = document.getElementById("nombre");
        const nombreValor = nombre.value;
        nombre.value = '';

        const precio = document.getElementById("precio");
        const precioValor = precio.value;
        precio.value = 0;

        const envioSi = document.getElementById("envioSi");
        const envioNo = document.getElementById('envioNo');

        if (envioSi.checked) {
            envio = envioSi.value;
        } else {
            envio = envioNo.value;
        }

        //creo y hago push del producto al array vacio que tenia.
        const produc = new producto(tipo, nombreValor, precioValor, envio);

        productos.push(produc);

        //llamo la funcion para almacenar y actualizar los productos en el local storage.
        actualizaProdcutos(productos);

        //llamo la funcion para imprimir porcentajes cuando se crea un producto.
        porcentaje();

        //llamo la funcion de renderizar la pagina.
        render();

    }

    //llamo la funcion para imprimir porcentajes.
    porcentaje();
}