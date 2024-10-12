import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  //get user details from frontend.
  //validation--not empty
  //check if user already exist or not.--username, email
  //create user object, create entry in DB.
  //remove password and refresh token from the response
  //check for user created or not.
  //return response.
  const { username, email, name, password } = req.body;
  if (!username || !email || !name || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const userExists = await User.findOne({
    $or: [{ username }, { email }], //finding user either by username or email
  });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username: username.toLowerCase(),
    email,
    name,
    password,
  });

  const createdUser = await User.find(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while registering the user" });
  }
  return res
    .status(200)
    .json({ createdUser, message: "User registered Successfully" });
};

const loginUser = async (req, res) => {
  //get user details from frontend.
  //check if user exist or not.--username, email
  //check for password
  //generate JWT token, refresh, access token
  //save token in user and return user

  const { username, email, password } = req.body;
  if (!username && !email) {
    return res.status(400).json({ message: "Username or email is required" });
  }
  const user = await User.findOne({
    $or: [{ username: username?.toLowerCase() }, { email }],
  });
  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid user credentials" });
  }
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  
  await user.save({ validateBeforeSave: false });

  const loggedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!loggedUser) {
    return res
      .status(500)
      .json({ message: "Something went wrong while logging in the user" });
  }

  return res.status(200).json({
    loggedUser,
    accessToken,
    refreshToken,
    message: "User logged in successfully",
  });
};

export { registerUser, loginUser };
