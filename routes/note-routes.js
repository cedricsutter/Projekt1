import express from 'express';
const router = express.Router();
import * as notesController from '../controller/note-controller.js';

router.get("/", notesController.showIndex);
router.get("/note", notesController.getNote);
router.post("/note", notesController.createNote);
router.put("/note", notesController.updateNote);
router.get("/note/:id/", notesController.getNoteById);

export const orderRoutes = router;