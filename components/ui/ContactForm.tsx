'use client'

import { useState } from 'react'
import { submitMessage } from '@/app/actions'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

    async function handleSubmit(formData: FormData) {
        setStatus('submitting')
        const result = await submitMessage(formData)
        if (result.success) {
            setStatus('success')
        } else {
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 p-8 rounded-xl text-center border border-green-200"
            >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-800 mb-2">تم الإرسال بنجاح</h3>
                <p className="text-green-700">شكراً لتواصلك معنا، سنقوم بالرد عليك قريباً.</p>
                <button
                    onClick={() => setStatus('idle')}
                    className="mt-6 text-green-600 hover:underline font-medium"
                >
                    إرسال رسالة أخرى
                </button>
            </motion.div>
        )
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        الاسم
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="الاسم الكامل"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        البريد الإلكتروني
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        placeholder="example@domain.com"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    الموضوع
                </label>
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                    placeholder="عنوان الرسالة"
                />
            </div>

            <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    الرسالة
                </label>
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
                    placeholder="اكتب رسالتك هنا..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-primary hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
                {status === 'submitting' ? (
                    'جاري الإرسال...'
                ) : (
                    <>
                        <span>إرسال الرسالة</span>
                        <Send size={18} />
                    </>
                )}
            </button>

            {status === 'error' && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg text-sm">
                    <AlertCircle size={18} />
                    <span>حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى.</span>
                </div>
            )}
        </form>
    )
}
