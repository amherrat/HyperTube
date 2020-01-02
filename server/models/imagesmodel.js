var jimp = require('jimp');
const uuidv1 = require('uuid/v1');
const destination = __dirname + "/../uploads/";
const User = require("../models/userModel.js");

exports.createImage = function (Image, user) {
    return new Promise((resolve, reject) => {
        var img = String(Image).split(/data:image\/(?:png|jpeg|bmp|jpg);base64,/);
        const base64str = String(img[1]);
        var image_name = uuidv1() + ".jpeg";
        var image_path = destination + image_name;
        var img_url = "http://" + "0.0.0.0" + ":3000/uploads/" + image_name;
        const buf = Buffer.from(base64str, 'base64');
        jimp.read(buf, (err, image) => {
            if (err) reject('Invalid image');
            else {
              console.log(image_path);
                image.write(image_path);
                User.findOneAndUpdate(
                    { login: user},
                    { profil: img_url },
                    { useFindAndModify: false }
                  )
                    .exec()
                    .then(userRes => {
                      if(userRes)
                      {
                        resolve(img_url);
                      }else
                        reject('Invalid image');
                    });
            }
        })
    })
};
