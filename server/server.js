import express from "express";
import { json } from "express";
import connectToMongoDB from "./conn.js";
import router from "./Routes/routes.js";
import dotenv from "dotenv";
import cors from "cors";
import Login from "./model/loginModel.js";


dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();


app.use(cors());

app.use(json());
app.use("/", router);



app.post('/signup', async (req, res) => {
  try {
    const { username, email, password, whatsapp } = req.body;

    const existingUser = await Login.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

   

    const newUser = new Login({
      username,
      email,
      password: hashedPassword,
      whatsapp,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
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
});


app.get('/getAllUsers', async (req, res) => {
  try {
    const users = await Login.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/reset-password/:resetToken', async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    const user = await Login.findOne({
      resetToken,
      resetTokenExpiration: { $gt: new Date() },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired reset token' });
    }

    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await Login.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // const resetToken = uuidv4();
    const resetTokenExpiration = new Date(Date.now() + 3600000);

    user.resetToken = resetToken;
    user.resetTokenExpiration = resetTokenExpiration;
    await user.save();

    const resetLink = "http://localhost:3000/reset-password/${resetToken}";

    res.status(200).json({ message: 'Reset link sent successfully', resetToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/deleteUser/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await Login.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




let server;

const startServer = async () => {
  try {
    await connectToMongoDB();

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`MongoDB connected at ${process.env.MONGODB_URI}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const shutdownServer = async () => {
  if (server) {
    await server.close(async () => {
      console.log("Server closed");
      await connectToMongoDB();
    });
  }
};

process.on("SIGINT", async () => {
  console.log("Received SIGINT signal");
  await shutdownServer();
  process.exit(0);
});

process.on("uncaughtException", async (error) => {
  console.error(error);
  await shutdownServer();
  process.exit(1);
});

startServer();
