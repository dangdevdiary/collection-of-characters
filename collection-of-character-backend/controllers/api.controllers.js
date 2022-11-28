const Character = require("../models/characters.models");
const User = require("../models/user.models");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class API {
  // fetch all post
  static fetchAllCharacter = async (req, res) => {
    try {
      const post = await Character.find();
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // fetch post by ID
  static fetchCharacterByID = async (req, res) => {
    const id = req.params.id;
    try {
      const post = await Character.findById(id);
      res.status(200).json(post);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // fetch post by ID
  static fetchCharacterByCategory = async (req, res) => {
    const category = req.params.category;
    try {
      const character = await Character.find({ category });
      res.status(200).json(character);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // create post
  static createCharacter = async (req, res) => {
    const character = req.body;
    const imgName = req.file.filename;
    character.image = imgName;
    try {
      await Character.create(character);
      res.status(201).json({ message: "character created successfully" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  // update a post
  static updateCharacter = async (req, res) => {
    const id = req.params.id;
    let newImg = "";
    if (req.file) {
      newImg = req.file.filename;
      try {
        fs.unlinkSync("./uploads/" + req.body.old_img);
      } catch (error) {
        console.log(error);
      }
    } else {
      newImg = req.body.old_img;
    }
    const newCharacter = req.body;
    newCharacter.image = newImg;
    try {
      await Character.findByIdAndUpdate(id, newCharacter);
      res.status(200).json({ message: "character updated successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  // delete All a post
  static deleteCharacter = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await Character.findByIdAndDelete(id);
      if (result.image != "") {
        try {
          fs.unlinkSync("./uploads/" + result.image);
        } catch (error) {
          console.log(error);
        }
      }
      res.status(200).json({ message: "character deleted successfully" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  static registerUser = async (req, res) => {
    try {
      const user = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(user.password, salt);
      user.password = hashPassword;
      await User.create(user);
      const { password, ...infoUser } = user;
      res
        .status(200)
        .json({ user: infoUser, message: "Register successfully" });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  };
  static loginUser = async (req, res) => {
    const emailLogin = req.body.email;
    const user = await User.findOne({
      email: emailLogin,
    });
    if (!user) {
      return res.status(404).json({ message: "User is not found" });
    }
    const rightPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!rightPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { _id: user._id },
      process.env.ACCESS_TOKEN_SECRET || "secret"
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, //1day,
    });

    res.status(201).json({ message: "login successfully" });
  };
  static logoutUser = async (req, res) => {
    res.cookie("jwt", "", {
      maxAge: 0, // delete cookie
    });

    res.status(201).json({ message: "logout successfully" });
  };
  static userAuth = async (req, res) => {
    const cookie = req.cookies["jwt"];
    if (!cookie) {
      return res.json({ message: "unauthencated" });
    }
    const claims = jwt.verify(
      cookie,
      process.env.ACCESS_TOKEN_SECRET || "secret"
    );
    const user = await User.findOne({
      _id: claims._id,
    });
    const { password, ...data } = user.toJSON();
    res.status(202).json({ user: data });
  };
}
module.exports = API;
