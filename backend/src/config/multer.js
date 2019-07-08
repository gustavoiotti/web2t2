const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");

var VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/ogg', 'video/ogv'];


const storageTypes = {
  local: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        file.key = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, file.key);
      });
    }
  }),
  /*s3: multerS3({
    s3: new aws.S3(),
    bucket: process.env.BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err);

        const fileName = `${hash.toString("hex")}-${file.originalname}`;

        cb(null, fileName);
      });
    }
  })*/
};

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  //storage: storageTypes[process.env.STORAGE_TYPE],
  limits: {
    fileSize: 200 * 1024 * 1024
    //fileSize: 100000000000000000000
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "video/jpeg",
      "video/pjpeg",
      "video/png",
      "video/gif",
      "video/mp4"
      
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type."));
    }
  }
};

/*exports.uploadVideo = function(req, res) {
  var src;
  var dest;
  var targetPath;

  console.log(req);

  var tempPath = req.file.path;
  var type = mime.lookup(req.file.mimetype);

  if (VIDEO_TYPES.indexOf(type) == -1) {
      return res.status(415).send('Supported video formats: mp4, webm, ogg, ogv');
  }

  targetPath = './public/videos/' + req.file.originalname;
  
  src = fs.createReadStream(tempPath);
  dest = fs.createWriteStream(targetPath);
  src.pipe(dest);

  src.on('error', function(error) {
      if (error) {
          return res.status(500).send({
              message: error
          });
      }
  });

  src.on('end', function() {
      var video = new Videos(req.body);
      video.videoName = req.file.originalname;
      video.user = req.user;

      video.save(function(error) {
          if (error) {
              return res.status(400).send({
                  message: error
              });
          }
      });

      fs.unlink(tempPath, function(err) {
          if (err) {
              return res.status(500).send({
                  message: error
              });
          }

          res.redirect('videos');

      });
  });
};
*/