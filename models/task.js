var async = require('async');
var util = require('util');
var mongoose = require('../libs/mongoose'),

    Schema = mongoose.Schema;

var schema = new Schema({
    taskScript: {
        type: String,
        unique: false,
        required: true
    }
});

schema.methods.checkString = function(taskScript) {
    if(taskScript.length() === 0){
        return false
    } else return true
};

schema.statics.addTaskToDb = function(taskScript, callback) {
    var Task = this;

    async.waterfall([
        function(callback) {
            Task.findOne({taskScript: taskScript}, callback);
        },
        function(task, callback) {
            if (task) {
                if (task.checkString(taskScript)) {
                    callback(null, task);
                } else {
                    callback(new AuthError("empty string"));
                }
            } else {
                var task = new Task({taskScript: taskScript});
                task.save(function(err) {
                    if (err) return callback(err);
                    callback(null, task);
                });
            }
        }
    ], callback);
};

//schema.static.addToDb = function(taskScript) {
//    var Task = this;
//    var task = new Task ({taskScript: taskScript});
//    task.save(function(err) {
//        if (err) return callback(err);
//};
exports.Task = mongoose.model('Task', schema);

function AuthError(message) {
    Error.apply(this, arguments);
    Error.captureStackTrace(this, AuthError);

    this.message = message;
}


util.inherits(AuthError, Error);

AuthError.prototype.name = 'AuthError';

exports.AuthError = AuthError;
