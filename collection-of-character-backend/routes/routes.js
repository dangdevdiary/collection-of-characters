const express = require("express");
const router = express.Router();
const API = require("../controllers/api.controllers");
const upload = require("../middlewere/multer.middlewere");

router.get("/", API.fetchAllCharacter);
router.get("/:id", API.fetchCharacterByID);
router.get("/category/:category", API.fetchCharacterByCategory);
router.post("/", upload, API.createCharacter);
router.patch("/:id", upload, API.updateCharacter);
router.delete("/:id", API.deleteCharacter);
// user route
router.post("/register", API.registerUser);
router.post("/login", API.loginUser);
router.post("/logout", API.logoutUser);
router.get("/auth/user", API.userAuth);
module.exports = router;
