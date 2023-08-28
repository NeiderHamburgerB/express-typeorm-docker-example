import { validation } from "../../common/validData";
import { IUser } from "../user/user.interface";
import { Request, Response } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";

export class AuthController {

  static async login(req: Request, res: Response, next: any) {

    const err = validation(req);
         
    if(err){
        return res.status(400).send({ err });
    }

    passport.authenticate('login', async (err, user: IUser) => {

      try {

        if (err || !user) return next(err);

        req.login(user, { session: false }, async (err) => {

          if (err) return next(err);

          let { id } = user;

          let payload = { sub: id };

          return res.json({
            user,
            accessToken: jwt.sign(payload, `${process.env.JWT_SECRET}`, { expiresIn: '24h' })
          });

        });
      }
      catch (e) {
        return next(e);
      }

    })(req, res, next);

  }
}


