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

//Lectura y parseo body
app.use(express.json());


//Base de datos
dbConnection();


//Rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));





//password => L08MVURky5g9HzIO
//User => mean_user


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo ' + process.env.PORT);
})