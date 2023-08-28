import { validation } from "../../common/validData";
import { UserService } from "./user.service";
import { Request, Response } from "express";
import to from "await-to-js";

export class UserController {

  public userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  create = async (req: Request, res: Response, next: any) => {

    const err = validation(req);

    if (err) {
      return res.status(400).send({ err });
    }

    const [error, user] = await to(this.userService.create(req.body));

    if (error) {
      return res.status(400).send({ error });
    }

    return res.status(201).send({ user });
  }

}


