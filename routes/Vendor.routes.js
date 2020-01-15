var vendor = require("../controllers/Vendor.Controller");
var VerifyToken = require('./middleware.js');
var upload = require('./upload.js');
module.exports = (app) => {
    app.post("/vendor/register", vendor.create);
    app.post("/vendor/login", vendor.login);
    app.put("/auth/vendor/:id",VerifyToken,vendor.update);
    app.delete("/auth/vendor/:id",VerifyToken,vendor.delete);
    app.get("/auth/vendor/:id",VerifyToken,vendor.findById);
    app.post("/upload-img", upload.single('file'), vendor.uploadImg)
    app.post("/upload-imgs",[VerifyToken, upload.array('files')], vendor.uploadImgs)
};
