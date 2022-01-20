const {
    Router
} = require('express');
const {
    check
} = require('express-validator');

const router = Router();

const {
    login
} = require('../controllers/auth');
const {
    validarCampo
} = require('../middlewares/validar-campos');

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El pasword es obligatorio').not().isEmpty(),
        validarCampo
    ],
    login
)


module.exports = router