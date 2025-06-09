import jwt from 'jsonwebtoken';
const genrateToken = (user) => {
    return jwt.sign({ email: user.email, userId: user._id }, process.env.JWT_SECRET);
}

export default genrateToken;