const express = require('express');
const adminrouter = express.Router();
const Perfume = require('../models/perfume');
const { upload, cloudinary }= require('../config/cloudinaryUpload');
adminrouter.post("/perfumes", upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const { title, description } = req.body;
    if (!file || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'perfumes' },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
      uploadStream.end(file.buffer);
    });

    const newPerfume = new Perfume({
      title,
      description,
      image: result.secure_url
    });
    await newPerfume.save();

    res.status(201).json({ message: "Perfume added successfully" });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Failed to add perfume" });
  }
});

adminrouter.get("/perfumes", async (req, res) => {
  try {
    const perfumes = await Perfume.find();
    res.status(200).json(perfumes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch perfumes" });
  }
});

module.exports = adminrouter;