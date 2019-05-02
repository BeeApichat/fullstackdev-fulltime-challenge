
const express = require('express')
const router = express.Router()
const Util = require('../Controller/login/login_controller')


router.post('/user_login',
    Util.login(),
    function (req, res) {
        res.status(200).json({
            'success': req.success,
            message: req.message,
            result: req.result,

        })
    }
)

module.exports = router;