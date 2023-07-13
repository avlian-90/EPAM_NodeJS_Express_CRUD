import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import fs from "fs";
import path from "path";

const dataFilePath = path.resolve("data/users.json");

export class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  createUser = (req: Request, res: Response) => {
    const returnedVal = this.userModel.createUser(req.body);

    if (typeof returnedVal === "string") {
        res.status(400).send(returnedVal);
    } else {
        fs.promises
            .writeFile(dataFilePath, JSON.stringify(returnedVal, undefined, 2))
            .then(() => {
                res.send("User is created!");
            })
    }
  };

  getUser = (req: Request, res: Response) => {
    const requestedUser = this.userModel.getUser(req.params.id);

    if (!requestedUser) {
        res.status(404).send("User not found!");
    } else {
        res.send(requestedUser);
    }
  };

  activateUser = (req: Request, res: Response) => {
    const users = this.userModel.activateUser(req.params.id);

    if (!users) {
        res.status(404).send("User not found!");
    } else {
        fs.promises.writeFile(dataFilePath, JSON.stringify(users, undefined, 2)).then(() => {
            res.send("User is activated!");
        })
    }

  };

  updateUser = (req: Request, res: Response) => {
    const returnedVal = this.userModel.updateUser(req.params.id, req.body);

    if (!returnedVal) {
        res.status(404).send("User not found!");
    } else if (typeof returnedVal === "string") {
        res.status(400).send(returnedVal);
    } else {
        fs.promises.writeFile(dataFilePath, JSON.stringify(returnedVal, undefined, 2)).then(() => {
            res.send("User is edited!");
        })
    }
  };

  deleteUser = (req: Request, res: Response) => {
    const filteredUsers = this.userModel.deleteUser(req.params.id);

    fs.promises.writeFile(dataFilePath, JSON.stringify(filteredUsers, undefined, 2)).then(() => {
        res.send("User is deleted!");
    })
  };
}

