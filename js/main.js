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

let productos = [];
//Agrego contadores para sacar el porcentaje de los tipos de productos que tengo.
let contador = 0;
let contador2 = 0;
let contador3 = 0;
let contador1 = 0;

//Funcion para sacar los porcentajes de productos.
function porcentaje() {

    productos.forEach(function (p) {
        if (p.tipo == "Comida") {
            contador++;
        } else if (p.tipo == "Tecnologia") {
            contador1++;
        } else if (p.tipo == "Inmueble") {
            contador2++;
        } else if (p.tipo == "Otros") {
            contador3++;
        }
    });

    console.log(contador, contador1, contador2, contador3);

    const porc = document.getElementById('prod1');
    const porc1 = document.getElementById('prod2');
    const porc2 = document.getElementById('prod3');
    const porc3 = document.getElementById('prod4');

    //hago el calculo para sacar el porcentaje del tipo de cada producto.
    if (contador > 0) {
        porc.innerHTML = '<h3>' + ((contador / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

    if (contador1 > 0) {
        porc1.innerHTML = '<h3>' + ((contador1 / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

    if (contador2 > 0) {
        porc2.innerHTML = '<h3>' + ((contador2 / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

    if (contador3 > 0) {
        porc3.innerHTML = '<h3>' + ((contador3 / productos.length) * 100).toFixed(2) + '%' + '</h3>';

    }

    //vuelvo los contadores a 0 para cada vez que se agregue un producto no sume los valores anteriores.
    contador1 = 0;
    contador = 0;
    contador2 = 0;
    contador3 = 0;

}

//Creo una funcion para renderizar la pagina cada vez que se elimina un producto.
const render = () => {
    const cant = document.getElementById('mostrar-productos');

    //hago un mapeo del array productos e inserto el codigo al HTML para crear el cuadro del producto.
    const cantTemplate = productos.map(p => '<div class="producto">' + '<ul>' +
        '<li>' + '<h5>' + "TIPO DE PRODUCTO: " + '</h5>' + '<p>' + p.tipo + '</p>' + '</li>' +
        '<li>' + '<h5>' + "NOMBRE: " + '</h5>' + '<p>' + p.nombre + '</p>' + '</li>' +
        '<li>' + '<h5>' + "PRECIO: " + '</h5>' + '<p>' + " $" + p.precio + '</p>' + '</li>' +
        '<li>' + '<h5>' + "POSEE ENVIO: " + '</h5>' + '<p>' + p.envio + '</p>' + '</li>' + '</ul>' + '<button class="btn-eliminar"> ' + "Eliminar" + '</button>' + '</div>');
    cant.innerHTML = cantTemplate.join('');

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

//creo un formulario para tomar los datos y asi crear productos dentro de window.onload para esperar que se cargue todo.
window.onload = () => {
    const form = document.getElementById('form');

    form.onsubmit = (e) => {

        e.preventDefault();

        let tipo = '';

        const tipoComida = document.getElementById('Comida');
        const tipoTecnologia = document.getElementById('Tecnologia');
        const tipoInmueble = document.getElementById('Inmueble');
        const tipoOtros = document.getElementById('Otros');

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

        console.log(productos.length);

        //llamo la funcion para imprimir porcentajes.
        porcentaje();

        //llamo la funcion de renderizar la pagina.
        render();
    }

}