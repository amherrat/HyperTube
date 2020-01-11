
var CommentModel = require('../models/commentModel');
var UserModel = require('../models/userModel');

exports.commentGet = (req, res) => {
    const params = {
      id_film: String(req.params.id_film) || "",
      hash_film: String(req.params.hash_film) || ""
    }
    if (params.id_film.length < 1 || params.hash_film.length < 1){
        res.json({
            success: false,
            data: {}
        }); 
    }
    else {
        try {
            CommentModel
                .commentGet(params)
                .then(async result => {
                    res.json({
                        success: true,
                        data: result
                    }); 
                })
                .catch(err => {
                    console.log(err);
                });
            
        } catch (error) {
            res.json({
                success: false,
                data: {}
            }); 
        }
    }
};

exports.commentCount = async (req, res) => {
    const params = {
      login:  req.params.username || ""
    }
    console.log("----->", params);
    if (params.login.length < 1){
        res.json({
            success: false,
            nb: 0
        }); 
    }
    else {
        try {
            let user = await  UserModel.getUser(params.login);
            CommentModel
                .commentNB(user)
                .then(result => {
                    res.json({
                        success: true,
                        nb: result.length || 0
                    }); 
                })
                .catch(err => {
                });
            
        } catch (error) {
            res.json({
                success: false,
                nb: 0
            }); 
        }
    }
};

exports.commentAdd = (req, res) => {
    const params = {
    //   user_id: String(req.jwt.userid),
      id_film: String(req.body.id_film) || "",
      hash_film: String(req.body.hash_film) || "",
      comment: String(req.body.comment) || "",
      user: req.body._id || 0,
      date: new Date()
    }
    if (params.id_film.length < 1 || params.hash_film.length < 1 || params.comment.length < 1 || params.comment.length > 150){
        res.status(400).json({
            success: false,
            data: {}
        }); 
    }
    else {
        try {
            CommentModel.commentAdd(params);
            res.status(200).json({
                success: true,
                data: params
            }); 
        } catch (error) {
            res.status(400).json({
                success: false,
                data: {}
            }); 
        }
    }
  };
