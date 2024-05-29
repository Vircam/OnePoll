const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const Account = require('../models/account');

// Render the login form
router.get('/login', (req, res) => {
    res.render('account/login');
});

// Handle login form submission
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await Account.findOne({ username });
        if (!user) {
            return res.status(400).render('account/login', { error: 'Invalid username or password' });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).render('account/login', { error: 'Invalid username or password' });
        }
        
        // Add session or JWT authentication here
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).render('account/login', { error: 'An error occurred. Please try again.' });
    }
});

// Render the registration form
router.get('/register', (req, res) => {
    res.render('account/register');
});

// Handle registration form submission
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new Account({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.redirect('/account/login');
    } catch (err) {
        if (err.code === 11000) {  // Duplicate key error code
            return res.status(400).render('account/register', { error: 'Username already exists. Please choose another one.' });
        }
        console.error(err);
        res.status(500).render('account/register', { error: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
