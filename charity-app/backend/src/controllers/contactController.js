const Contact = require('../models/Contact');
const { validationResult } = require('express-validator');

/**
 * @desc    Create a new contact message
 * @route   POST /api/contact
 * @access  Public
 */
const createContact = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                error: 'Validation Error',
                messages: errors.array().map((e) => e.msg),
            });
        }

        const { name, email, message } = req.body;

        // Get client IP
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Create contact message
        const contact = await Contact.create({
            name,
            email,
            message,
            ipAddress,
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for contacting us! We will get back to you soon.',
            data: {
                id: contact._id,
                name: contact.name,
                createdAt: contact.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all contact messages
 * @route   GET /api/contacts
 * @access  Public (in real app, should be protected)
 */
const getContacts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const contacts = await Contact.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-ipAddress');

        const total = await Contact.countDocuments();

        res.status(200).json({
            success: true,
            count: contacts.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: contacts,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createContact,
    getContacts,
};
