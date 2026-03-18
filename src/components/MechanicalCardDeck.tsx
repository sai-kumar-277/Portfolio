"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Mechanical Stacked Card Deck
 * Fully manual interpolation of transform matrix for precision physics.
 */

const projects = [
    {
        title: "IoT-Based Tamper Detection & Prevention System",
        description: "Real-time edge security infrastructure utilizing sensor telemetry and event-driven logging to detect and prevent unauthorized hardware tampering.",
        tech: ["C++", "Sensors", "IoT", "Embedded"],
        color: "#6D28D9",
        bgFrame: "/frames/proj-1.jpg",
        bgOpacity: "opacity-40",
        link: "https://github.com/sai-kumar-277/IOT-Based-Tamper-Detection-and-Prevention-System"
    },
    {
        title: "Basic Flight Reservation System",
        description: "A console-based reservation engine handling booking workflows, seating allocations, and passenger manifesting.",
        tech: ["C++", "File I/O", "Data Structures"],
        color: "#2563EB", // Blue
        bgFrame: "/frames/proj-2.jpg",
        bgOpacity: "opacity-60",
        link: "https://github.com/sai-kumar-277/Basic-Flight-Reservation-System"
    },
    {
        title: "Basic Agricultural ChatBot",
        description: "An interactive CLI-based assistant designed to provide crop recommendations and agricultural advice based on predefined knowledge graphs.",
        tech: ["Python", "NLP", "Logic Rules"],
        color: "#059669", // Green
        bgFrame: "/frames/proj-3.jpeg",
        bgOpacity: "opacity-70",
        link: "https://github.com/sai-kumar-277/Basic-Agricutural-ChatBot"
    },
    {
        title: "Drone Delivery Website",
        description: "A front-end simulation interface for a drone logistics company, featuring dynamic payload tracking and delivery visualizations.",
        tech: ["HTML", "CSS", "JavaScript"],
        color: "#EAB308", // Yellow
        bgFrame: "/frames/proj-4.jpeg",
        bgOpacity: "opacity-40",
        link: "https://github.com/sai-kumar-277/drone-delivery-website"
    },
    {
        title: "Rock Paper Scissor Logic Engine",
        description: "A foundational game loop implementation demonstrating state management, randomized bot adversaries, and win-condition evaluations.",
        tech: ["Python", "Game Logic"],
        color: "#EF4444", // Red
        bgFrame: "/frames/proj-5.jpeg",
        bgOpacity: "opacity-40",
        link: "https://github.com/sai-kumar-277/rock-paper-scissor"
    },
    {
        title: "ML-Based Personalized Food Recommendation System",
        description: "Built a hybrid nutritional recommender processing 1,000+ items using Random Forest, Gradient Boosting, and health constraints.",
        tech: ["Python", "TensorFlow", "Scikit-Learn"],
        color: "#A855F7", // Purple
        bgFrame: "/frames/proj-6.jpg",
        bgOpacity: "opacity-40",
        link: "https://github.com/sai-kumar-277/ML-based-Food-Recommendation-System"
    }
];

export default function MechanicalCardDeck() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const rawProgress = useMotionValue(0);

    const smoothProgress = useSpring(rawProgress, {
        stiffness: 40,  // Drastically reduced for slow motion
        damping: 15,    // Smoother, less rigid landing
        restDelta: 0.001
    });

    useEffect(() => {
        rawProgress.set(activeIndex);
    }, [activeIndex, rawProgress]);

    const activeIndexRaw = smoothProgress;

    // Cursor 3D effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse to -1 ... 1
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;
            mouseX.set(x);
            mouseY.set(y);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const rotateY = useTransform(mouseX, [-1, 1], [-2, 2]);
    const rotateX = useTransform(mouseY, [-1, 1], [2, -2]);

    return (
        <section ref={containerRef} className="relative py-20 min-h-screen bg-transparent flex items-center overflow-hidden border-t border-white/[0.03]">
            <div className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Info & Controls */}
                <div className="relative z-20 flex flex-col justify-center">

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight mb-8">Flagship<br />Deployments</h2>

                    <p className="text-white/50 text-base md:text-lg font-light max-w-md mb-12">
                        Interact with the deck to survey the technical architecture of key implementations.
                    </p>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
                            disabled={activeIndex === 0}
                            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400 text-white disabled:opacity-30 disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all"
                            aria-label="Previous Project"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => setActiveIndex(Math.min(projects.length - 1, activeIndex + 1))}
                            disabled={activeIndex === projects.length - 1}
                            className="p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400 text-white disabled:opacity-30 disabled:hover:border-white/10 disabled:cursor-not-allowed transition-all"
                            aria-label="Next Project"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Deck Container with perspective */}
                <div className="relative w-full aspect-[4/3] perspective-[1200px] flex items-center justify-center">
                    {projects.map((project, i) => {
                        // We compute dynamic styles for each card based on its relative distance from 'active' index
                        return (
                            <Card
                                key={i}
                                project={project}
                                index={i}
                                activeIndexRaw={activeIndexRaw}
                                rotateY={rotateY}
                                rotateXTilt={rotateX}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// Sub-component for individual card physics
function Card({
    project, index, activeIndexRaw, rotateY, rotateXTilt
}: {
    project: any, index: number, activeIndexRaw: any, rotateY: any, rotateXTilt: any
}) {
    const [hovered, setHovered] = useState(false);

    // Distance relative to the active scroll progress. 
    // If diff = 0, it's the top card.
    // If diff > 0, it's underneath in the stack.
    // If diff < 0, it's outgoing (down and right).
    const distance = useTransform(activeIndexRaw, (v: number) => index - v);

    // Rotation Z logic: 
    // Top card (0) -> 0deg. Stacked cards (>0) -> index * 12deg. Outgoing (<0) -> increases to 48deg
    const zRotation = useTransform(distance, [-1, 0, 1, 2], [48, 0, 12, 24]);

    // X Rotation (Stack base): 4deg for stacked items, 0 for top.
    // Plus we optionally add cursor tilt if top.
    const baseRotateX = useTransform(distance, [-1, 0, 1], [0, 0, 4]);

    // Translations
    const transX = useTransform(distance, [-1, 0, 1, 2], [100, 0, 0, 0]);
    const transY = useTransform(distance, [-1, 0, 1, 2], [50, 0, 16, 32]);

    // Scaling
    const scale = useTransform(distance, [-1, 0, 0.5, 1, 2], [0.92, 1, 1.01, 0.95, 0.90]);

    // Blur & Opacity (Depth of field)
    const blurRaw = useTransform(distance, [-1, 0, 1, 2], [0, 0, 2, 4]);
    const opacity = useTransform(distance, [-1, 0, 1, 2], [0, 1, 0.9, 0.7]);

    // Make sure Z-index enforces top is highest. We use discrete values based on distance.
    const zIndex = useTransform(distance, (d: number) => {
        if (d < -0.5) return -10; // Sent to back
        return Math.round(100 - d * 10);
    });

    const filter = useTransform(blurRaw, (b: number) => `blur(${b}px)`);

    // Combine base transforms with optional 3D cursor tilt map (only applied strongly when distance near 0)
    const tiltFactor = useTransform(distance, [-0.5, 0, 0.5], [0, 1, 0]);
    const finalRotateX = useTransform(
        [baseRotateX, rotateXTilt, tiltFactor],
        ([base, tilt, factor]) => Number(base) + Number(tilt) * Number(factor)
    );

    const finalRotateY = useTransform(
        [rotateY, tiltFactor],
        ([tilt, factor]) => Number(tilt) * Number(factor)
    );

    return (
        <motion.div
            className="absolute inset-x-[-5%] inset-y-0 rounded-2xl overflow-hidden group cursor-pointer"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            style={{
                rotateZ: zRotation,
                rotateX: finalRotateX,
                rotateY: finalRotateY,
                x: transX,
                y: transY,
                scale,
                opacity,
                zIndex,
                filter,
                transformOrigin: "center bottom"
            }}
        >
            {/* Inner wrapper handles hover lift — isolated from motion value transforms above */}
            <div
                className="w-full h-full rounded-2xl bg-[#0F0518] shadow-[0_0_30px_rgba(0,0,0,0.8)] border border-white/10 p-6 md:p-8 flex flex-col justify-between overflow-hidden"
                style={{
                    transform: hovered ? "translateY(-6px) scale(1.015)" : "translateY(0px) scale(1)",
                    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
            >
            {/* Background Image Frame with Dark Overlay */}
            <div
                className={`absolute inset-0 z-0 ${project.bgOpacity || "opacity-20"} pointer-events-none mix-blend-screen ${project.bgSize || "bg-cover"} bg-center`}
                style={{ backgroundImage: `url(${project.bgFrame})` }}
            />
            {/* Dark vignette to ensure text remains readable */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0F0518] via-[#0F0518]/80 to-transparent pointer-events-none" />

            {/* Subtle internal gradient mapping to simulate light */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white-[0.05] pointer-events-none z-0" />

            {/* Hover Glow */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none mix-blend-screen"
                style={{ boxShadow: `inset 0 0 60px ${project.color}20, 0 0 30px ${project.color}40`, border: `1px solid ${project.color}60` }} />


            {/* Content block */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="space-y-4">
                    <div className="flex gap-3 flex-wrap">
                        {project.tech.map((t: string) => (
                            <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 font-mono">
                                {t}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-xl md:text-3xl font-semibold text-white tracking-tight leading-tight max-w-lg mt-4">{project.title}</h3>
                    <p className="text-sm md:text-base text-white/50 font-light mt-2 max-w-sm">{project.description}</p>
                </div>

                <div className="flex justify-start">
                    {/* Ghost button with Cyan hover acting as an external link */}
                    <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-white font-medium text-sm group/btn hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all duration-300"
                    >
                        View System
                        <ArrowUpRight className="w-4 h-4 text-white/60 group-hover/btn:text-cyan-400 transition-colors duration-300" />
                    </a>
                </div>
            </div>
            </div>
        </motion.div>
    );
}
