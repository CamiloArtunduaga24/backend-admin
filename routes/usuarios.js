const {
    Router
} = require('express');

const router = Router();
const {
    getUsuarios,
    crearUsuarios,
    actualizarUsuario,
    borrarUsuario,
} = require('../controllers/usuarios');
const {
    check
} = require('express-validator');
const {
    validarCampo
} = require('../middlewares/validar-campos');
const {
    valdarJwt
} = require('../middlewares/validar-jwt');

router.get('/', valdarJwt, getUsuarios);

router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        validarCampo

    ], crearUsuarios);

router.put('/:id',
    [
        valdarJwt,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('role', 'El Role es obligatorio').not().isEmpty(),
        validarCampo

    ], actualizarUsuario);

router.delete('/:id', valdarJwt, borrarUsuario);



module.exports = router;