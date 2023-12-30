import Login from "../model/loginModel.js"
import bcrypt from 'bcryptjs';

const signupu={

createsignup:[async (req, res) => {
    try {
      const { username, email, password, whatsapp } = req.body;
  
      const existingUser = await Login.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
     
      // const imageBuffer = Buffer.from(imageBase64, 'base64');
  
      const newUser = new Login({
        username,
        email,
        password: hashedPassword,
        whatsapp,
        // image: imageBuffer.toString('base64'), 
      });
  
      await newUser.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }]
}
export default signupu