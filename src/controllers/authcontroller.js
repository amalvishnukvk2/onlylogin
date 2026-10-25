const User = require("../models/User");

exports.login = async (req, res) => {

  const { email, password } = req.body;
  if (!email || !password) throw Error('Email and password are required', 400);


  try {
    const user = await User.findOne({ email });
    if (!user) throw Error('User not found', 404);

    const isPasswordValid = await User.findOne({ password });  
    if (!isPasswordValid) throw Error('Invalid password', 401);

    res.status(200).json({ 
        message: 'Login successful', 
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
            });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message || 'Internal Server Error' });
  }
};  
          







exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already registered",
      });
    }



    // Create new user
    const user = await User.create({
      name,
      email,
      password
    });

    // Send response without password
    res.status(201).json({
      message: "Signup successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
