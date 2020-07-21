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

    const { codipro,codialm,codi } = req.body;
    var cod = (codi)
    var codpro = (codipro)
    var codalm = (codialm)
    const newPe = {
        cod,codpro,codalm,
    };

    console.log(newPe);  

    await pool.query('INSERT INTO db_partent.partent set  ?', [newPe]);


    req.flash('success', 'parte guardado ');
    res.redirect('/detalle/add/'+codi);

});

router.get('/delete/:cod', async (req, res) => {
    const { cod } = req.params;
    var antCant;
    var detalles;
    pool.getConnection(function(err, conn){
        
        conn.query('select * from detalle where codpe like ?', [cod], function(err, rows){
            if(err) {
                throw err;
            }else {
                detalles=rows;
                for(var i in detalles){
                    conn.query('update db_partent.articulo  set stock= stock - ? where cod like ?', [detalles[i].cant,detalles[i].codart+'%'], function(err, rows){
                        if(err) {
                            console.log("error al actualizar")
                            throw err;
                        }
                    });
                }
            }
        });

        conn.query('DELETE FROM db_partent.partent WHERE cod like ?', [cod], function(err, rows){
            if(err) {
                throw err;
            }else{
                req.flash('success', 'parte eliminado');
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

router.post('/edit/:antcod', async (req, res) => { 
    const {antcod}=req.params;
    const {newcod, codpro, codalm} = req.body;
    var cod=newcod;
    const newPe = {
        cod,codpro,codalm
    };
    console.log("<newPe>");
    console.log(newPe);
    console.log("<newPe>");
    await pool.query('update partent set ? where cod like ?', [newPe, antcod]);

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
