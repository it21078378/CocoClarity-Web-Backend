import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token: refreshToken }).then((doc) => {
            if (!doc) {
                console.log("invalid");
                return reject({ error: true, message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) {
                    console.log("invalid");
                    return reject({ error: true, message: "Invalid refresh token" });
                }
                console.log("valid");
                resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
            });
        }).catch((err) => reject({ error: true, message: "Internal server error" }));
    });
};

export default verifyRefreshToken;
