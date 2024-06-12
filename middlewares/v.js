const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

function gen() {
    try {
        const token = jwt.sign(
            {
                // Fields to be included in the token
                username: "vish",
                role: "admin"
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        return token;
    } catch (error) {
        console.error("Error generating JWT token:", error);
        return null;
    }
}

const token = gen();
console.log("Generated JWT token:", token);
