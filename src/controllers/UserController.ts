import { Request, Response } from "express";
import { UserModel } from "../models/UserModel";
import fs from "fs";
import path from "path";
import { User } from "../types/types";

const dataFilePath = path.resolve("data/users.json");

export class UserController {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel();
  }

  createUser = (req: Request, res: Response) => {
    const returnedVal: string | User[] = this.userModel.createUser(req.body);

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
    const requestedUser: User | undefined = this.userModel.getUser(req.params.id);

    if (!requestedUser) {
        res.status(404).send("User not found!");
    } else {
        res.send(requestedUser);
    }
  };

  activateUser = (req: Request, res: Response) => {
    const users: User[] | null = this.userModel.activateUser(req.params.id);

    if (!users) {
        res.status(404).send("User not found!");
    } else {
        fs.promises.writeFile(dataFilePath, JSON.stringify(users, undefined, 2)).then(() => {
            res.send("User is activated!");
        })
    }

  };

  updateUser = (req: Request, res: Response) => {
    const returnedVal: string | User[] | null = this.userModel.updateUser(req.params.id, req.body);

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
    const filteredUsers: User[] = this.userModel.deleteUser(req.params.id);

    fs.promises.writeFile(dataFilePath, JSON.stringify(filteredUsers, undefined, 2)).then(() => {
        res.send("User is deleted!");
    })
  };
}

