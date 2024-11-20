const mongoose = require("mongoose");
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    level: { type: String, required: true },
    teacherclass: { type: String, required: true },
    subject: { type: [String], required: true }, // Array of subjects
});

const Teacher=mongoose.model('TEACHER',teacherSchema);

module.exports=Teacher;
