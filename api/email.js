const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // Load environment variables

// Setup the email transporter using Gmail and environment variables
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
});

// Define the route to handle email submissions
router.post('/', (req, res) => {
    const { firstName, lastName, phone, email, destination, days, nights, adults, children, budget, additionalInfo } = req.body;

    // Validate required fields
    if (!firstName || !lastName || !phone || !email || !destination) {
        return res.status(400).send('All fields are required');
    }

    // Setup email options
    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: 'viratpatel1220@gmail.com', 
        subject: 'Travel Inquiry',
        text: `Name: ${firstName} ${lastName}\nPhone: ${phone}\nEmail: ${email}\nDestination: ${destination}\nDays: ${days}\nNights: ${nights}\nAdults: ${adults}\nChildren: ${children}\nBudget: ${budget}\nAdditional Information: ${additionalInfo}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(`Internal Server Error: ${error.message}`);
        } else {
            console.log('Email sent:', info.response);
            // res.redirect('/');
        }
    });
});

module.exports = router;
