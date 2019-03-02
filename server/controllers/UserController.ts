import * as mongoose from 'mongoose';
import * as UserModel from '../models/UserModel';
import * as express from 'express';

import { session_manager } from "../app";

type Request = express.Request;
type Response = express.Response;

const User = mongoose.model('User', UserModel.UserSchema);

export default class UserController {

    // add a new user on database
    public addNewUser(req: Request, res: Response) {
        let newUser = new User(req.body);

        newUser.save((err, user) => {
            if (err) {
                res.send(err);
            }
            res.status(201).send(
                { message: "Created" }
            );
        });
    }

    // get all users (according to query) from database
    public loginUser(req: Request, res: Response) {
        let found_user = undefined;
        console.log(`Look for ${req.body.username}`);
        
        User.find({username: req.body.username, password: req.body.password}, 
            (err, user) => {
            if (err) {
                res.status(500).send(err);
            }
            
            console.log(user[0]);
            
            const auth_token = session_manager.NewSession(user[0]);

            res.status(200).send({token: auth_token});
        });

    }

    public getUserWithID(req: Request, res: Response) {
        User.findById(
            { _id: req.params.userId },
            (err, user) => {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            });
    }

    public updateUser(req: Request, res: Response) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            req.body, { new: true }, (err, user) => {
                if (err) {
                    res.send(err);
                }
                res.json(user);
            });
    }

    public deleteUser(req: Request, res: Response) {
        User.remove(
            { _id: req.params.userId },
            (err: any) => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Successfully deleted user!' });
            });
    }


}