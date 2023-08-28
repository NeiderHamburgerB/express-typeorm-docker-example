import * as jwt from "./strategies/jwt.strategie";
import * as local from "./strategies/local.strategie";

const strategies = [jwt,local];

export default strategies;