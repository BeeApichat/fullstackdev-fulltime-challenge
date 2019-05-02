var MongoClient = require('mongodb').MongoClient;
var url = process.env.MONGODB_URL || "mongodb://localhost:27017/";
exports.insert_userdata = function () {
    return function (req, res, next) {
        const { number, number_locker, time, size, fullname } = req.body
        MongoClient.connect(url, function (err, db) {
            if (err) throw err;
            var dbo = db.db("Coinlocker");
            var myobj = { size: size, number_locker: number_locker, number: number, time: time, fullname };
            dbo.collection("user_informationTB").insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log("บันทึกข้อมูลสำเร็จ");
                db.close();
                next()
            });
        });

    }
}