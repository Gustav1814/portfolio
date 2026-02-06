import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
    const [step, setStep] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        // Sequence timer
        const totalSteps = isMobile ? 3 : 5; // Faster for mobile
        const timer = setInterval(() => {
            setStep(prev => {
                if (prev >= totalSteps) {
                    clearInterval(timer);
                    setTimeout(onComplete, isMobile ? 400 : 800);
                    return prev;
                }
                return prev + 1;
            });
        }, isMobile ? 600 : 400);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearInterval(timer);
        };
    }, [onComplete, isMobile]);

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            {/* Background Matrix/Grid Effect (Desktop Only) */}
            {!isMobile && (
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
                </div>
            )}

            {isMobile ? (
                /* ============ MOBILE PRELOADER (Biometric/Clean) ============ */
                <div className="relative flex flex-col items-center justify-center w-full px-8">
                    {/* Rotating Scanner Ring */}
                    <motion.div
                        className="relative w-32 h-32 mb-8"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    >
                        <div className="absolute inset-0 border-t-2 border-amber-500 rounded-full opacity-50" />
                        <div className="absolute inset-2 border-r-2 border-amber-500/30 rounded-full" />
                        <div className="absolute inset-4 border-b-2 border-red-500/50 rounded-full" />
                    </motion.div>

                    {/* Central Text */}
                    <div className="text-center space-y-2">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-2xl font-light text-white tracking-wider"
                        >
                            {step === 0 && "SYSTEM_INIT"}
                            {step === 1 && "VERIFYING_ID"}
                            {step === 2 && "ACCESS_GRANTED"}
                            {step >= 3 && "WELCOME"}
                        </motion.div>
                        <div className="text-xs text-amber-500/60 font-mono tracking-[0.2em]">
                            SECURE_ENVIRONMENT
                        </div>
                    </div>
                </div>
            ) : (
                /* ============ DESKTOP PRELOADER (Cyber Command) ============ */
                <div className="w-full max-w-2xl px-6 font-mono">
                    <div className="flex justify-between items-end mb-2 border-b border-amber-500/30 pb-2">
                        <span className="text-amber-500/50 text-xs">ZEERAK_OS v2.0</span>
                        <span className="text-amber-500 text-xs">SECURE_BOOT</span>
                    </div>

                    <div className="space-y-1 mb-8 text-sm h-[120px]">
                        <AnimatePresence>
                            {step >= 0 && <CodeLine text="> INITIALIZING KERNEL..." color="text-white/60" delay={0} />}
                            {step >= 1 && <CodeLine text="> MOUNTING SECURITY MODULES... [OK]" color="text-amber-400" delay={0.1} />}
                            {step >= 2 && <CodeLine text="> ESTABLISHING NEURAL LINK..." color="text-white/60" delay={0.2} />}
                            {step >= 3 && <CodeLine text="> DECRYPTING ASSETS..." color="text-white/60" delay={0.3} />}
                            {step >= 4 && <CodeLine text="> ACCESS GRANTED. WELCOME, USER." color="text-green-400" delay={0.4} />}
                        </AnimatePresence>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1 bg-white/5 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-400"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / 4) * 100}%` }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// Helper for desktop code lines
function CodeLine({ text, color, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={`${color} tracking-wide`}
        >
            {text}
        </motion.div>
    )
}
