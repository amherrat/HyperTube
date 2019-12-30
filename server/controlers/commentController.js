
var CommentModel = require('../models/commentModel');

exports.commentGet = (req, res) => {
    const params = {
      id_film: req.params.id_film || "",
      hash_film: req.params.hash_film || ""
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
                .then(result => {
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

exports.commentAdd = (req, res) => {
    const params = {
      username: req.jwt.user,
      id_film: req.body.id_film || "",
      hash_film: req.body.hash_film || "",
      comment: req.body.comment || "",
      date: new Date()
    }
    if (params.id_film.length < 1 || params.hash_film.length < 1 || params.comment.length < 1){
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
