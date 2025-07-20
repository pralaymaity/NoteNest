const authService = require("../service/authService");

exports.signup = async (req, res) => {
  try {
    const token = await authService.signup(req.body);

    res.status(200).json({ token});
  } catch (error) {
    if (error.message === "Email already taken") {
      console.log("Email already taken");
      
      return res.status(409).json({ error: error.message });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const token = await authService.signin(req.body);
    res.json({ token });
  } catch (error) {
    const code = error.message === "Invalid credentials" ? 401 : 500;
    res.status(code).json({ error: error.message });
  }
};
