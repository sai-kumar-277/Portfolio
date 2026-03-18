"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useVelocity, useAnimationFrame, useMotionValue } from "framer-motion";
import { wrap } from "@motionone/utils";

interface ParallaxProps {
    children: React.ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
        clamp: false
    });

    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="overflow-hidden whitespace-nowrap flex m-0 relative py-8">
            <motion.div className="flex whitespace-nowrap space-x-12 px-6" style={{ x }}>
                <span className="flex space-x-12">{children}</span>
                <span className="flex space-x-12">{children}</span>
                <span className="flex space-x-12">{children}</span>
                <span className="flex space-x-12">{children}</span>
            </motion.div>
        </div>
    );
}

const validations = [
    "Tech Expo Winner @ SRM",
    "Code4Change Podium Finalist",
    "B.Tech CSE @ SRM University",
    "Drona & SkyQuest Alumnus",
    "Python, C++, Java",
    "Machine Learning & NLP",
    "Salesforce & Cloud Infrastructure"
];

export default function KineticCarousel() {
    return (
        <section className="py-16 bg-transparent overflow-hidden border-t border-white/[0.03]">
            <div className="max-w-7xl mx-auto px-6 mb-8">

                <h2 className="text-4xl font-semibold text-white tracking-tight">Industry Recognition</h2>
            </div>

            <div className="relative rotate-[-2deg] scale-105 my-6 pointer-events-none">
                {/* Top Border */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                <div className="bg-[#1a0033]/50 py-4 backdrop-blur-sm">
                    <ParallaxText baseVelocity={0.8}>
                        {validations.map((item, i) => (
                            <div key={i} className="flex items-center space-x-8">
                                <span className="text-3xl md:text-5xl font-semibold text-white tracking-tighter uppercase whitespace-nowrap">
                                    {item}
                                </span>
                                <span className="text-[#A855F7] text-4xl">✦</span>
                            </div>
                        ))}
                    </ParallaxText>
                </div>

                <div className="absolute top-1/2 left-0 right-0 h-px bg-white/[0.02]" />

                <div className="bg-[#1a0033]/30 py-4 backdrop-blur-sm">
                    <ParallaxText baseVelocity={-0.5}>
                        {validations.map((item, i) => (
                            <div key={i} className="flex items-center space-x-8">
                                <span className="text-3xl md:text-5xl font-light text-white/90 tracking-wide uppercase whitespace-nowrap">
                                    {item}
                                </span>
                                <span className="text-white/20 text-3xl">✦</span>
                            </div>
                        ))}
                    </ParallaxText>
                </div>

                {/* Bottom Border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A855F7]/30 to-transparent" />
            </div>
        </section>
    );
}
