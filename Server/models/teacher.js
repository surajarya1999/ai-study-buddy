const mongoose = require('mongoose');
const teacherSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    }
},{timestamps:true});

const TeacherModel = mongoose.model('Teacher', teacherSchema);
module.exports = TeacherModel;