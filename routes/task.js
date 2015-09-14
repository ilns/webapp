var Task = require('../models/task').Task;
var HttpError = require('error').HttpError;
var AuthError = require('../models/task').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('task');
};

exports.post = function(req, res, next) {
   var taskScript = req.body.taskScript;

    Task.addTaskToDb(taskScript,function(err, task) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }
        req.session.task = task._id;
        res.send({});
        });

   //var task = new Task({taskScript: taskScript});
   // task.save(function(err){
   //     if(err) return next(err);
   // });
};