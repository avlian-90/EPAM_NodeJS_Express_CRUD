import express, { Router } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = express.Router();
const userController: UserController = new UserController();
const { createUser, getUser, activateUser, updateUser, deleteUser } = userController;

router.get("/", (req, res) => {
    res.send("My CRUD application");
})

router.post("/create", createUser);
router.get("/:id", getUser);
router.patch("/:id/activate", activateUser);
router.put("/:id/edit", updateUser);
router.delete("/:id/delete", deleteUser);

export default router;