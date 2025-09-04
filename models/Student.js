const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamps');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    rollNo: { type: String, required: true, unique: true },
    studentName: { type: String, required: true },
    motherName: { type: String, required: true },
    fatherName: { type: String },
    course: { type: String, required: true },
    branch: { type: String },
    yearOfAdmission: { type: String, required: true },
    studentImage: { type: String },
    createdAt: Date,
    updatedAt: Date
});
studentSchema.plugin(timestamps, { index: true });
module.exports = mongoose.model('Student', studentSchema);