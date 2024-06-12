const BlackListed = require('../models/BlacklistedToken');

const AddBlackList = async (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(400).json({ message: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return 0;
    }

    const existingToken = await BlackListed.findOne({ token });
    if (existingToken) {
      console.log("Token is present in db")
      return 0;
    }

    const newToken = new BlackListed({ token });
    await newToken.save();
    console.log('Token added to blacklist');
    return 1;
  } catch (err) {
    console.error('Error adding token to blacklist:', err);
    return 0;
  }
};

module.exports = { AddBlackList };
