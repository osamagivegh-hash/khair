const Donation = require('../models/Donation');
const { validationResult } = require('express-validator');

/**
 * @desc    Create a new donation
 * @route   POST /api/donate
 * @access  Public
 */
const createDonation = async (req, res, next) => {
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

        const { fullName, phoneNumber, amount, donationType, notes } = req.body;

        // Get client IP
        const ipAddress = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

        // Create donation
        const donation = await Donation.create({
            fullName,
            phoneNumber,
            amount,
            donationType,
            notes,
            ipAddress,
        });

        res.status(201).json({
            success: true,
            message: 'Thank you for your generous donation!',
            data: {
                id: donation._id,
                fullName: donation.fullName,
                amount: donation.amount,
                donationType: donation.donationType,
                createdAt: donation.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get all donations
 * @route   GET /api/donations
 * @access  Public (in real app, should be protected)
 */
const getDonations = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const donations = await Donation.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('-ipAddress'); // Don't expose IP addresses

        const total = await Donation.countDocuments();

        res.status(200).json({
            success: true,
            count: donations.length,
            total,
            page,
            pages: Math.ceil(total / limit),
            data: donations,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * @desc    Get donation statistics
 * @route   GET /api/donations/stats
 * @access  Public
 */
const getDonationStats = async (req, res, next) => {
    try {
        const stats = await Donation.aggregate([
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$amount' },
                    averageAmount: { $avg: '$amount' },
                    totalDonations: { $sum: 1 },
                    maxDonation: { $max: '$amount' },
                },
            },
        ]);

        const byType = await Donation.aggregate([
            {
                $group: {
                    _id: '$donationType',
                    count: { $sum: 1 },
                    totalAmount: { $sum: '$amount' },
                },
            },
            { $sort: { totalAmount: -1 } },
        ]);

        res.status(200).json({
            success: true,
            data: {
                summary: stats[0] || {
                    totalAmount: 0,
                    averageAmount: 0,
                    totalDonations: 0,
                    maxDonation: 0,
                },
                byType,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createDonation,
    getDonations,
    getDonationStats,
};
