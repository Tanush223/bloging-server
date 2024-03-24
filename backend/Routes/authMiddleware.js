const jwt = require("jsonwebtoken");
const jwtsecreet = "password";

const auth = (req, res, next) => {
  const autHeader = req.body.token;

  if (!autHeader || !autHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "invaled token please login again",
    });
  }
  const token = autHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, jwtsecreet);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log("error while authorizing");
    return res.status(401).json({
      message: "error while authorizing",
    });
  }
};
