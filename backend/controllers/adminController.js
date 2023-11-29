const Admin = require('../model/adminModel');
const mongoose = require('mongoose');

// Get all admins
const getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({});
        res.status(200).json(admins);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Get single admin
const getSingleAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Admin not found' });
    }

    const admin = await Admin.findById(id);

    if (!admin) {
        return res.status(404).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
};

// Add Admin
const setAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.create({ username, password });
        res.status(200).json(admin);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Update an admin
const updateAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Admin not found' });
    }

    const admin = await Admin.findOneAndUpdate({ _id: id }, { ...req.body });

    if (!admin) {
        return res.status(400).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
};

// Delete an Admin
const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Admin not found' });
    }

    const admin = await Admin.findOneAndDelete({ _id: id });

    if (!admin) {
        return res.status(400).json({ error: 'Admin not found' });
    }

    res.status(200).json(admin);
};

module.exports = {
    getSingleAdmin,
    getAdmins,
    setAdmin,
    updateAdmin,
    deleteAdmin,
};
