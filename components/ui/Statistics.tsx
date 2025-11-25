'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useMotionValue } from 'framer-motion'
import { Users, HeartHandshake, Globe, Award } from 'lucide-react'

const stats = [
    {
        id: 1,
        label: 'مستفيد',
        value: 50000,
        suffix: '+',
        icon: Users,
        color: 'text-emerald-500',
        bg: 'bg-emerald-100',
    },
    {
        id: 2,
        label: 'متطوع',
        value: 1200,
        suffix: '+',
        icon: HeartHandshake,
        color: 'text-amber-500',
        bg: 'bg-amber-100',
    },
    {
        id: 3,
        label: 'دولة',
        value: 15,
        suffix: '',
        icon: Globe,
        color: 'text-blue-500',
        bg: 'bg-blue-100',
    },
    {
        id: 4,
        label: 'عاماً من العطاء',
        value: 25,
        suffix: '',
        icon: Award,
        color: 'text-purple-500',
        bg: 'bg-purple-100',
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

export default function Statistics() {
    return (
        <section className="py-16 relative z-10 -mt-20 mx-4 md:mx-12">
            <div className="container mx-auto">
                <div className="bg-white rounded-2xl shadow-2xl border-b-4 border-secondary overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x md:divide-x-reverse divide-gray-100">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-8 flex flex-col items-center text-center group hover:bg-gray-50 transition-colors duration-300"
                            >
                                <div className={`p-4 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110 ${stat.bg} ${stat.color}`}>
                                    <stat.icon size={32} />
                                </div>
                                <h3 className="text-4xl font-bold text-gray-800 mb-2 font-sans">
                                    <Counter value={stat.value} suffix={stat.suffix} />
                                </h3>
                                <p className="text-gray-500 font-medium text-lg">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
