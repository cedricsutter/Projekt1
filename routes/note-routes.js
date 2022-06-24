import express from 'express';
const router = express.Router();
import * as ordersController from '../controller/note-controller.js';

router.get("/", ordersController.showNotes);
router.post("/", ordersController.createNote);
router.delete("/:uid", ordersController.deleteNote);
router.patch("/:uid", ordersController.updateNote);

export const noteRoutes = router;

