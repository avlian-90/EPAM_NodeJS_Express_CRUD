import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { User } from "./types";

const dataFilePath = path.resolve("data.json");

export const activateUser = (req: Request, res: Response) => {
    const {id} = req.params;

    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: Array<User> = JSON.parse(data);

    const index = users.findIndex((user) => user.id === +id);
    

    if (index === -1) {
        res.status(404).send("User not found!");
    } else {
        users[index].status = true;
        users[index].modificationTimestamp = new Date().toISOString();
        fs.promises.writeFile(dataFilePath, JSON.stringify(users, undefined, 2)).then(() => {
            res.send("User is activated!");
        })
    }
}