const express = require('express');
const router = express.Router();
const pool=require('../database'); 

router.get('/add/:codpe', (req, res) => {
    const {codpe}=req.params;

    res.render('detalles/add', {codpe});

});

//render == incrusta
router.post('/add/:codpe', async (req, res) => {
    const {codpe} = req.params;
    const { codarti, canti } = req.body;
    var codart = parseInt(codarti)
    var cant = parseInt(canti)
    const newArt = {
        codart,codpe,cant

    };
    console.log(newArt);  //aaaqui >:v7

    await pool.query('INSERT INTO db_partent.detalle set  ?', [newArt]); 
    //es como decirle que se espere a que responda pra continuar

    //ya que public esta declarada en index como global no necesito mencionar toda su ruta
    req.flash('success', 'Guardado');
    res.redirect('/detalle/'+codpe);// "el redirect funciona como un return no se lee lo que le sigue" by coren

});

router.get('/delete/:codpe/:codart', async (req, res) => {
    const { codpe,codart } = req.params;
    await pool.query('DELETE FROM db_partent.detalle WHERE codpe =? and codart=?', [codpe, codart]);

    req.flash('success', 'eliminado producto ',codart);
    
    res.redirect('/detalle/'+codpe);

});
router.get('/edit/:codpe/:codart', async (req, res) => { //se muestra en el link 
    const { codpe,codart } = req.params;
    const articulos = await pool.query('SELECT * FROM detalle WHERE codpe=? and codart=?', [codpe,codart]); //lo va a devolver en un arreglo de uno porque pos solo hay uno con un cod 
    console.log(articulos)
    res.render('detalles/edit', { articulo: articulos[0] });
    

});

router.post('/edit/:codpe/:codart', async (req, res) => { //pasan encriptados
    const { codpe} = req.params;
    const { canti,newcodart } = req.body;
    var cant = parseInt(canti)
    const codart= parseInt(newcodart);
    const newDet = {
        cant, codart
    };
    console.log("<newPe>");
    console.log(newDet);
    console.log("<newPe>");
    await pool.query('update detalle set ? where codpe= ? and codart= ?', [newDet, codpe,parseInt(codart)]);

    req.flash('success', 'parte entrada guardado');
    
    res.redirect('/detalles/{{codpe}}');

});

router.get('/:codpe', async (req, res) => {
    const { codpe } = req.params;
    console.log(codpe);
    const articulos = await pool.query('SELECT * FROM db_partent.detalle where codpe= ?', [codpe]);
    console.log(articulos);
    res.render('detalles/list',{articulos,codpe});
});

module.exports = router;
