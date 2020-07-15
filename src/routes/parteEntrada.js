const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add', (req, res) => {
    res.render('parteEntrada/add', );

});

//render == incrusta
router.post('/add', async (req, res) => {
    console.log('aaah >:v');
    const { name, codigo, uni, canti } = req.body;
    cod = parseInt(codigo)
    var cant = parseInt(canti)
    const newPe = {
        cod, name, uni, cant

    };

    console.log(newPe);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.partent set  ?', [newPe]); //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success', 'link saved successfully ');
    res.redirect('/parteEntrada');// "el redirect funciona como un return no se lee lo que le sigue" by coren

});

router.get('/delete/:cod', async (req, res) => {
    const { cod } = req.params;
    await pool.query('DELETE FROM db_partent.partent WHERE cod =?', [cod]);
    req.flash('success', 'link deleted successfully ');
    res.redirect('/parteEntrada');


});
router.get('/edit/:cod', async (req, res) => { //se muestra en el link 
    const { cod } = req.params;
    const partents = await pool.query('SELECT * FROM partent WHERE cod=?', [cod]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    res.render('parteEntrada/edit', { partent: partents[0] });
    console.log(partents)

});
router.post('/edit/:cod', async (req, res) => { //pasan encriptados
    const { name, codpro, codalm, uni } = req.body;
    //const {cod} =req.params ;
    /*console.log("<req.body>");
    console.log(req.body);
    console.log("<req.body>");
    console.log("<req.params>");
    console.log(req.params);
    console.log("</req.params>");*/
    cod = parseInt(codigo);
    
    var cant = parseInt(codigo);
    const newPe = {
        cod, name, cant, uni,codpro,codalm
    };
    console.log("<newPe>");
    console.log(newPe);
    console.log("<newPe>");
    await pool.query('update partent set ? where cod = ?', [newPe, cod]);

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
