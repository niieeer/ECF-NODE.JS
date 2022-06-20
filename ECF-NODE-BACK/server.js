//#region constants
require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const prismaErrors = require("./prisma.errors.json");
const bcrypt = require("bcrypt");
const htmlspecialchars = require("htmlspecialchars");
const striptags = require("striptags");

const express = require("express");
const cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT;

//#region Multer setting
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
var custom_upload_file_name;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = file.mimetype.split("/").pop();
    custom_upload_file_name =
      "image_" + new Date().getMilliseconds() + "_" + uuidv4();
    custom_upload_file_name = `${custom_upload_file_name}.${uniqueSuffix}`;
    cb(null, custom_upload_file_name);
  },
});
const upload = multer({ storage: storage });
//#endregion Multer setting

//#endregion constants

//#region SUBSCRIBE

app.post("/subscribe", upload.single("image"), async (req, res) => {
  var image;
  var response;
  const ROLES = ["USER", "ADMIN"];

  try {
    var { email, password, username, role } = req.body;
    role = ROLES.includes(role.toUpperCase()) ? role : "";
  } catch (error) {
    res.status(400).send("Some args are required");
  }

  try {
    image = req.file.filename && custom_upload_file_name;
  } catch (error) {
    image = "";
  }

  try {
    email = htmlspecialchars(striptags(email?.trim())).toLowerCase();
    password = htmlspecialchars(striptags(password?.trim()));

    const hasFinallyAnEmptyString = [email, password].includes("");

    if (hasFinallyAnEmptyString) {
      throw "Some arg is wrong formated";
    }
  } catch (error) {
    res.status(401).send(error);
  }

  bcrypt.hash(password, 4, async function (err, hash) {
    try {
      response = await prisma.user.create({
        data: {
          email,
          name: username,
          password: hash,
          image: image,
          role: role,
        },
      });
    } catch (error) {
      const fileErrorKey = error.code ?? Object.keys(error);
      return res.status(400).json({
        message: prismaErrors[fileErrorKey],
      });
    }

    delete response.password;
    res.status(201).json({ response: response });
  });
});
//#endregion SUBSCRIBE

//#region READ
app.get("/users", async (req, res) => {
  var users;

  try {
    users = await prisma.user.findMany();
    if (!users instanceof Array) {
      res.status(403).send("An error occured, please conctact your webmaster");
    }

    users.map((u) => {
      delete u.password;
      if (u.image.trim() != "") {
        u.image = fs.readFileSync(`uploads/${u.image}`, "base64");
      }
    });

    res.send(users);
  } catch (error) {
    res.status(403).send(`${error}`);
  }
});

// Chemin post de l'api pour recuperer les données envoyer de l'input en front
app.post("/users", async (req, res) => {

  // Les données sont traitées pour éviter les problemes (Balise HTML retiré, les espaces..
  // sont supprimer, les champs sont mis en minuscule  
  var inputValue = htmlspecialchars(striptags(req.body.data.trim().toLowerCase()))
  var user;
  try {
    user = await prisma.user.findMany({
      // On ajoute une condition pour récuperer uniquement l'utilisateur que l'utilisateur à saisi
      // Je pourrai aussi faire un or pour choisir en fonction de l'email
      where: {
        name: {
          contains: inputValue,
        },
      }
    });
    if (!user instanceof Array) {
      res.status(403).send("An error occured, please conctact your webmaster");
    }

    // Envoie du résultat coté front 
    res.send(user);
  } catch (error) {
    res.status(403).send(`${error}`);
  }
});

//#endregion READ

app.listen(port, () => {
  console.log("server running on port " + port);
});
