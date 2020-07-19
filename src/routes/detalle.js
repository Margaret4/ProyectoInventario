const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add/:codpe', (req, res) => {
    const {codpe}=req.params;
    var articulos=[];
    pool.getConnection(function(err, conn){
        conn.query("SELECT articulo.* FROM articulo  WHERE est = 1 and NOT EXISTS(SELECT 1 FROM detalle  WHERE detalle.cod like ? and detalle.codart=articulo.cod)",[codpe], function(err, rows){
            if(err) {
                throw err;
            } else {
                setArts(rows);
            }
        });
        function setArts(value) {
            articulos = value;
            console.log(articulos)
            res.render('detalles/add', {articulos,codpe}); 
                //lo puse dentro porque asi lo cuenta para tomar los datos
        }
        
    })
});



//render == incrusta
router.post('/add/:codpe', async (req, res) => {
    const {codpe} = req.params;
    const { codarti, canti } = req.body;
    var codart = (codarti)
    var cant = parseFloat(canti)
    const newArt = {
        codart,codpe,cant

    };
    console.log(newArt);  //aaaqui >:v7
    pool.getConnection(function(err, conn){
        conn.query('INSERT INTO db_partent.detalle set  ?', [newArt], function(err, rows){
            if(err) 
                throw err;
        });
        conn.query('update db_partent.articulo  set stock= stock+ ? where cod like ?', [newArt.cant,codart+'%'], function(err, rows){
            if(err) 
                throw err;
                req.flash('success', 'Guardado');
            res.redirect('/detalle/'+codpe);// "el redirect funciona como un return no se lee lo que le sigue" by coren

        });
        
    }); 

});

router.get('/delete/:codpe/:codart', async (req, res) => {
    const { codpe,codart } = req.params;
    pool.getConnection(function(err, conn){
        if(err) console.log(err)
        conn.query('select * FROM detalle WHERE codpe like ? and codart like ?', [codpe,codart+'%'],function(err, rows){
            //error curioso
            if(err) {
                throw err;
            }
            else {
                setCant(rows) 
                console.log(rows)
            }
        });
        function setCant(values){
            var antCant=parseFloat(values[0].cant)
            conn.query('update db_partent.articulo  set stock= stock - ? where cod like ?', [antCant,codart+'%'], function(err, rows){
                if(err) 
                    throw err;
                else {
                    conn.query('delete from detalle where codpe  like ?  and codart like ? ', [codpe,codart+'%'], function(err, rows){
                        if(err) {
                            console.log("error al eliminar datos")
                            throw err;
                        }
                        else{
                            console.log(rows)
                            req.flash('success', 'eliminado producto '+ codart);
                            res.redirect('/detalle/'+codpe);
                        }
                    });
                }
            });
        }
        
    });


});
router.get('/edit/:codpe/:codart', async (req, res) => { //se muestra en el link 
    const { codpe,codart } = req.params;
    var comprados;//lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod
    
    var articulos=[];
        pool.getConnection(function(err, conn){
            conn.query('SELECT * FROM detalle WHERE codpe like ? and codart like ?', [codpe,codart+'%'], function(err, rows){
                
                if(err) console.log(err)
                else{
                    comprados=rows;
                    conn.query("SELECT articulo.* FROM articulo  WHERE est = 1 and NOT EXISTS(SELECT 1 FROM detalle  WHERE detalle.codart=articulo.cod)", function(err, rows){
                        if(err) {
                            throw err;
                        } else {
                            setArts(rows);
                        }
                    });
                }
                
            });
            function setArts(value) {
                articulos = value;
                console.log(comprados[0])
                console.log(articulos)
                res.render('detalles/edit', {comprado: comprados[0],articulos,codpe}); 
                    //lo puse dentro porque asi lo cuenta para tomar los datos
            }
            
        })

    

});

router.post('/edit/:codpe/:codiart', async (req, res) => { //pasan encriptados
    const { codpe,codiart} = req.params;
    const { canti,newcodart } = req.body;
    var cant = parseFloat(canti)
    const codart= (newcodart);
    const newDet = {
        cant, codart,codpe
    };
    console.log("<newPe>");
    console.log(newDet);
    console.log("<newPe>");
    var antCant;
    //2 situaciones, 
    //cambia codigo, actualizar stock del articulo  anteriormente afectado,
    //cambia cantidad, solo actualizar el  
    if(codiart==newcodart){
        console.log("mismo codigo")
        pool.getConnection(function(err, conn){
            conn.query('select * from db_partent.detalle WHERE codpe like ? and codart like ?', [codpe, codiart+'%'], function(err, rows){
                if(err) {
                    throw err;
                } else {
                    
                    setArts(rows);
                }
            });
            function setArts(value) {
                antCant = value[0].cant; //le quito la cantidad agregada erroneamente y le sumo lo agregado ahora
                console.log(antCant)
                conn.query('update db_partent.articulo set stock= stock + ?  WHERE cod like ?', [newDet.cant-antCant,codiarti+'%'], function(err, rows){
                    if(err) {
                        console.log("pasa por aqui")
                        throw err;
                    }
                });
                conn.query('update db_partent.detalle set ?  WHERE codpe like ? and codart like ?', [newDet,codpe, codiart+'%'], function(err, rows){
                    if(err) 
                        throw err;
                    else{
                        req.flash('success', 'detalle guardado');
                        res.redirect('/detalle/'+codpe);        
                    }
                });
            }
    
        })
    }
    
    else{
        console.log("diferente codigo")
        pool.getConnection(function(err, conn){
            conn.query('select * from db_partent.detalle  WHERE codpe  like ? and codart like ?', [codpe, codiart+'%'], function(err, rows){
                if(err) {
                    throw err;
                } else {
                    setArts(rows);
                }
            });
            function setArts(value) {
                console.log(value[0].cant)
                antCant = value[0].cant;
                //quito lo agregado al producto del codart anterior
                conn.query('update db_partent.articulo set stock = stock - ? where cod like ?', [antCant, codiart+'%'], function(err, rows){
                    if(err) {
                        throw err;
                    } 
                });
                //sumo lo que se debia al producto correcto
                conn.query('update db_partent.articulo set  stock = stock + ?  where cod like ?', [newDet.cant-antCant, newcodart+'%'], function(err, rows){
                    if(err) {
                        throw err;
                    }
                });
                conn.query('update db_partent.detalle set ?  WHERE codpe like ? and codart like ?', [newDet,codpe, codiart+'%'], function(err, rows){
                    if(err) 
                        throw err;
                    else{
                        req.flash('success', 'detalle guardado');
                        res.redirect('/detalle/'+codpe);        
                    }
                });
    
            }
    
        })
    
    }  //aqui se cambio el codigo 
   

});

router.get('/:codpe', async (req, res) => {
    const { codpe } = req.params;
    console.log(codpe);
    const articulos = await pool.query('SELECT * FROM db_partent.detalle where codpe = ?', [codpe]);
    console.log(articulos);
    res.render('detalles/list',{articulos,codpe});
});

module.exports = router;
