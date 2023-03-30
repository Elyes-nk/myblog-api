const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = ({req}) => {
  const token = req.headers.authorization;
  if (!token) return { isAuth: false }
  
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return { isAuth: false };
  }
  // in case any error found
  if (!decodeToken) return { isAuth: false };

  // token decoded successfully, and extracted data
  return { isAuth: true, userId: decodeToken.id };
};