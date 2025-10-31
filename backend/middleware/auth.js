import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized, Please Login",
    });
  }
  try {
    if (!req.body) {
      req.body = {};
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("Some error occured while doing auth:", error);
    res.json({
      success: false,
      message: "Auth is failed",
    });
  }
};

export default authMiddleware;
