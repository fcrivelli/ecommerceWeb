//Librerias y dependencias
var express = require('express'); 
var app = express();
const PORT = 8080;
var server = require('http').Server(app); 
var io = require('socket.io')(server);
var mongoose = require ('mongoose');
var modelProduct = require('../models/product.js');
var modelMessage  = require('../models/menssage.js');

//Recursos
app.use(express.static(__dirname));

//Configuracion del servidor
app.set('views', './views'); //permite gestionar las rutas de los diferentes recursos
app.set('view engine','ejs'); //Establece el motor de plantilla, con archivos ejs
app.use(express.urlencoded({extended: true})); //Permiten recuperar valores publicados en un request

//Base de Datos
//Creacion Tablas
CRUD()
async function CRUD() {
    try{
        const URL = 'mongodb://localhost:27017/ecommerce'
        let rta = await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Base de datos conectada');
    } catch(error){
        console.log(`Error en Crud: ${error}`)
    }
}


//Coneccion web socket para productos
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');   
  socket.emit('products', modelProduct.products.find({}).sort({name: 1})); 
  socket.on('new-product', function(data) { 
    new modelProduct.products({ name: data.name, price: data.price, stock: data.stock, thumbnail: data.thumbnail, category: data.category }).save(); 
    io.sockets.emit('products', modelProduct.products.find({}).sort({name: 1})); 
  }); 
});

//Coneccion web socket para mensajes usuarios
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');   
  socket.emit('messages', modelMessage.messages.find({}).sort({name: 1})); 
  socket.on('new-message', function(data) { 
    new modelMessage.messages({ username: data.username, text: data.text, date: data.date }).save();
    io.sockets.emit('messages', modelMessage.messages.find({}).sort({name: 1})); 
  }); 
});

//Enrutamiento
//Inicio de pagina
app.get('/', (req, res) => {
    res.render("./layouts/main.ejs");
})

//Adherir productos
app.get('/crear-producto', (req, res) => {
    res.render("./layouts/addProduct.ejs");
})

app.post('/crear-producto', (req, res) => {
    if(req.body){
        let newProduct = req.body;
        new modelProduct.products({ name: newProduct.name, price: newProduct.price, stock: newProduct.stock, thumbnail: newProduct.thumbnail, category: newProduct.category }).save();
    }
})

//Muestra cartilla
app.get('/cartilla', (req, res) => {
  res.render("./layouts/cart.ejs");
})

//Muestra listado de productos
app.get('/productos', (req, res) => {
   let products = [];
  modelProduct.products.find({}).sort({name: 1})
  .then(rows => {
     products = rows;
     modelMessage.messages.find({}).sort({date: 1})
     .then(rows =>{
        res.render('./layouts/products.ejs', {products: products, messages: rows} );
     }).catch(err => console.log(err.message));
  }).catch(err => console.log(err.message) );
})

//Muestra listado de productos
app.get('/contacto', (req, res) => {
    res.render("./layouts/contact.ejs");
})
/*
app.get('/*', (req, res) =>{
    res.render('./layouts/notfound.ejs');
})
*/
//Abro mi servidor
app.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log("My HTTP server listening on port " + PORT + "...");
});


