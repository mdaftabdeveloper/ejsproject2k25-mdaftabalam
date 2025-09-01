const express = require('express');
const StudentController = require('../controllers/StudentController');
const router = express.Router();
const multer = require('multer');

const upload = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 10 * 1014 * 1024 }
});




router.post('/add/student', upload.single('studentImage'), (req, res) => {
    StudentController.addStudent(req, res);
});
router.get('/delete/student/:id', (req, res) => {
    StudentController.deleteStudent(req, res);
});
router.get('/edit/student/page/:id', (req, res) => {
    StudentController.openEditPage(req, res);
});

router.post('/edit/student/:id', (req, res) => {
    StudentController.updateStudent(req, res);
});

module.exports = router;
