import { useState } from 'react'
import './Donate.css'

const Donate = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        amount: '',
        donationType: '',
        notes: '',
    })
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)

    const donationTypes = [
        { value: 'one-time', label: 'One-Time Donation' },
        { value: 'monthly', label: 'Monthly Recurring' },
        { value: 'yearly', label: 'Yearly Recurring' },
        { value: 'zakat', label: 'Zakat' },
        { value: 'sadaqah', label: 'Sadaqah' },
        { value: 'orphan-support', label: 'Orphan Support' },
        { value: 'education', label: 'Education Fund' },
        { value: 'healthcare', label: 'Healthcare Fund' },
        { value: 'emergency', label: 'Emergency Relief' },
    ]

    const suggestedAmounts = [25, 50, 100, 250, 500, 1000]

    const validateForm = () => {
        const newErrors = {}

        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
        } else if (formData.fullName.length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters'
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required'
        } else if (!/^[\d\+\-\(\)\s]+$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Please enter a valid phone number'
        }

        if (!formData.amount) {
            newErrors.amount = 'Donation amount is required'
        } else if (parseFloat(formData.amount) < 1) {
            newErrors.amount = 'Amount must be at least $1'
        }

        if (!formData.donationType) {
            newErrors.donationType = 'Please select a donation type'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }))
        }
    }

    const handleAmountSelect = (amount) => {
        setFormData((prev) => ({
            ...prev,
            amount: amount.toString(),
        }))
        if (errors.amount) {
            setErrors((prev) => ({
                ...prev,
                amount: '',
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsSubmitting(true)
        setSubmitStatus(null)

        try {
            const response = await fetch('/api/donate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(formData.amount),
                }),
            })

            const data = await response.json()

            if (response.ok) {
                setSubmitStatus({
                    type: 'success',
                    message: data.message || 'Thank you for your generous donation!',
                })
                // Reset form
                setFormData({
                    fullName: '',
                    phoneNumber: '',
                    amount: '',
                    donationType: '',
                    notes: '',
                })
            } else {
                setSubmitStatus({
                    type: 'error',
                    message: data.messages?.join(', ') || data.error || 'Something went wrong. Please try again.',
                })
            }
        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Network error. Please check your connection and try again.',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="donate-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container page-header-content">
                    <h1>Make a Donation</h1>
                    <p>Your generosity can transform lives. Every contribution makes a difference.</p>
                </div>
            </section>

            {/* Donation Form Section */}
            <section className="donate-section section">
                <div className="container">
                    <div className="donate-grid">
                        {/* Form */}
                        <div className="donate-form-wrapper">
                            <div className="donate-form-card">
                                <h2>Donation Form</h2>
                                <p className="donate-form-subtitle">
                                    Fill in your details below to complete your donation.
                                </p>

                                {submitStatus && (
                                    <div className={`submit-status ${submitStatus.type}`}>
                                        {submitStatus.type === 'success' ? '✅' : '❌'} {submitStatus.message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit}>
                                    {/* Full Name */}
                                    <div className="form-group">
                                        <label htmlFor="fullName" className="form-label">
                                            Full Name <span className="required">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            className={`form-input ${errors.fullName ? 'has-error' : ''}`}
                                            placeholder="Enter your full name"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                        />
                                        {errors.fullName && <span className="form-error">{errors.fullName}</span>}
                                    </div>

                                    {/* Phone Number */}
                                    <div className="form-group">
                                        <label htmlFor="phoneNumber" className="form-label">
                                            Phone Number <span className="required">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            className={`form-input ${errors.phoneNumber ? 'has-error' : ''}`}
                                            placeholder="+1 (555) 123-4567"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                        />
                                        {errors.phoneNumber && <span className="form-error">{errors.phoneNumber}</span>}
                                    </div>

                                    {/* Suggested Amounts */}
                                    <div className="form-group">
                                        <label className="form-label">Quick Select Amount</label>
                                        <div className="amount-buttons">
                                            {suggestedAmounts.map((amt) => (
                                                <button
                                                    type="button"
                                                    key={amt}
                                                    className={`amount-btn ${formData.amount === amt.toString() ? 'active' : ''}`}
                                                    onClick={() => handleAmountSelect(amt)}
                                                >
                                                    ${amt}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Amount */}
                                    <div className="form-group">
                                        <label htmlFor="amount" className="form-label">
                                            Donation Amount ($) <span className="required">*</span>
                                        </label>
                                        <input
                                            type="number"
                                            id="amount"
                                            name="amount"
                                            className={`form-input ${errors.amount ? 'has-error' : ''}`}
                                            placeholder="Enter amount"
                                            min="1"
                                            step="0.01"
                                            value={formData.amount}
                                            onChange={handleInputChange}
                                        />
                                        {errors.amount && <span className="form-error">{errors.amount}</span>}
                                    </div>

                                    {/* Donation Type */}
                                    <div className="form-group">
                                        <label htmlFor="donationType" className="form-label">
                                            Donation Type <span className="required">*</span>
                                        </label>
                                        <select
                                            id="donationType"
                                            name="donationType"
                                            className={`form-select ${errors.donationType ? 'has-error' : ''}`}
                                            value={formData.donationType}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select donation type</option>
                                            {donationTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {type.label}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.donationType && <span className="form-error">{errors.donationType}</span>}
                                    </div>

                                    {/* Notes */}
                                    <div className="form-group">
                                        <label htmlFor="notes" className="form-label">
                                            Additional Notes (Optional)
                                        </label>
                                        <textarea
                                            id="notes"
                                            name="notes"
                                            className="form-textarea"
                                            placeholder="Any special instructions or messages..."
                                            rows="4"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        className="btn btn-primary btn-lg donate-submit-btn"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="spinner"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                ❤️ Complete Donation
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="donate-sidebar">
                            <div className="sidebar-card">
                                <h3>🔒 Secure Donation</h3>
                                <p>Your information is protected with industry-standard encryption.</p>
                            </div>

                            <div className="sidebar-card">
                                <h3>📧 Tax Receipt</h3>
                                <p>You'll receive a tax-deductible receipt via email after your donation.</p>
                            </div>

                            <div className="sidebar-card">
                                <h3>💯 100% Transparency</h3>
                                <p>Track exactly how your donation is being used through our impact reports.</p>
                            </div>

                            <div className="sidebar-card highlight">
                                <h3>Need Help?</h3>
                                <p>Contact us at:</p>
                                <a href="tel:+15551234567">+1 (555) 123-4567</a>
                                <a href="mailto:donate@alkhair-charity.org">donate@alkhair-charity.org</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Donate
