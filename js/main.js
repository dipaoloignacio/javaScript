//MARKET.
//Creo la clase de los productos .

class producto {
    constructor(tipo, nombre, precio, envio) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.precio = precio;
        this.envio = envio;
    }

}

// //funcion para validar el tipo de producto.
// function tipoProducto() {
//     do {
//         tipo = parseFloat(prompt("Bienvenido a NDP MARKET.\n" +
//             "Ingrese '1' para vender Comida.\n" +
//             "Ingrese '2' para vender tecnologia.\n" +
//             "Ingrese '3' para vender inmuebles.\n" +
//             "Ingrese '4' para vender otros.\n"));

//         if (isNaN(tipo) || tipo < 0 || tipo > 4) {
//             alert("Opcion no valida.");
//         }

//     } while (isNaN(tipo) || tipo < 0 || tipo > 4);

//     switch (tipo) {
//         case 1:
//             return tipo = "Comida"
//             break;
//         case 2:
//             return tipo = "Tecnologia"
//             break;
//         case 3:
//             return tipo = "inmuebles"
//             break;
//         case 4:
//             return tipo = "otros"
//             break;
//     }
// }

// //funcion para validar nombre del producto.
// function nombreProducto() {
//     do {
//         nombre = (prompt("Porfavor ingrese el nombre del producto que desea vender."));

//         if (isNaN(nombre) === false) {
//             alert("Error intente de nuevo.");
//         }

//     } while (isNaN(nombre) === false);
//     return nombre;
// }
// //funcion para validar precio del producto.
// function precioProducto() {
//     do {
//         precio = parseFloat(prompt("Porfavor ingrese el precio del producto que desea vender."));

//         if (isNaN(precio) || precio < 0) {
//             alert("Error intente de nuevo.");
//         }

//     } while (isNaN(precio) || precio < 0);
//     return precio;
// }

// //funcion para validar si tiene envio o no.
// function envioProducto() {
//     do {
//         envio = (prompt("Porfavor ingrese '1' si posee envio o '2' de lo contrario."));

//         if (isNaN(envio) || envio < 0 || envio > 2) {
//             alert("Error intente de nuevo.");
//         }

//     } while (isNaN(envio) || envio < 0 || envio > 2);

//     if (envio == 1) {
//         return envio = "Si";
//     } else {
//         return envio = "No";
//     }
// }

// // Creo un array vacio para almacenar los productos.
// let productos = [];


// //Creo un cliclo para seguir preguntando si quiere vender mas productos o no y para crear un producto.
// do {
//     n1 = parseFloat(prompt(" Desea Vender o seguir vendiendo? \n" +
//         " Ingrese '1' para comenzar a vender. \n" +
//         " Ingrese '2' para finalizar."));

//     switch (n1) {
//         case 1:
//             let product = new producto(tipoProducto(), nombreProducto(), precioProducto(), envioProducto());

//             productos.push(product);
//             break;
//         case 2:
//             break;
//         default:
//             alert("opcion invalida, intentalo de nuevo.");
//     }

// } while (n1 != 2);

let productos= [];

const produc = new producto("Comida", "fideos" , 5 , "No");
const produc1 = new producto("Tecnologia", "celular" , 15 , "Si");
const produc2 = new producto("Inmuebles", "departamento" , 25 , "Si");
const produc3 = new producto("Comida", "carne" , 35 , "Si");
const produc5 = new producto("Comida", "snaks" , 45 , "No");
const produc6 = new producto("Otros", "snaks" , 45 , "No");
const produc7 = new producto("Otros", "snaks" , 45 , "No");

productos.push(produc,produc1,produc2,produc3,produc5,produc6,produc7);



//AGREGRO LOS DIV DE ACUERDO CON LA CANTIDAD DE PRODUCTOS QUE AGREGO EL USUARIO.
const cant = document.getElementById('mostrar-productos');


for (let i = 0; i < productos.length; i++) {

    cant.innerHTML += '<div class="producto">' + '</div>';

}

console.log(cant);


//TOMO LOS DIV CON LA CLASE "CUADROS" QUE GENERE ANTERIORMENTE, QUE A SU VEZ VAN A SER LA MISMA CANTIDAD DE PRODUCTOS.
const prod = document.getElementsByClassName('producto');

//MEDIANTE UN CICLO 'FOR' ITERO CADA DIV CON LA CLASE 'CUADROS' Y TAMBIEN CADA PRODUCTO.
//TAMBIEN LE COLOCO LAS ESPECIFICACIONES DEL PRODUCTO INGRESADO.
for (let i = 0; i < prod.length; i++) {
    prod[i].innerHTML = '<ul>' +
        '<li>' + '<h5>' + "TIPO DE PRODUCTO: " + '</h5>' + '<p>' + productos[i].tipo + '</p>' + '</li>' +
        '<li>' + '<h5>' + "NOMBRE: " + '</h5>' + '<p>' + productos[i].nombre + '</p>' + '</li>' +
        '<li>' + '<h5>' + "PRECIO: " + '</h5>' + '<p>' + " $" + productos[i].precio + '</p>' + '</li>' +
        '<li>' + '<h5>' + "POSEE ENVIO: " + '</h5>' + '<p>' + productos[i].envio + '</p>' + '</li>' + '</ul>'
}

console.log(prod);


//Creo tomo el Id de los div para cada tipo de producto en el html.
const porc = document.getElementById('prod1');
const porc1 = document.getElementById('prod2');
const porc2 = document.getElementById('prod3');
const porc3 = document.getElementById('prod4');


//Creo la funcion para sacar el porcentaje de productos segun el tipo.
function sacarPorcentaje() {
    let contador = 0;
    let contador2 = 0;
    let contador3 = 0;
    let contador1 = 0;

    for (i = 0; i < productos.length; i++) {

        console.log(productos[i].tipo);

        if (productos[i].tipo == "Comida") {
            contador++;
        } else if (productos[i].tipo == "Tecnologia") {
            contador1++;
        } else if (productos[i].tipo == "Inmuebles") {
            contador2++;
        } else if (productos[i].tipo == "Otros") {
            contador3++;
        }

    }

    if (contador > 0) {
        porc.innerHTML += '<h3>'+ ((contador / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

    if (contador1 > 0) {
        porc1.innerHTML += '<h3>' +   ((contador1 / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

    if (contador2 > 0) {
        porc2.innerHTML += '<h3>' + ((contador2 / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }
    
    if (contador3 > 0) {
        porc3.innerHTML += '<h3>' +  ((contador3 / productos.length) * 100).toFixed(2) + '%' + '</h3>';
    }

}


//Llamo la funcion que saca el porcentaje de los tipos de productos.
sacarPorcentaje();


