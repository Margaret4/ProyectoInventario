const express = require('express');
const router = express.Router();


router.get('/', (req,res)=>{
 res.redirect("parteEntrada/")
 //render es par incrustar un handlebars
 //un redirect para redireccionar a la pagina
});

   
module.exports = router;