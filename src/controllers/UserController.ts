import { Request, Response } from "express";
import { UserService } from "../service/UserService";
import fs from "fs";
import path from "path";
import { User } from "../types/types";

const dataFilePath = path.resolve("data/users.json");

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  createUser = (req: Request, res: Response) => {
    const returnedVal: string | User[] = this.userService.createUser(req.body);

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
    const requestedUser: User | undefined = this.userService.getUser(req.params.id);

    if (!requestedUser) {
        res.status(404).send("User not found!");
    } else {
        res.send(requestedUser);
    }
  };

  activateUser = (req: Request, res: Response) => {
    const users: User[] | null = this.userService.activateUser(req.params.id);

    if (!users) {
        res.status(404).send("User not found!");
    } else {
        fs.promises.writeFile(dataFilePath, JSON.stringify(users, undefined, 2)).then(() => {
            res.send("User is activated!");
        })
    }

  };

  updateUser = (req: Request, res: Response) => {
    const returnedVal: string | User[] | null = this.userService.updateUser(req.params.id, req.body);

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
    const filteredUsers: User[] = this.userService.deleteUser(req.params.id);

    fs.promises.writeFile(dataFilePath, JSON.stringify(filteredUsers, undefined, 2)).then(() => {
        res.send("User is deleted!");
    })
  };
}

