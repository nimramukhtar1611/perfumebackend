const Perfume = require ('../models/mensperfume')
const express = require ('express')
const menrouter = express.Router()
menrouter.get("/menperfume", async (req, res) => {
  try {
    const perfume = await Perfume.find();
    res.status(200).json(perfume); 
  } catch (error) {
    console.log("error occurred", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

menrouter.post("/menperfume", async (req, res) => {
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

module.exports=menrouter