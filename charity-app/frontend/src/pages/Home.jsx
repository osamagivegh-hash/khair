import { Link } from 'react-router-dom'
import './Home.css'

const Home = () => {
    const stats = [
        { number: '50,000+', label: 'Lives Impacted', icon: '❤️' },
        { number: '120+', label: 'Active Projects', icon: '📋' },
        { number: '35+', label: 'Countries Reached', icon: '🌍' },
        { number: '$2.5M+', label: 'Funds Raised', icon: '💰' },
    ]

    const programs = [
        {
            icon: '👶',
            title: 'Orphan Support',
            description: 'Providing care, education, and hope for orphaned children worldwide.',
        },
        {
            icon: '📚',
            title: 'Education',
            description: 'Building schools and sponsoring students for brighter futures.',
        },
        {
            icon: '🏥',
            title: 'Healthcare',
            description: 'Medical aid, clinics, and health programs for underserved communities.',
        },
        {
            icon: '🍞',
            title: 'Food Security',
            description: 'Fighting hunger through sustainable food distribution programs.',
        },
        {
            icon: '💧',
            title: 'Clean Water',
            description: 'Building wells and water systems for communities in need.',
        },
        {
            icon: '🚨',
            title: 'Emergency Relief',
            description: 'Rapid response to disasters and humanitarian crises.',
        },
    ]

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-overlay"></div>
                <div className="hero-content container">
                    <div className="hero-badge animate-fade-in">
                        ✨ Making a Difference Since 2010
                    </div>
                    <h1 className="hero-title animate-slide-up">
                        Spreading Hope,
                        <span className="hero-title-accent"> Changing Lives</span>
                    </h1>
                    <p className="hero-description animate-slide-up">
                        Join Al-Khair Charity in our mission to provide support, relief, and opportunities
                        to those in need. Together, we can create lasting change and build a better world.
                    </p>
                    <div className="hero-cta animate-slide-up">
                        <Link to="/donate" className="btn btn-secondary btn-lg">
                            Donate Now
                        </Link>
                        <Link to="/about" className="btn btn-outline btn-lg">
                            Learn More
                        </Link>
                    </div>
                </div>
                <div className="hero-wave">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="var(--neutral-50)" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section section">
                <div className="container">
                    <div className="stats-grid">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="stat-icon">{stat.icon}</span>
                                <span className="stat-number">{stat.number}</span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Preview Section */}
            <section className="about-preview section">
                <div className="container">
                    <div className="about-preview-grid">
                        <div className="about-preview-content">
                            <span className="section-label">Who We Are</span>
                            <h2>Empowering Communities Through Compassion</h2>
                            <p>
                                Al-Khair Charity has been at the forefront of humanitarian work for over a decade.
                                We believe that every person deserves access to basic necessities, education, and opportunities.
                            </p>
                            <p>
                                Our dedicated team of volunteers and partners work tirelessly across the globe to
                                deliver aid where it's needed most, ensuring transparency and maximum impact with every donation.
                            </p>
                            <Link to="/about" className="btn btn-primary">
                                Read Our Story
                            </Link>
                        </div>
                        <div className="about-preview-image">
                            <div className="about-image-container">
                                <div className="about-image-bg"></div>
                                <div className="about-image-card">
                                    <span className="about-card-number">13+</span>
                                    <span className="about-card-text">Years of Service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programs Section */}
            <section className="programs-section section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label">What We Do</span>
                        <h2>Our Programs & Initiatives</h2>
                        <p className="section-description">
                            We run diverse programs designed to create sustainable change and
                            address the most pressing needs in communities worldwide.
                        </p>
                    </div>
                    <div className="programs-grid">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className="program-card card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="program-icon">{program.icon}</span>
                                <h3>{program.title}</h3>
                                <p>{program.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-overlay"></div>
                <div className="container cta-content">
                    <h2>Ready to Make a Difference?</h2>
                    <p>
                        Your generosity can transform lives. Join thousands of donors who are
                        helping us create a brighter future for those in need.
                    </p>
                    <div className="cta-buttons">
                        <Link to="/donate" className="btn btn-secondary btn-lg">
                            Donate Now
                        </Link>
                        <Link to="/contact" className="btn btn-outline btn-lg" style={{ borderColor: 'white', color: 'white' }}>
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Home
