const express = require("express");
const router = express.Router();
const path = require("path");
const { unlink } = require("fs-extra");
const multer = require("multer");
const { format } = require("timeago.js");
const { v4: uuidv4 } = require("uuid");
const imageController = require("../controllers/imageController");
const naturalezaController = require("../controllers/naturalezaController"); 
const Image = require("../models/image");
const Naturaleza = require('../models/naturaleza');
//---------------------------------------------------//



//---------------------------------------------------//
//------------------RUTES---------------------------//




//---------------------------------------------------//
//------------------ Home tecnologia lopez-----------//
router.use("/TecnologiaLopez",(req,res) => {
    res.render("home");
});//-----------------------------------------------//



//---------------------------------------------------//
//----------productos electronicos--UPLOAD--------------------//
router.get("/subirproducto", async (req, res) => {
    res.render("upload");
  });
  router.post('/upload', imageController.uploadImage);
//---------------------------------------------------//
//---------------------------------------------------//
//---------------------------------------------------//
//---------- computadores -UPLOAD--------------------//
router.get("/upload-naturaleza", async (req, res) => {
  res.render("uploadnat"); 
});

router.post('/upload-naturaleza', naturalezaController.uploadImage);
//---------------------------------------------------//



//---------------------------------------------------//
//------------------ PRODUCTOS---------//
router.get('/productos', async (req, res) => {
    const images = await Image.find();
    res.render('productos', {images});
});//------------------------------------------------//




//------------------PORTAFOLIO 1-----retrato---------//
router.get('/computadores', async (req, res) => {
  const naturalezaImages = await Naturaleza.find();
  res.render('computadores', { images: naturalezaImages });
});//------------------------------------------------//
//---------------------------------------------------//




// Rutas para la vista de productos
router.get("/image/:id", async (req, res) => {
  await imageController.getProfile(req, res, "image");
});

// Rutas para la vista de computadores 
router.get("/naturaleza/:id", async (req, res) => {
  await naturalezaController.getNaturalezaProfile(req, res);
});


  

// Ruta para eliminar imágenes 
router.get('/image/:id/delete', async (req, res) => {
  const { id } = req.params;
  const imageDeleted = await Image.findByIdAndDelete(id);
  await unlink(path.resolve('./src/public' + imageDeleted.path));
  res.redirect('/');
});

  

// Ruta para eliminar imágenes "
router.get('/naturaleza/:id/delete', async (req, res) => {
  const { id } = req.params;
  const imageDeleted = await Naturaleza.findByIdAndDelete(id); 
  if (imageDeleted) {
    await unlink(path.resolve('./src/public' + imageDeleted.path));
    res.redirect('/');
  } else {
    // Manejar el caso en el que no se encuentra ninguna imagen para eliminar
    res.status(404).send("No se encontró ninguna imagen para eliminar");
  }
});







//------------------Contact ------------------------//
router.use("/contact",(req,res) => {
  res.render("contact");
});//-----------------------------------------------//

//------------------ productos ------------------------//
router.use("/productos",(req,res) => {
  res.render("productos");
});//-----------------------------------------------//









module.exports = router;
