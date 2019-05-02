var bcrypt = require('bcrypt-nodejs');
var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL || "mongodb://localhost:27017/";
exports.login = function () {
    return function (req, res, next) {
        const { username, password } = req.body
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Coinlocker");
            dbo.collection("userTB").findOne({ username: username }, function (err, result) {
                bcrypt.compare(password, result.password, function (err, res) {
                    if (res === true) {
                        console.log("รหัสผ่านถูกต้อง");
                        req.message = "เข้าสู่ระบบสำเร็จ"
                        req.result = result
                        req.success = true
                        db.close();
                        next()
                    } else {
                        console.log("รหัสผ่านไม่ถูกต้อง");
                        req.message = "เข้าสู่ระบบไม่สำเร็จ"
                        req.success = false
                        db.close();
                        next()
                    }

                });
            });
        });
    }
}