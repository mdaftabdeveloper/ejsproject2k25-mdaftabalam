
const Student = require('../models/Student');
const cloudinary = require('cloudinary').v2;

async function addStudent(req, res) {
    try {
        let student = new Student(req.body);
        if (req.file) {
            cloudinary.config({
                cloud_name: 'dac8pt5nt',
                api_key: '349677196223795',
                api_secret: 'oN8ety2kHNg6kUJvXRKeuypyTcM'
            });
            const result = await cloudinary.uploader.upload(req.file.path);

            student.studentImage = result.secure_url;
        }

        await student.save();
        // console.log("Student Saved Successfullyy..");
        let students = await Student.find({});
        res.render('studentlist', {
            students: students
        });
    } catch (error) {
        console.log(error);
    }
}

async function deleteStudent(req, res) {
    try {
        let student = await Student.findOne({ _id: req.params.id });
        // console.log(req.params.id);
        // console.log(student);
        if (student) {
            await Student.deleteOne({ _id: req.params.id });
            let students = await Student.find({});
            res.render('welcomeadmin', { students: students });
        } else {
            res.status(404).end("Student not found..");
        }
    } catch (error) {
        console.log(error);
    }
}

async function openEditPage(req, res) {
    try {
        let studentId = req.params.id;
        // console.log(studentId);
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            res.render('studenteditpage', {
                student: student
            });
        } else {
            res.render('/');
        }
    } catch (error) {
        console.log(error);
    }
}

async function updateStudent(req, res) {
    try {
        const studentId = req.params.id;
        // console.log(studentId);
        let student = await Student.findOne({ _id: studentId });
        if (student) {
            // console.log(req.body);
            student.rollNo = req.body.rollNo;
            student.studentName = req.body.studentName;
            student.fatherName = req.body.fatherName;
            student.course = req.body.course;
            student.branch = req.body.branch;
            student.yearOfAdmission = req.body.yearOfAdmission;

            await student.save();

            let students = await Student.find({});
            res.render('welcomeadmin', { students: students });
        } else {
            res.status(404).end("Student not foundd..");
        }
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addStudent,
    deleteStudent,
    updateStudent,
    openEditPage
}