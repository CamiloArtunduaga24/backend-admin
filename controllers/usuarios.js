const Usuario = require('../models/usuario');
const {
    response
} = require('express');

const bcrypt = require('bcryptjs');
const {
    generarJwt
} = require('../helpers/jwt');


const getUsuarios = async (req, res) => {


    const usuarios = await Usuario.find({}, 'name email role google');

    res.json({
        ok: true,
        usuarios
    });

}

const crearUsuarios = async (req, res = response) => {

    const {
        email,
        password
    } = req.body;


    try {

        const existeEmail = await Usuario.findOne({
            email
        });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            })
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);


        //Guardar usuario
        await usuario.save();

        //generar token JWT

        const token = await generarJwt(usuario.id);

        res.json({
            ok: true,
            token
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado, revisar logs'
        })
    }

}

const actualizarUsuario = async (req, res = response) => {

    //TODO: VALIDAR TOKEN Y VALIDAR SI ES EL USUARIO CORRECTO
    const uid = req.params.id;


    try {


        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario por id'
            });
        }

        //ACTUALIZACIONES
        const {
            password,
            google,
            email,
            ...campos
        } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({
                email
            });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'ya existe usuario con ese email',
                })
            }
        }

        camppos.email = email;


        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
            new: true
        });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario por id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el Admin'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario
}