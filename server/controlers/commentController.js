
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
                    let users = await UserModel.userGet();
                    res.json({
                        success: true,
                        data: result,
                        users: users
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

exports.commentAdd = (req, res) => {
    const params = {
      username: String(req.jwt.user),
      id_film: String(req.body.id_film) || "",
      hash_film: String(req.body.hash_film) || "",
      comment: String(req.body.comment) || "",
      date: new Date()
    }
    if (params.id_film.length < 1 || params.hash_film.length < 1 || params.comment.length < 1 || params.comment.length > 150){
        res.json({
            success: false,
            data: {}
        }); 
    }
    else {
        try {
            CommentModel.commentAdd(params);
            res.json({
                success: true,
                data: params
            }); 
        } catch (error) {
            res.json({
                success: false,
                data: {}
            }); 
        }
    }
  };
