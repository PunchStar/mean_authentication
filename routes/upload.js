var multer = require('multer');
var fs = require('fs');

const storage = multer.diskStorage({

  destination: (req, file, cb) => 
  {
    const DIR = './public/uploads/' + req.userId;
    if (!fs.existsSync(DIR)){
        fs.mkdirSync(DIR);
    }
    // var token = req.headers.authorization;
    // console.log('yyyyyyyyyyyy + ' + req.userId);
    //   console.log('yyyyyyyyyyyy + ' + token);
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, fileName)
  }
});
// Multer Mime Type Validation
var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
  }
});
module.exports = upload;