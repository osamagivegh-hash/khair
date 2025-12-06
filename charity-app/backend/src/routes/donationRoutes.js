const express = require('express');
const { body } = require('express-validator');
const {
    createDonation,
    getDonations,
    getDonationStats,
} = require('../controllers/donationController');

const router = express.Router();

// Validation rules for donation
const donationValidation = [
    body('fullName')
        .trim()
        .notEmpty()
        .withMessage('Full name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\d\+\-\(\)\s]+$/)
        .withMessage('Please provide a valid phone number'),
    body('amount')
        .notEmpty()
        .withMessage('Donation amount is required')
        .isFloat({ min: 1 })
        .withMessage('Donation amount must be at least 1'),
    body('donationType')
        .notEmpty()
        .withMessage('Donation type is required')
        .isIn([
            'one-time',
            'monthly',
            'yearly',
            'zakat',
            'sadaqah',
            'orphan-support',
            'education',
            'healthcare',
            'emergency',
        ])
        .withMessage('Invalid donation type'),
    body('notes')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('Notes cannot exceed 500 characters'),
];

// Routes
router.post('/donate', donationValidation, createDonation);
router.get('/donations', getDonations);
router.get('/donations/stats', getDonationStats);

module.exports = router;
