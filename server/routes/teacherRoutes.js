const express = require("express");
const router = express.Router();

const {
    createTeacher,
    getAllTeachers,
    getById,
    deleteTeacher,
    updateTeacher,
} = require("../controllers/teachercontroller");

router.route('/newteacher').post(createTeacher); // POST: Create a new teacher
router.route('/all').get(getAllTeachers); // GET: Retrieve all teachers
router.route('/:id').get(getById);
router.route('/edit/:id').put(updateTeacher);
router.route('/delete/:id').delete(deleteTeacher); // DELETE: Delete a teacher by ID

module.exports = router;
