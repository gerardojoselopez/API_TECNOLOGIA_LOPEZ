const Naturaleza = require("../models/naturaleza");
//---------------------------------------------------//



//---------------------------------------------------//
//------------------UPLOAD IMAGE--------------------//
async function uploadImage(req, res) {
  const { title, description } = req.body;
  const image = new Naturaleza();
  image.title = title;
  image.description = description;
  image.filename = req.file.filename;
  image.path = '/img/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  try {
    await image.save();
    res.render("uploadnat", { message: "Imagen subida correctamente" });
  } catch (error) {
    console.error("Error al guardar la imagen:", error);
    res.status(500).send("Ocurrió un error al guardar la imagen");
  }
}
//---------------------------------------------------//
//--------------------------------------------------//



//---------------------------------------------------//
//------------------PROFILE IMAGE--------------------//
async function getNaturalezaProfile(req, res) {
  const { id } = req.params;

  try {
    const naturalezaImage = await Naturaleza.findById(id); // Utiliza una variable diferente (naturalezaImage)

    if (!naturalezaImage) {
      return res.status(404).send("La imagen no exista");
    }

    console.log(naturalezaImage);
    res.render("profilenat", { image: naturalezaImage }); // Utiliza la variable naturalezaImage para la vista de perfil
  } catch (error) {
    console.error("Error al obtener la imagen:", error);
    res.status(500).send("Ocurrió un error al obtener la imagen");
  }
}






module.exports = { uploadImage , getNaturalezaProfile };
