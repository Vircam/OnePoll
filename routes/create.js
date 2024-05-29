const express = require('express');
const router = express.Router();
const Poll = require('../models/create'); // Assuming this is your Poll model

// Render the poll creation form
router.get('/create', (req, res) => {
    res.render('/create'); // Assuming you have a view file named create.ejs for poll creation
});

// Handle poll creation form submission
router.post('/create', async (req, res) => {
    const { title, options } = req.body;
    try {
        const newPoll = new Poll({ title, options });
        await newPoll.save();
        res.redirect('/'); // Redirect to the page where users can view all polls
    } catch (err) {
        console.error(err);
        res.status(500).render('error', { error: 'An error occurred. Please try again.' });
    }
});

module.exports = router;
