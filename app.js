const { error } = require('console');
const express = require('express');
const mysql = require('mysql');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

const conexionDB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'carros'
})

app.get('/', (req,res)=>{
    res.send("Bienvenido a la venta de autos")
});

app.get('/vehiculos', (req,res)=>{
    const sql = 'SELECT * FROM carros'

    conexionDB.query(sql,(error,result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Sin datos')
        }
    })
});

app.get('/vehiculos/:id', (req,res)=>{
    const id = req.params.id
    const sql = `SELECT * FROM carros WHERE idcarros = ${id}`

    conexionDB.query(sql, (error,result)=>{
        if(error) throw error;
        if(result.length > 0){
            res.json(result)
        }else{
            res.send('Sin datos')
        }
    })
});

app.post('/agregar-vehiculo', (req,res)=>{
    const sql = 'INSERT INTO carros SET ?'
    const agregar = {
        idcarros : req.body.idcarros,
        nombre : req.body.nombre,
        year : req.body.year,
        valor : req.body.valor,
        cantidad : req.body.cantidad
    }

    conexionDB.query(sql,agregar,error =>{
        if(error) throw error;
        res.send('Carro agregado con exito!')
    })
});

app.put('/actualizar-vehiculo/:id', (req,res)=>{
    const id = req.params.id
    const {nombre,year,valor,cantidad} = req.body
    const sql = `UPDATE carros SET nombre = '${nombre}', year = '${year}', valor = '${valor}', cantidad = '${cantidad}' WHERE idcarros = ${id} `

    conexionDB.query(sql,error =>{
        if(error) throw error;
    })
    res.send('Carro actualizado con exito!')
})

app.listen(3001, ()=>{
    console.log('Servidor corriendo en puerto 3001')
})