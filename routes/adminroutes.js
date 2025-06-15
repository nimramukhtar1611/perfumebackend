const Perfume = require('../models/perfume');
const express = require('express');
const multer = require('multer');
const path = require('path');
const adminrouter = express.Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });
adminrouter.post("/perfumes", upload.single('image'), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : '';
  try {
    const newPerfume = new Perfume({ title, image, description });
    await newPerfume.save();
    res.status(201).json({ message: "Perfume added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to add perfume" });
  }
});
adminrouter.get("/perfumes", async (req, res) => {
  try {
    const perfumes = await Perfume.find();
    res.status(200).json(perfumes);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Failed to fetch perfumes" });
  }
});

module.exports = adminrouter;
