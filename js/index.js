const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://nachobeatbox:a1b2c3d4@cluster0.uwb9ebe.mongodb.net/miapp?retryWrites=true&w=majority');

const Producto = mongoose.model('Producto', {
    tipo: String,
    nombre: String,
    precio: Number,
    envio: String
})

const crear = async () => {
    const user = new Producto({});
    const saveUser = await user.save();

    console.log(saveUser);
}

// crear()

const buscarTodo = async () => {
    const users = await Producto.find({ username: 'Mariano' });
    console.log(users);
}

// buscarTodo();

const buscarUno = async () => {
    const user = await Producto.find({ username: 'Mariano Di Paolo' });
    // const users = await User.findOne({username: 'Ignacio'});
    console.log(user);
}

// buscarUno();

const actualizar = async () => {
    const user = await Producto.findOne({ username: 'Ignacio Di Paolo' });
    console.log(user);
    user.edad = 25;
    await user.save();

}

// actualizar();

const eliminar = async () => {
    const user = await User.findOne({ username: 'Mariano Di Paolo' });
    if (user) {
        await user.remove();
    }
}

// eliminar();