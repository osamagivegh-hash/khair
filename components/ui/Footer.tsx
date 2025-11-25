'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { HeartHandshake, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Users, Globe, Award } from 'lucide-react'
import Link from 'next/link'

const stats = [
    {
        id: 1,
        label: 'مستفيد',
        value: 50000,
        suffix: '+',
        icon: Users,
        color: 'text-white',
        bg: 'bg-white/10',
    },
    {
        id: 2,
        label: 'متطوع',
        value: 1200,
        suffix: '+',
        icon: HeartHandshake,
        color: 'text-white',
        bg: 'bg-white/10',
    },
    {
        id: 3,
        label: 'دولة',
        value: 15,
        suffix: '',
        icon: Globe,
        color: 'text-white',
        bg: 'bg-white/10',
    },
    {
        id: 4,
        label: 'عاماً من العطاء',
        value: 25,
        suffix: '',
        icon: Award,
        color: 'text-white',
        bg: 'bg-white/10',
    },
]

function Counter({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null)
    const motionValue = useMotionValue(0)
    const springValue = useSpring(motionValue, {
        damping: 60,
        stiffness: 100,
    })
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (isInView) {
            motionValue.set(value)
        }
    }, [motionValue, isInView, value])

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toLocaleString() + suffix
            }
        })
    }, [springValue, suffix])

    return <span ref={ref} className="tabular-nums" />
}

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Statistics Section */}
            <div className="bg-primary py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="flex flex-col items-center text-center group"
                            >
                                <div className={`p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-white mb-2 font-sans">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </h3>
                                <p className="text-secondary font-medium text-lg">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Content */}
            <div className="pt-16 pb-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        {/* About */}
                        <div>
                            <Link href="/" className="flex items-center gap-2 mb-6 group">
                                <div className="bg-primary p-2 rounded-full text-white group-hover:bg-secondary transition-colors">
                                    <HeartHandshake size={24} />
                                </div>
                                <span className="text-2xl font-bold text-white">إنماء</span>
                            </Link>
                            <p className="text-sm leading-relaxed mb-6">
                                جمعية خيرية تسعى لتقديم العون والمساعدة للمحتاجين في كل مكان، من خلال برامج تنموية وإغاثية مستدامة تهدف إلى تحقيق التكافل الاجتماعي.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="hover:text-secondary transition-colors"><Facebook size={20} /></a>
                                <a href="#" className="hover:text-secondary transition-colors"><Twitter size={20} /></a>
                                <a href="#" className="hover:text-secondary transition-colors"><Instagram size={20} /></a>
                                <a href="#" className="hover:text-secondary transition-colors"><Youtube size={20} /></a>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-secondary">
                                روابط سريعة
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">من نحن</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">مشاريعنا</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">أخبار الجمعية</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">التقارير المالية</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
                            </ul>
                        </div>

                        {/* Projects */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-secondary">
                                أهم المشاريع
                            </h3>
                            <ul className="space-y-3 text-sm">
                                <li><Link href="#" className="hover:text-primary transition-colors">كفالة الأيتام</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">سقيا الماء</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">بناء المساجد</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">الإغاثة العاجلة</Link></li>
                                <li><Link href="#" className="hover:text-primary transition-colors">دعم التعليم</Link></li>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h3 className="text-white font-bold text-lg mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:right-0 after:w-12 after:h-1 after:bg-secondary">
                                تواصل معنا
                            </h3>
                            <ul className="space-y-4 text-sm">
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-secondary mt-1" />
                                    <span>المملكة العربية السعودية، الرياض، حي العليا</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-secondary" />
                                    <span dir="ltr">+966 11 123 4567</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-secondary" />
                                    <span>info@inmaa.org</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                        <p>© {new Date().getFullYear()} جمعية إنماء الخيرية. جميع الحقوق محفوظة.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}
