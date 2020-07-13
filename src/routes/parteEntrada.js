const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add',(req,res)=>{
    const parts =  pool.query('SELECT * FROM db_partent.partent'); 
    console.log(parts);

    res.render('parteEntrada/add',{parts});
    
});
//render == incrusta
router.post('/add',async(req,res)=>{
    console.log('aaah >:v');
    const {name,codigo,uni,canti}= req.body;
    var cod = parseInt(codigo)
    var cant = parseInt(canti)
    const newPe = {
        cod,name,uni,cant
        
    };

    console.log(newPe);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.partent set  ?',[newPe]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success','link saved successfully ');
    res.redirect('/parteEntrada');// "el redirect funciona como un return no se lee lo que le sigue" by coren
    
});

router.get('/delete/:id',async(req,res)=>{
    const {id} =req.params ;
    await pool.query('DELETE FROM db_partent.partent WHERE ID =?',[id]);
    req.flash('success','link deleted successfully ');
    res.redirect('/parteEntrada');


});
router.get('/edit/:id',async(req,res)=>{ //se muestra en el link 
    const {id} =req.params ;
    const partent = await pool.query('SELECT * FROM partent WHERE id=?',[id]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un id 
    
    res.render('partent/edit',{articulo:partent[0]}); 
    console.log(articulo)

});
router.post('/edit/:id',async(req,res)=>{ //pasan encriptados
    const {name,codigo,canti,uni}= req.body;
    const {id} =req.params ;
    /*console.log("<req.body>");
    console.log(req.body);
    console.log("<req.body>");
    console.log("<req.params>");
    console.log(req.params);
    console.log("</req.params>");*/
    var cod = parseInt(codigo);
    var cant = parseInt(codigo);
    const newPe = {
        cod,name, cant,uni
    };
    console.log("<newPe>");
    console.log(newPe);
    console.log("<newPe>");
    await pool.query('update partent set ? where id = ?',[newPe,id]);
    
    req.flash('success','parte entrada guardado');
    res.redirect('/parteEntrada');

});

router.get('/',async(req,res)=>{ 
    //const {id} =req.params ;
    const parts = await pool.query('SELECT * FROM db_partent.partent'); 
    console.log(parts);
    res.render('parteEntrada/list',{parts}); //como va a devolver arreglo para que no explote, le especifico que solo devuelva el primer elemento
   //nota: no pongo :id porque de por si uso edit.hbs y no necesita el id que recbe en la info del link\ 

});
module.exports = router;
