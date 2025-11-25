'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { News } from '@prisma/client'

export default function NewsTicker({ news }: { news: News[] }) {
    if (!news.length) return null

    return (
        <div className="bg-primary text-white py-2 overflow-hidden relative z-50">
            <div className="container mx-auto flex items-center">
                <span className="bg-secondary text-primary font-bold px-3 py-1 text-sm rounded-l-md ml-4 whitespace-nowrap z-10">
                    آخر الأخبار
                </span>
                <div className="flex-1 overflow-hidden relative h-6">
                    <motion.div
                        className="absolute whitespace-nowrap flex gap-8"
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{
                            repeat: Infinity,
                            duration: 20,
                            ease: 'linear',
                        }}
                    >
                        {news.map((item) => (
                            <span key={item.id} className="text-sm font-medium">
                                {item.title}
                            </span>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
