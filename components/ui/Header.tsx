'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, HeartHandshake, Search, Facebook, Twitter, Instagram, Youtube, Mail, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'عن إنماء', href: '/' },
        { name: 'البرامج', href: '#programs' },
        { name: 'المبادرات', href: '#' },
        { name: 'الحوكمة', href: '#' },
        { name: 'التبرعات', href: '#' },
        { name: 'المركز الإعلامي', href: '#' },
        { name: 'التقارير', href: '#' },
        { name: 'اتصل بنا', href: '#contact' },
    ]

    const socialLinks = [
        { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-[#1DA1F2]' },
        { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-[#1877F2]' },
        { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-[#FF0000]' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-[#E4405F]' },
        { name: 'WhatsApp', icon: MessageCircle, href: '#', color: 'hover:text-[#25D366]' },
        { name: 'Email', icon: Mail, href: 'mailto:info@inmaa.org', color: 'hover:text-primary' },
    ]

    return (
        <header className="fixed top-0 left-0 right-0 z-40 flex flex-col">
            {/* Top Bar */}
            <div className="bg-primary text-white py-2 text-sm">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <span className="font-medium">معاً للحياة</span>
                        <span className="text-white/60">|</span>
                        <span className="text-white/90">Together for life</span>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <button className="hover:text-secondary transition-colors">English</button>
                        <Link href="#contact" className="hover:text-secondary transition-colors">
                            أتصل بالجهة
                        </Link>
                        <button className="hover:text-secondary transition-colors">
                            <Search size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div
                className={`transition-all duration-300 w-full bg-white border-b border-gray-200 ${isScrolled ? 'shadow-md' : ''
                    }`}
            >
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    {/* Logo - Right side (RTL) */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="bg-primary p-2 rounded-full text-white group-hover:bg-secondary transition-colors">
                            <HeartHandshake size={28} />
                        </div>
                        <span className="text-2xl font-bold text-primary">إنماء</span>
                    </Link>

                    {/* Desktop Navigation - Center */}
                    <nav className="hidden lg:flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-700 hover:text-primary font-medium transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* Social Icons - Left side */}
                    <div className="hidden md:flex items-center gap-3">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`text-gray-600 ${social.color} transition-colors`}
                                aria-label={social.name}
                            >
                                <social.icon size={20} />
                            </a>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-primary"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="lg:hidden bg-white border-t border-gray-100"
                        >
                            <nav className="flex flex-col p-4 gap-4">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className="text-gray-700 hover:text-primary font-medium py-2 border-b border-gray-100"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                ))}

                                {/* Social Icons in Mobile Menu */}
                                <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`text-gray-600 ${social.color} transition-colors`}
                                            aria-label={social.name}
                                        >
                                            <social.icon size={20} />
                                        </a>
                                    ))}
                                </div>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    )
}
