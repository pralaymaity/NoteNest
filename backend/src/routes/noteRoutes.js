const express = require("express");
const upload = require("../config/multerConfig");
const noteController = require("../controller/noteController");
const authenticate = require("../middlewares/auth")

const noteRoute = express.Router();

noteRoute.use(authenticate)


noteRoute.post(
  "/notes",
  upload.fields([
    { name: "images", maxCount: 3 },
    { name: "files", maxCount: 3 },
  ]),
  noteController.createNote
);

noteRoute.get("/notes", noteController.getAllNotes);
noteRoute.get("/notes/:id", noteController.getNoteById);
noteRoute.get("/user/:userId", noteController.getNotesByUser);


noteRoute.put(
  "/notes/:id",
  upload.fields([
    { name: "images", maxCount: 3 },
    { name: "files", maxCount: 3 },
  ]),
  noteController.updateNote
);

noteRoute.delete("/notes/:id", noteController.deleteNote);

noteRoute.post("/shareNote/:id",  noteController.shareNote);

module.exports = noteRoute;
