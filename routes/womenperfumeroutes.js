const Perfume = require ('../models/womensperfume')
const express = require ('express')
const womenrouter = express.Router()
womenrouter.get("/womenperfume", async (req, res) => {
  try {
    const perfume = await Perfume.find();
    res.status(200).json(perfume); 
  } catch (error) {
    console.log("error occurred", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

womenrouter.post("/womenperfume", async (req, res) => {
  const { title, image, description } = req.body;
  try {
    const newperfume = new Perfume({ title, image, description });
    await newperfume.save();
    res.status(201).json({ message: "Product added successfully" }); 
  } catch (error) {
    console.log("error occurred", error);
    res.status(500).json({ error: "Failed to add perfume" });
  }
});

module.exports=womenrouter