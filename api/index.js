// backend/init/app.js

const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(bodyParser.json());

// Email configuration
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "talhakhilji.idenbrid@gmail.com",
    pass: "vewtabtkfdqohkel",
  },
});

app.post("/send", (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Email: ", email);

  const mailOptions = {
    from: email,
    to: "talhakhilji.idenbrid@gmail.com", // Your email address
    subject: `Contact Us Form Submission from ${name}: ${subject}`,
    text: `Email: ${email}\nMessage: ${message}`,
    html: `<p style=" font-size:20px;">Name: ${name}</p><p style=" font-size:20px;">Email: ${email}</p><p style = "font-size:16px">Message: <span style = "font-size :14px" > ${message}</span></p ><p style = "font-size:14px;">Subject:  <span style = "font-size:14px;"> ${subject}</span></p>`,

  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info);
      res.status(200).send("Email sent");
    }
  });
});
app.post("/sendMail", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const mailOptions = {
    from: email,
    to: "talhakhilji.idenbrid@gmail.com",
    subject: `Contact Us Form Submission from ${name}: ${subject}`,
    text: `Email: ${email}\nMessage: ${message}`,
    html: `<p style=" font-size:20px;">Name: ${name}</p><p style=" font-size:20px;">Email: ${email}</p><p style = "font-size:16px">Message: <span style = "font-size :14px" > ${message}</span></p ><p style = "font-size:14px;">Category Selected:  <span style = "font-size:14px;"> ${subject}</span></p>`,
  };

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "talhakhilji.idenbrid@gmail.com",
      pass: "vewtabtkfdqohkel",
    },
  });

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Set port and start server
const port = process.env.PORT || 5000; // Use the environment port or 5000 as fallback
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
