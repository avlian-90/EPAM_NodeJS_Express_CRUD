import fs from "fs";
import path from "path";
import { User } from "../types/types";
import { isUserValid } from "../validation/UserValidation";

const dataFilePath: string = path.resolve("data/users.json");

export class UserService {

    createUser = (userData: User) => {
        const {name, age, gender} = userData;

        const {errorMessage, isValid} = isUserValid(name, age, gender);
    
        if (!isValid) {
            return errorMessage;
        } else {
            const user: User = {
                id: Math.random() * 100000000000000000,
                name,
                age,
                gender,
                status: false,
                creationTimestamp: new Date().toISOString(),
                modificationTimestamp: ""
            }
        
            let users: Array<User> = [];
        
            const data: string = fs.readFileSync(dataFilePath, "utf-8");
        
            if (data) {
                users = JSON.parse(data);
            }
        
            users.push(user);
        
            return users;
        }  
    };
  
    getUser = (userId: string) => {

        const data: string = fs.readFileSync(dataFilePath, "utf-8");
        const users: Array<User> = JSON.parse(data);
    
        const requestedUser: User | undefined = users.find(user => user.id === +userId);
    
        return requestedUser;
    };
  
    activateUser = (userId: string) => {
        const data: string = fs.readFileSync(dataFilePath, "utf-8");
        const users: Array<User> = JSON.parse(data);
    
        const index: number = users.findIndex((user) => user.id === +userId);
        const requestedUser: User = users[index];

        if (!requestedUser) {
            return null;
        } else {
            requestedUser.status = true;
            requestedUser.modificationTimestamp = new Date().toISOString();
            return users;
        }
        

    };
  
    updateUser = (userId: string, userData: User) => {
        
        const { name, age, gender } = userData;
    
        const { errorMessage, isValid } = isUserValid(name, age, gender);
    
        if (!isValid) {
            return errorMessage;
        } else {
            const data: string = fs.readFileSync(dataFilePath, 'utf-8');
            const users: Array<User> = JSON.parse(data);
        
            const index: number = users.findIndex((user) => user.id === +userId);
          
            if (index === -1) {
              return null;
            } else {
                users[index] = {
                    ...users[index],
                    name,
                    age,
                    gender,
                    modificationTimestamp: new Date().toISOString(),
                };
                return users;
            }
        }
    };
  
    deleteUser = (userId: string) => {

        const data: string = fs.readFileSync(dataFilePath, "utf-8");
        const users: Array<User> = JSON.parse(data);
    
        const filteredUsers: User[] = users.filter(user => user.id !== +userId);

        return filteredUsers;
    };
  }