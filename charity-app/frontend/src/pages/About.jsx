import { Link } from 'react-router-dom'
import './About.css'

const About = () => {
    const values = [
        {
            icon: '💝',
            title: 'Compassion',
            description: 'We approach every situation with empathy, understanding the struggles of those we serve.',
        },
        {
            icon: '🤝',
            title: 'Integrity',
            description: 'We maintain the highest ethical standards in all our operations and financial management.',
        },
        {
            icon: '🌟',
            title: 'Excellence',
            description: 'We strive for excellence in every program, ensuring maximum impact with every donation.',
        },
        {
            icon: '🌍',
            title: 'Global Reach',
            description: 'We work across borders to reach communities in need, wherever they may be.',
        },
    ]

    const projects = [
        {
            title: 'Clean Water Initiative',
            location: 'East Africa',
            description: 'Building wells and water purification systems to provide clean drinking water to over 50,000 people.',
            impact: '50,000+ beneficiaries',
        },
        {
            title: 'Education for All',
            location: 'South Asia',
            description: 'Sponsoring education for 5,000 underprivileged children and building 15 schools in rural areas.',
            impact: '5,000 students supported',
        },
        {
            title: 'Healthcare Outreach',
            location: 'Middle East',
            description: 'Mobile medical clinics providing free healthcare services to refugees and displaced families.',
            impact: '25,000 patients treated',
        },
        {
            title: 'Orphan Care Program',
            location: 'Global',
            description: 'Comprehensive support for orphaned children including housing, education, and emotional care.',
            impact: '3,000 children cared for',
        },
    ]

    const team = [
        { name: 'Dr. Ahmed Hassan', role: 'Founder & Chairman', emoji: '👨‍💼' },
        { name: 'Sarah Mitchell', role: 'Executive Director', emoji: '👩‍💼' },
        { name: 'Omar Khalid', role: 'Programs Director', emoji: '👨‍💻' },
        { name: 'Dr. Fatima Ali', role: 'Healthcare Lead', emoji: '👩‍⚕️' },
    ]

    return (
        <div className="about-page">
            {/* Page Header */}
            <section className="page-header">
                <div className="page-header-overlay"></div>
                <div className="container page-header-content">
                    <h1>About Us</h1>
                    <p>Learn about our mission, values, and the impact we're making around the world.</p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="mission-section section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon">🎯</div>
                            <h3>Our Mission</h3>
                            <p>
                                To provide humanitarian aid, education, and sustainable development programs
                                to underserved communities worldwide, empowering individuals to break the cycle
                                of poverty and build brighter futures.
                            </p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">👁️</div>
                            <h3>Our Vision</h3>
                            <p>
                                A world where every person has access to basic necessities, quality education,
                                and opportunities for growth—regardless of their background, location, or circumstances.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section section">
                <div className="container">
                    <div className="story-content">
                        <span className="section-label">Our Story</span>
                        <h2>A Journey of Compassion</h2>
                        <div className="story-text">
                            <p>
                                Founded in 2010, Al-Khair Charity began with a simple yet powerful vision:
                                to be a bridge between those who want to help and those who need help. What
                                started as a small initiative by a group of dedicated volunteers has grown
                                into a global organization serving millions.
                            </p>
                            <p>
                                Over the years, we have expanded our reach to over 35 countries, implementing
                                programs that address immediate needs while creating lasting change. Our approach
                                combines emergency relief with sustainable development, ensuring that communities
                                can thrive long after our direct involvement.
                            </p>
                            <p>
                                Today, Al-Khair Charity stands as a beacon of hope for countless individuals and
                                families. With a commitment to transparency, efficiency, and impact, we continue
                                to grow our programs and deepen our relationships with the communities we serve.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label">Our Values</span>
                        <h2>What Drives Us</h2>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card card">
                                <span className="value-icon">{value.icon}</span>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="projects-section section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label">Our Work</span>
                        <h2>Featured Projects</h2>
                        <p className="section-description">
                            Explore some of our ongoing projects that are making a real difference in communities worldwide.
                        </p>
                    </div>
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <div key={index} className="project-card">
                                <div className="project-location">{project.location}</div>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>
                                <div className="project-impact">
                                    <span className="impact-label">Impact:</span>
                                    <span className="impact-value">{project.impact}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team-section section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="section-label">Our Team</span>
                        <h2>Leadership</h2>
                    </div>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">{member.emoji}</div>
                                <h4>{member.name}</h4>
                                <p>{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta section">
                <div className="container text-center">
                    <h2>Join Our Mission</h2>
                    <p>Together, we can make a lasting difference in the lives of those who need it most.</p>
                    <div className="about-cta-buttons">
                        <Link to="/donate" className="btn btn-primary btn-lg">
                            Donate Now
                        </Link>
                        <Link to="/contact" className="btn btn-outline btn-lg">
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
