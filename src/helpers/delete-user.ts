import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { User } from "./types";

const dataFilePath = path.resolve("data.json");

export const deleteUser = (req: Request, res: Response) => {
    const {id} = req.params;

    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: Array<User> = JSON.parse(data);

    const filteredUsers = users.filter(user => user.id !== +id);

    fs.promises.writeFile(dataFilePath, JSON.stringify(filteredUsers, undefined, 2)).then(() => {
        res.send("User is deleted!");
    })
}