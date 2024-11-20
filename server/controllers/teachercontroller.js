const Teacher = require("../model/teacherSchema");
const bcrypt = require('bcryptjs');

/*  
status:
200: user found , returns the data of the current user,
400: for bad request , if email or password is missing,
401: unauthorized: if the email and paswword does not match

*/

// Create a new teacher
const createTeacher = async (req, res) => {
    try {
        const { name, type, level, teacherclass, subject } = req.body;

        // Validate required fields
        if (!name || !type || !level || !teacherclass || !subject) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new teacher document
        const newTeacher = new Teacher({ name, type, level, teacherclass, subject });
        await newTeacher.save();

        res.status(201).json({ message: 'Teacher created successfully', teacher: newTeacher });
    } catch (error) {
        console.error('Error creating teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find(); // Fetch all teacher documents
        res.status(200).json(teachers);
    } catch (error) {
        console.error('Error fetching teachers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getById=async(req,res)=>{
    try {
        const teacher = await Teacher.findById(req.params.id); // Assuming Mongoose is used
        if (teacher) {
          res.status(200).json(teacher);
        } else {
          res.status(404).json({ message: "Teacher not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
const updateTeacher=async(req,res)=>{
    try {
        const { id } = req.params;
        const updatedData = req.body; // Assuming the updated data comes in the request body
    
        const updatedTeacher = await Teacher.findByIdAndUpdate(id, updatedData, {
          new: true, // Return the updated document
          runValidators: true, // Ensure validation is applied
        });
    
        if (updatedTeacher) {
          res.status(200).json(updatedTeacher);
        } else {
          res.status(404).json({ message: "Teacher not found" });
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
}
// Delete a teacher by ID
const deleteTeacher = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTeacher = await Teacher.findByIdAndDelete(id);
        if (!deletedTeacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.status(200).json({ message: 'Teacher deleted successfully' });
    } catch (error) {
        console.error('Error deleting teacher:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createTeacher,
    getAllTeachers,
    getById,
    updateTeacher,
    deleteTeacher,
};
