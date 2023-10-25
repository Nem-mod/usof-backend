import  jwt  from 'jsonwebtoken';
import {jwtSecretKey} from "../../config/index.js";

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = jwt.verify(token, jwtSecretKey);

            req.userId = decoded._id;
            next();
        } catch (error) {
            res.status(403).json({
                message: "No permissions"
            });
        }
    }
    else {
        return res.status(403).json({
            message: "No permission"
        });
    }

}