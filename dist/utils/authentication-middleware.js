"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var checkAuth = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return res
                .status(401)
                .json({ message: "Authorization header missing" });
        }
        var authHeaderArray = authHeader.split(" ");
        if (authHeaderArray[0] !== "Bearer" || !authHeaderArray[1]) {
            return res
                .status(401)
                .json({ message: "Authorization header incorrect format" });
        }
        var decodedToken = jsonwebtoken_1.default.verify(authHeaderArray[1], process.env.TOKEN_SECRET);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Authorization failed", error: error });
    }
};
exports.default = checkAuth;
