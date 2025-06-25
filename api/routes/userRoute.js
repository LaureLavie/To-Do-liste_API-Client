import express from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

router.post("/register", async (req, res) => {
  // const username = req.body.username;
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Bad request" });
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hash });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  const token = jwt.sign(
    {
      email: email,
    },
    process.env.JWT_SECRET
  );

  const activationLink = `http://localhost:5000/validate/${token}`;
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "Active ton compte",
    text: "Merci de t'être inscrit. Clique ici pour activer ton compte",
    html: `<a href="${activationLink}">${activationLink}</a>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("email envoyé");
  } catch (err) {
    console.log("Erreur d'envoi d'email", err);
  }
});

router.get("/validate/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    if (user) {
      user.isVerified = true;
      await user.save();
      return res
        .status(200)
        .redirect("http://localhost:5173/activated-account");
    }
    res.status(404).json({ message: "Utilisateur non trouvé" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Erreur Lien invalide ou expiré",
    });
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      message: "Identifiants invalides",
    });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(404).json({
      message: "Identifiants invalides",
    });
  }
  if (!user.isVerified) {
    return res.status(403).json({
      message: "Compte non activé",
    });
  }
  const loginToken = jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
      username: user.username,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", Token, {
    httpOnly: false,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({ message: "Vous êtes bien connecté" });

  // res.status(200).json({
  //   email: user.email,
  //   role: user.role,
  //   token: token,
  // });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token"); // Clear the cookie
  res.status(200).json({ message: "Vous êtes déconnecté" });
});
// res.cookie('token', '', {
export default router;
