'use client'

import { Program } from '@prisma/client'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function ProgramCard({ program }: { program: Program }) {
    const percentage = Math.min(100, Math.round((program.raisedAmount / program.targetAmount) * 100))

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 flex flex-col h-full"
        >
            <div className="relative h-48 w-full">
                <Image
                    src={program.imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {program.category}
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h3>
                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3">
                    {program.description}
                </p>

                <div className="mt-auto">
                    <div className="flex justify-between text-sm font-medium mb-1">
                        <span className="text-primary">تم جمع: {program.raisedAmount.toLocaleString('en-US')} ر.س</span>
                        <span className="text-gray-500">الهدف: {program.targetAmount.toLocaleString('en-US')} ر.س</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="bg-primary h-2.5 rounded-full"
                        />
                    </div>

                    <button className="w-full py-2 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold rounded-lg transition-colors">
                        ساهم الآن
                    </button>
                </div>
            </div>
        </motion.div>
    )
}
