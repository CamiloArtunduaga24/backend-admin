const bcrypt = require('bcryptjs');
const {
    response
} = require('express');
const {
    generarJwt
} = require('../helpers/jwt');
const Usuario = require('../models/usuario');


const login = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({
            email
        });


        //verificar email
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email no válido'
            });
        }

        //verificar contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'contraseña invalida'
            })
        }


        //generar token JWT

        const token = await generarJwt(usuarioDB.id);





        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'ocurrio un error'
        })
    }

}

module.exports = {
    login
}