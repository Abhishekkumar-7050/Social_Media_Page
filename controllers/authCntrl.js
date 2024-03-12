const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User is Already Resgisterd");
    }

    const hashPasswaord = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashPasswaord,
    });

    return res.status(201).json({
      // default 200 status
      user,
    });
  } catch (error) {
    console.log(" Error found", error);
  }
};

const logInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send("All fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User is not registered");
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.status(403).send("Incorrect password");
    }

    // return res.send(user);
    const AccessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.status(201).json({ AccessToken, refreshToken });
    // console.log({AccessToken});
  } catch (error) {
    console.log(" Error found", error);
  }
};
// this api will check the refreshToken validity and generate a new acess token
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

  if(!refreshToken){
    return res.status(401).send(" Refresh token is required");
  }
  try {
    const decode = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );
    const _id = decode._id;
    const AccessToken = generateAccessToken({_id});
    return res.status(201).json({ AccessToken });
  } catch (error) {
    return res.status(404).send("Invalid Refresh  Token");

  }
};

// internal function
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "10y",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Error found to generate AccessToken", error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    console.log(token);
    return token;
  } catch (error) {
    console.log("Error found to generate RefreshToken", error);
  }
};

module.exports = {
  logInController,
  signupController,
  refreshAccessToken,
};
