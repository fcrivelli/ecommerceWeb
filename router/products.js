const express = require('express');
const router = express.Router();
const api = require('../api/products');

const notFound = (req, res) => {
    let {url} = req;
    let {method} = req;
    res.send(`Ruta <span style="color: blue;">${method}</span> <i style="color: red;">${url}`);
}

function set(){
   // router.get('/generate/:cant?', api.generate);
  //  router.get('/:id?', api.get);
    //router.post('/', api.post);
   // router.put('/:id', api.put);
  //  router.delete('/:id', api.del)
  //  return router;
}

module.exports = {
    set,
    notFound
}