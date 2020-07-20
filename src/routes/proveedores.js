const express = require('express');
const router = express.Router();
const pool=require('../database'); 
const helpers=require('../lib/handlebars'); 

router.get('/add',(req,res)=>{
    res.render('proveedores/add');
});
//render == incrusta
router.post('/add',async(req,res)=>{
    const {name,codigo}= req.body;
    cod = (codigo)
    const newProv = {
        cod,name
        
    };
    console.log(newProv);  

    await pool.query('INSERT INTO db_partent.proveedor set  ?',[newProv]); 

    req.flash('success',"proveedor guardado");
    res.redirect('/proveedores');
    
});

router.get('/delete/:cod/:borrar',async(req,res)=>{
    const {cod,borrar} =req.params ;
    if(borrar=="1"){
        await pool.query('delete from db_partent.proveedor WHERE cod like ?',[cod+'%']);        

        res.redirect('/proveedores');
    }
    await pool.query('update db_partent.proveedor SET est=not est WHERE cod like ?',[cod+'%']);
    req.flash('success','proveedor cambio de estado');

    res.redirect('/proveedores');
});

router.get('/edit/:codi',async(req,res)=>{ //se muestra en el link 
    const {codi} =req.params ;
    var proveedores = await pool.query('SELECT * FROM proveedor WHERE cod like ?',[codi+'%']); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    console.log(proveedores)
    res.render('proveedores/edit',{proveedor:proveedores[0]}); 
    

});
router.post('/edit/:codi',async(req,res)=>{ //pasan encriptados
    const {name,codigo}= req.body; //codigo es el codigo que recibe en el form
    const {codi} =req.params ;
    cod = (codigo);
    const newProv = {
        cod,name
    };
    console.log("<newProv>");
    console.log(newProv);
    console.log("<newProv>");
    await pool.query('update proveedor set ? where cod like ?',[newProv,codi]);
    
    req.flash('success','proveedor guardado');
    res.redirect('/proveedores');

});

router.get('/',async(req,res)=>{ 
    //const {cod} =req.params ;
    var proveedores = await pool.query('SELECT * from db_partent.proveedor'); 
    proveedores=helpers.activo_in(proveedores)
    res.render('proveedores/list',{proveedores}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :cod porque de por si uso edit.hbs y no necesita el cod que recbe en la info del link\ 

});
router.get('/:bit',async(req,res)=>{ 
    const {bit} =req.params ;
    const estado = (bit==1)? "Activos": "Inactivos";
    var proveedores = await pool.query('SELECT * FROM db_partent.proveedor where est=?',[parseInt(bit)]);
    proveedores=helpers.activo_in(proveedores)
    res.render('proveedores/list',{proveedores,estado}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
});


module.exports = router;
