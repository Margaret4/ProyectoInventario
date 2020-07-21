const express = require('express');
const router = express.Router();
const pool=require('../database'); 
const helpers=require('../lib/handlebars'); 

router.get('/add',(req,res)=>{
    res.render('articulos/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    
    const {name,codigo,uni,sto}= req.body;
    var cod = (codigo)
    var stock= 0;//parseFloat(stock);

    const newArt = {
        cod,name,uni,stock
        
    };
    console.log(newArt);  
    await pool.query('INSERT INTO db_partent.articulo set  ?',[newArt]); 

    req.flash('success','articulo guardado ');
    res.redirect('/articulos');
    
});

router.get('/delete/:cod/:bit',async(req,res)=>{
    const {cod,bit} =req.params ;
    console.log(req.params )
    pool.getConnection(function(err, conn){
        if(bit==1)
            conn.query('delete from db_partent.articulo WHERE cod like ?',[cod],  function (err, rows){
                if(err) throw err;
                else{
                    req.flash('success','articulo eliminado ');
                    res.redirect('/articulos');
                }
            })

        else 
            pool.query('update db_partent.articulo SET est = (not est) WHERE cod like ?',[cod], function(err, rows){
                if(err) throw err;
                else{
                    req.flash('success','articulo cambio de estado ');
                    res.redirect('/articulos');
                }
            })
            
    });
    
});

router.get('/edit/:codi',async(req,res)=>{ //se muestra en el link 
    const {codi} =req.params ;
    //console.log(cod)
    var articulos = await pool.query('SELECT * FROM articulo where cod like ?',[ codi+'%']);
    //error curioso, en si el cod es varchar pero si le envio cadena no lo acepta pero si acepta int
     //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    console.log(articulos)
    res.render('articulos/edit',{articulo:articulos[0]}); 

});
router.post('/edit/:codi',async(req,res)=>{ //pasan encriptados
    const {name,codigo,uni,sto}= req.body;
    var antCod = req.params.cod; //req.params es como sacarlo del link
    var cod = codigo; //le cambio el nombre porque tiene que tener el nombre de la base de datos
    var stock= 0;//parseFloat(stock);
    const newArt = {
        cod,name, stock,uni
    };
    console.log("<newArt>");
    console.log(newArt);
    console.log("<newArt>");
    await pool.query('update articulo set ? where cod like ?',[newArt,antCod+'%']);
    
    req.flash('success','articulo guardado');
    res.redirect('/articulos');

});

router.get('/',async(req,res)=>{ 
    
    var articulos = await pool.query('SELECT * FROM db_partent.articulo'); 
    articulos=helpers.activo_in(articulos)
    res.render('articulos/list',{articulos}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   

});
router.get('/:bit',async(req,res)=>{ 
    const {bit} =req.params ;
    const estado = (bit==1)? "Activos": "Inactivos";
    var articulos = await pool.query('SELECT * FROM db_partent.articulo where est=?',[parseInt(bit)]); 
    articulos=helpers.activo_in(articulos)

    res.render('articulos/list',{articulos,estado}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
});


module.exports = router;
