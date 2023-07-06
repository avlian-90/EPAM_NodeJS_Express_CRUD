import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { User } from "./types";
import { isUserValid } from "./validation";

const dataFilePath = path.resolve("data.json");

export const updateUser = (req: Request, res: Response) => {
    const {id} = req.params;
    const {name, age, gender} = req.body;

    const {errorMessage, isValid} = isUserValid(name, age, gender);

    if (!isValid) {
        res.status(400).send(errorMessage);
        return;
    }

    const data = fs.readFileSync(dataFilePath, 'utf-8');
    const users: Array<User> = JSON.parse(data);

    const index = users.findIndex((user) => user.id === +id);
  
    if (index === -1) {
      res.status(404).send("User not found");
    } else {
        users[index] = {
            ...users[index],
            name,
            age,
            gender,
            modificationTimestamp: new Date().toISOString(),
        };
      
        fs.promises
            .writeFile(dataFilePath, JSON.stringify(users, undefined, 2))
            .then(() => {
                res.send("User is edited!");
            })
    }
}