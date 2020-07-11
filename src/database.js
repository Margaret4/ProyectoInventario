const mysql = require('mysql');
const {promisify}=require('util');
const {database} =require('./keys');
//para que guarde en const database solo la propiedad(atributo :v del modulo database)
const pool= mysql.createPool(database); //esto ayuda para que haya hilos//nos va generar una conexion

pool.getConnection((err,connection)=>{
    if(err){
        if (err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code ==="ER_COUNT_ERROR"){
            console.error('DATABASEHAS TO MANY CONECTION');
        }
        if(err.code ==="ECONNREFUSED"){
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }
    if(connection) connection.release();
    console.log('DB is connected');
    return; 

});

//estamos volviendo promesas lo que antes eran callback
pool.query=promisify(pool.query);

module.exports=pool;
