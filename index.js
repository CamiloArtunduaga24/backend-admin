require('dotenv').config();
const express = require('express');
const {
    dbConnection
} = require('./database/config');
const cors = require('cors');

//Crear el servidor express
const app = express();

//Configurar cors
app.use(cors());


//Base de datos

dbConnection();


//Rutas
app.get('/', (req, res) => {

    res.status(200).json({
        ok: true,
        mgs: 'Hola mundo'
    })

});

//password => L08MVURky5g9HzIO
//User => mean_user


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo ' + process.env.PORT);
})