
const express = require('express')
const router = express.Router()
const Util = require('../Controller/user/user_controller')


router.post('/user_insert',
    Util.insert_userdata(),
    function (req, res) {
        res.status(200).json({
            'success': true,
            message: "บันทึกข้อมูลสำเร็จ",
        })
    }
)

module.exports = router;