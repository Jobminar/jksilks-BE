import Login from "../model/loginModel.js"
import bcrypt from 'bcryptjs';

const login={
createlogin:[async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Login.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      const userDataToSend = {
        _id: user._id,
        username: user.username,
        email: user.email,
        whatsapp: user.whatsapp,
      };
      console.log(userDataToSend,'userdata send,line 88')
      res.status(200).json({
        message: 'Login successful',
        user: userDataToSend,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }]
}
export default login