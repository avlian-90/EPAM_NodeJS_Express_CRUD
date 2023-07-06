import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { User } from "./types";

const dataFilePath = path.resolve("data.json");

export const getUser = (req: Request, res: Response) => {
    const {id} = req.params;

    const data = fs.readFileSync(dataFilePath, "utf-8");
    const users: Array<User> = JSON.parse(data);

    const requestedUser = users.find(user => user.id === +id);

    if (!requestedUser) {
        res.status(404).send("User not found!");
    } else {
        res.send(requestedUser);
    }
}