const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name cannot exceed 100 characters'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Phone number is required'],
            trim: true,
            match: [/^[\d\+\-\(\)\s]+$/, 'Please provide a valid phone number'],
        },
        amount: {
            type: Number,
            required: [true, 'Donation amount is required'],
            min: [1, 'Donation amount must be at least 1'],
        },
        donationType: {
            type: String,
            required: [true, 'Donation type is required'],
            enum: {
                values: ['one-time', 'monthly', 'yearly', 'zakat', 'sadaqah', 'orphan-support', 'education', 'healthcare', 'emergency'],
                message: '{VALUE} is not a valid donation type',
            },
        },
        notes: {
            type: String,
            trim: true,
            maxlength: [500, 'Notes cannot exceed 500 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'cancelled'],
            default: 'pending',
        },
        ipAddress: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

// Index for faster queries
donationSchema.index({ createdAt: -1 });
donationSchema.index({ status: 1 });
donationSchema.index({ donationType: 1 });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
