import { UserService } from "../../../modules/user/user.service";
import { Strategy } from "passport-local";
import { compareSync } from "bcryptjs";
import passport from "passport";

passport.use('login', new Strategy({
    usernameField: 'email',
    passwordField: 'password',
}, async (email, pass, done) => {
    try {
        const userService = new UserService();
        let user = await userService.one({ email });
        if (!user) return done(null, false, { message: 'User not exists' });
        if (!compareSync(pass, user.password)) return done(null, false, { message: 'User or password incorrect' });
        let { password, ...rest } = user;
        return done(null, rest);
    } catch (e) {
        return done(e);
    }
}))
