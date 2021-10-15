//Librerias y dependencias
const PORT = 8080;
var express = require('express');
var router = require('../router/products');

//make sure you keep this order
var app = express();
app.use(express.json());
var server = require('http').Server(app); 
var io = require('socket.io')(server);

var mongoose = require('mongoose');
var modelProduct = require('../models/product.js');
var modelMessage  = require('../models/menssage.js');

//Recursos
app.use(express.static('public'));

/*Configuracion de router */
//app.use('/api', router.set());

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

//Coneccion web socket para mensajes usuarios
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');
  getMessages(socket, false);
  socket.on('new-message', function(data) { 
    new modelMessage.messages({ username: data.username, text: data.text, date: data.date }).save()
    .then(() => {
        getMessages(socket, true);
    }).catch(err => console.log(err.messages));
  }); 
});

//Get Mensajes y render Menssages
function getMessages (socket, newMessage){
    modelMessage.messages.find({}).sort({name: 1})
    .then(rows => {
        if(newMessage){
            io.sockets.emit('messages', rows); 
        } else { socket.emit('messages', rows); }
    }).catch(() => {
        if(newMessage){
            io.sockets.emit('messages', []); 
        } else { socket.emit('messages', []); }
    });
 }

//Get Productos y render Products
function getProducts (res, layout){
   modelProduct.products.find({}).sort({name: 1})
   .then(rows => {
        res.render(layout, {products: rows} );
   }).catch(err => res.render(layout, {products: []} ));
}

//Enrutamiento
/* Procesamiento de rutas No implementadas 
app.get('*', router.notFound);
app.post('*', router.notFound);
app.put('*', router.notFound);
app.delete('*', router.notFound);*/

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
        new modelProduct.products({ name: newProduct.name, price: newProduct.price, stock: newProduct.stock, 
            thumbnail: newProduct.thumbnail, category: newProduct.category }).save()
        .then(() => {
            getProducts(res, "./layouts/products.ejs");
        }).catch(err => getProducts(res, "./layouts/products.ejs"));    
    }
})

//Muestra cartilla
app.get('/cartilla', (req, res) => {
  res.render("./layouts/cart.ejs");
})

//Muestra catalogo
app.get('/catalogo', (req, res) => {
    getProducts(res, "./layouts/catalogue.ejs");
})

//Muestra listado de productos
app.get('/productos', (req, res) => {
   getProducts(res, "./layouts/products.ejs");
})

//Muestra listado de productos
app.get('/contacto', (req, res) => {
    res.render("./layouts/contact.ejs");
})

//Productos vista test
/*
app.get('/*', (req, res) =>{
    res.render('./layouts/notfound.ejs');
})*/

//Abro mi servidor
server.listen(PORT, err => {
    if(err) throw new Error(`Error en servidor ${err}`)
    console.log("My HTTP server listening on port " + PORT + "...");
});


