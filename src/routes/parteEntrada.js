const express = require('express');
const router = express.Router();
const pool=require('../database'); 
//const articulos = await pool.query('SELECT * FROM db_partent.articulo'); 


router.get('/add', (req, res) => {    
    var articulos = [];
    var proveedores = [];
    var almacenes = [];
    pool.getConnection(function(err, conn){
        conn.query("select * from proveedor where est = true", function(err, rows){
            if(err) {
                throw err;
            } else {
                setProvees(rows);
            }
        });
        function setProvees(value) {
            proveedores = value;
        }
        conn.query("select * from almacen where est = true", function(err, rows){
            if(err) {
                throw err;
            } else {
                setAlms(rows);
            }
        });
        function setAlms(value) {
            almacenes = value;
                //console.log(almacenes,proveedores);
                res.render('parteEntrada/add', {articulos,proveedores,almacenes}); 
                //lo puse dentro porque asi lo cuenta para tomar los datos

        }
        
    })
});

//render == incrusta
router.post('/add', async (req, res) => {
    console.log('aaah >:v');
    const { codipro,codialm,codi } = req.body;
    var cod = (codi)
    var codpro = (codipro)
    var codalm = (codialm)
    const newPe = {
        cod,codpro,codalm,
    };

    console.log(newPe);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.partent set  ?', [newPe]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success', 'parte guardado ');
    res.redirect('/detalle/add/'+codi);// "el redirect funciona como un return no se lee lo que le sigue" by coren

});

router.get('/delete/:cod', async (req, res) => {
    const { cod } = req.params;
    pool.getConnection(function(err, conn){
        conn.query('DELETE FROM db_partent.partent WHERE cod like?', [cod], function(err, rows){
            if(err) {
                throw err;
            }else{
                req.flash('success', 'parte guardado');
                res.redirect('/parteEntrada/');
            }

        });
    });
    


});
router.get('/edit/:codi', async (req, res) => { //se muestra en el link 
    const { codi } = req.params;
    const partents = await pool.query('SELECT * FROM partent WHERE cod like ?', [codi]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    console.log(partents)
    var proveedores = [];
    var almacenes = [];
    pool.getConnection(function(err, conn){
        conn.query("select * from proveedor where est = 1", function(err, rows){
            if(err) {
                throw err;
            } else {
                setProvees(rows);
            }
        });
        function setProvees(value) {
            proveedores = value;
        }
        conn.query("select * from almacen where est = 1", function(err, rows){
            if(err) {
                throw err;
            } else {
                setAlms(rows);
            }
        });
        function setAlms(value) {
            almacenes = value;
            res.render('parteEntrada/edit', { partent: partents[0],proveedores,almacenes});
        }
        
    })
});

router.post('/edit/:codi', async (req, res) => { 
    const {codi}=req.params;
    const {newcod, codpro, codalm} = req.body;
    var cod=newcod;
    const newPe = {
        cod,codpro,codalm
    };
    console.log("<newPe>");
    console.log(newPe);
    console.log("<newPe>");
    await pool.query('update partent set ? where cod like ?', [newPe, codi]);

    req.flash('success', 'parte entrada guardado');
    res.redirect('/parteEntrada');

});

router.get('/', async (req, res) => {
    //const {cod} =req.params ;
    const parts = await pool.query('SELECT * FROM db_partent.partent');
    console.log(parts);
    res.render('parteEntrada/list', { parts }); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
    //nota: no pongo :cod porque de por si uso edit.hbs y no necesita el cod que recbe en la info del link\ 

});

module.exports = router;
