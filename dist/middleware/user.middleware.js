import jwt from "jsonwebtoken";
const JWT_PASSWORD = process.env.JWT_PASSWORD;
export const authMiddleware = (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(401).json({
            success: false,
            error: "Unauthtized, token missing or invalid"
        });
    }
    try {
        const decoded = jwt.verify(header, JWT_PASSWORD);
        if (typeof decoded === "string") {
            return res.status(401).json({
                success: false,
                error: "Unauthorized, token missing or invalid"
            });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            error: "Unauthorized, token missing or invlid"
        });
    }
};
//# sourceMappingURL=user.middleware.js.map