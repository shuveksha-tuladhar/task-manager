import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET;

if (!secret) {
    throw new Error("JWT secret is not configured properly in environment variables.");
}

export const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, secret, { expiresIn: '24h' });
};
