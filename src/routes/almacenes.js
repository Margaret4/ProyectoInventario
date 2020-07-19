const express = require('express');
const router = express.Router();
const pool=require('../database'); 
const helpers=require('../lib/handlebars'); 
router.get('/add',(req,res)=>{
    
    res.render('almacenes/add',{almacenes});
    

});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,codigo,dir}= req.body;
    cod = (codigo)
    const newAlm = {
        cod,name,dir
        
    };
    console.log(newAlm);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.almacen set  ?',[newAlm]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/almacenes');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:cod/:borrar',async(req,res)=>{
    const {cod,borrar} =req.params ;
    if(borrar=="1"){
        await pool.query('delete from db_partent.almacen WHERE cod =?',[parseInt(cod)]);        

        res.redirect('/almacenes');
    }
    await pool.query('update db_partent.almacen SET est=not est WHERE cod =?',[cod]);
    req.flash('success','almacen cambio de estado');

    res.redirect('/almacenes');
});
router.get('/edit/:cod',async(req,res)=>{ //se muestra en el link 
    const {cod} =req.params ;
    var almacenes = await pool.query('SELECT * FROM almacen WHERE cod=?',[cod]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    
    res.render('almacenes/edit',{almacen:almacenes[0]}); 
    console.log(almacen)

});
router.post('/edit/:cod',async(req,res)=>{ //pasan encriptados
    const {name,codigo,dir}= req.body;
    const antCod =req.params.cod ; //el anterior codigo, con el que va a saber que modificar
    cod = (codigo);
    const newAlm = {
        cod,name,dir
    };
    console.log("<newAlm>");
    console.log(newAlm);
    console.log("<newAlm>");
    await pool.query('update almacen set ? where cod = ?',[newAlm,antCod]);
    
    req.flash('success','almacen guardado');
    res.redirect('/almacenes');

});

router.get('/',async(req,res)=>{ 
    //const {cod} =req.params ;
    var almacenes = await pool.query('SELECT * FROM db_partent.almacen'); 
    almacenes=helpers.activo_in(almacenes)
    console.log(almacenes);
    res.render('almacenes/list',{almacenes}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :cod porque de por si uso edit.hbs y no necesita el cod que recbe en la info del link\ 

});
router.get('/:bit',async(req,res)=>{ 
    const {bit} =req.params;
    const estado = (bit==1)? "Activos": "Inactivos";
    var almacenes = await pool.query('SELECT * FROM db_partent.articulo where est=?',[parseInt(bit)]); 
        almacenes=helpers.activo_in(almacenes)
        console.log(almacenes);

    res.render('almacenes/list',{almacenes,estado}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
});


module.exports = router;
