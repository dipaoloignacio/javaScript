const express = require('express');
const mongoose = require('mongoose');
const producto = require('./js/producto.controller');
const app = express();
const port = 3000;
app.use(express.json());
mongoose.connect('mongodb+srv://nachobeatbox:a1b2c3d4@cluster0.uwb9ebe.mongodb.net/miapp?retryWrites=true&w=majority');

app.get('/productos', producto.list);
app.post('/productos', producto.create);
app.get('/productos/:id', producto.get);
app.put('/productos/:id', producto.update);
app.patch('/productos/:id', producto.update);
app.delete('/productos/:id', producto.destroy);

app.use(express.static('js'));
app.use(express.static('css'));
app.use(express.static('fonts'));
app.use(express.static('images'));
app.use(express.static('pages'));

app.get('/', (req, res) =>{
    console.log(__dirname);
    res.sendFile(`${__dirname}/index.html`);
});

app.listen(port, () => {
    console.log('arrancando');
});

