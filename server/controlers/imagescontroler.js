const Images = require("../models/imagesmodel.js");

function is_valid_image(image) {
  const errors = {};
  if (image) {
    var split = String(image["image"]).split(
      /data:image\/(?:png|jpeg|bmp|jpg);base64,/
    );
    if (split[1])
      if (
        !String(split[1]).match(
          /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
        )
      )
        errors.msg = ["Image invalide"];
  } else errors.error = ["Data wrong format"];
  return errors;
}

exports.create_a_image = async (req, res) => {
  var image = req.body.img;
  console.log(image, req.jwt.user);
  var user = req.jwt.user;
  let errors = is_valid_image(image);
  if (Object.keys(errors).length != 0) return res.status(200).json(errors);
  try {
    Images.createImage(image, user).then(
      info => {
        return res.status(201).json({
          success: true,
          data: info
        });
      },
      err => {
        return res.status(200).json({
          success: false,
          message: err
        });
      }
    );
  } catch (err) {
    console.log(err);
  }
};
