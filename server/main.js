//Librerias y dependencias
var express = require('express'); 
var app = express();
const PORT = 8080;
const server = require('http').Server(app); 
const io = require('socket.io')(server);
const { options } = require('../options/sqlite3');
const knex = require('knex')(options); 

//Recursos
app.use(express.static(__dirname));

//Configuracion del servidor
app.set('views', './views'); //permite gestionar las rutas de los diferentes recursos
app.set('view engine','ejs'); //Establece el motor de plantilla, con archivos ejs
app.use(express.urlencoded({extended: true})); //Permiten recuperar valores publicados en un request

//Base de Datos
//Creacion Tablas
knex.schema.hasTable('producto').then(exists => {
    if(!exists){
        knex.schema.createTable('producto', table => {
            table.increments('id')
            table.string('name')
            table.integer('price')
            table.integer('stock')
            table.string('thumbnail')
        }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
        })
    }
})

knex.schema.hasTable('cart').then(exists => {
    if(!exists){
        knex.schema.createTable('cart', table => {
            table.increments('id')
            table.string('name')
            table.integer('amount')
            table.integer('productoid')
        }).then(() => console.log("table created"))
        .catch((err) => { console.log(err); throw err })
        .finally(() => {
        })
    }
})


//Coneccion web socket para productos
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');   
  socket.emit('products', products); 
  socket.on('new-product', function(data) { 
    products.push(data); 
    io.sockets.emit('products', products); 
  }); 
});

//Coneccion web socket para mensajes usuarios
io.on('connection', function(socket) { 
  console.log('Alguien se ha conectado con Sockets');   
  socket.emit('messages', messages); 
  socket.on('new-message', function(data) { 
    messages.push(data); 
    io.sockets.emit('messages', messages); 
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

})

//Muestra cartilla
app.get('/cartilla', (req, res) => {
  res.render("./layouts/cart.ejs");
})

//Muestra listado de productos
app.get('/productos', (req, res) => {
    knex.from('producto').select("*").orderBy('name')
    .then((rows) => {
        res.render('./layouts/products.ejs', {modelo: rows} );
    }).catch((err) => { console.log(err); throw err; })
    .finally(() => {
    })
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

/*
app.get('/api/productos/listar', (req, res) => {
    if(indice == 0){
        res.status(400).send(msjProductsNotCharge);
    } else {
        res.send(workProducts.getProducts());
    }
});

app.get('/api/productos/listar/:id', (req, res) => {
    if(!workProducts.validateId(req.params.id)){
        res.status(400).send(msjProductNotFound);
    } else {
        res.send({
            id: req.params.id,
            product: workProducts.getProductById(req.params.id)
        });
    }
});

app.delete('/api/productos/borrar', (req, res) => {
    if(!workProducts.validateBody(req.body)){
        res.status(400).send(msjError);
    } else {
        workProducts.deleteProduct(req.body);
        res.send(msjDelete);
    }
});

app.put('/api/productos/actualizar', (req, res) => {
    if(!workProducts.validateBody(req.body)){
        res.status(400).send(msjError);
    } else {
        workProducts.updateProduct(req.body);
        res.send(msjSave);
    }
});

app.post('/api/productos/guardar', (req, res) => {
    if(!workProducts.validateBody(req.body)){
        res.status(400).send(msjError);
    } else {
        workProducts.saveProduct(req.body);
        res.send(msjSave);
    }
});
*/
