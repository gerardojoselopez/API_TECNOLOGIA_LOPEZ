const Image = require("../models/image");
//---------------------------------------------------//



//---------------------------------------------------//
//------------------UPLOAD IMAGE--------------------//
async function uploadImage(req, res) {
  const image = new Image();
  image.title = req.body.title;
  image.description = req.body.description;
  image.filename = req.file.filename;
  image.path = '/img/uploads/' + req.file.filename;
  image.originalname = req.file.originalname;
  image.mimetype = req.file.mimetype;
  image.size = req.file.size;

  await image.save();
  res.render("upload");
}
//---------------------------------------------------//



//---------------------------------------------------//
//------------------PERFIL IMAGE--------------------//
async function getProfile(req, res, collection) {
  const { id } = req.params;

  try {
    const image = await Image.findById(id);

    if (!image) {
      // Si la imagen no existe, puedes mostrar un mensaje de error o redirigir a otra página.
      return res.status(404).send("La imagen no existe");
    }

    console.log(image);
    res.render("profile", { image });
  } catch (error) {
    // Si ocurre un error durante la consulta a la base de datos, puedes manejarlo aquí.
    console.error("Error al obtener la imagen:", error);
    res.status(500).send("Ocurrió un error al obtener la imagen");
  }
}
//---------------------------------------------------//







module.exports = { getProfile, uploadImage };