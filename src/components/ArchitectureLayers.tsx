"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Brain, Database, Layers, TerminalSquare } from "lucide-react";

const capabilities = [
    {
        title: "Intelligence Layer",
        description: "Adaptive ML models and NLP engines (Python, TensorFlow, Scikit-Learn) driving dynamic, context-aware user experiences.",
        icon: Brain,
        gradient: "from-purple-600/20 to-transparent",
    },
    {
        title: "Data Layer",
        description: "High-throughput data pipelines and robust database management (MySQL, PostgreSQL) ensuring reliable telemetry.",
        icon: Database,
        gradient: "from-blue-600/20 to-transparent",
    },
    {
        title: "Architecture Layer",
        description: "Scalable microservices (Java, C++) and CRM automations (Salesforce Flows, Apex) designed for business logic.",
        icon: Layers,
        gradient: "from-indigo-600/20 to-transparent",
    },
    {
        title: "Interface Layer",
        description: "High-performance front-end experiences (JavaScript, React, Tailwind) engineered with interactive precision. UI/UX design workflows using Figma — wireframes, prototypes, and design systems.",
        icon: TerminalSquare,
        gradient: "from-[#A855F7]/20 to-transparent",
    }
];

export default function ArchitectureLayers() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const y2 = useTransform(scrollYProgress, [0, 1], [140, -140]);
    const y3 = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const y4 = useTransform(scrollYProgress, [0, 1], [180, -180]);

    const yTransforms = [y1, y2, y3, y4];

    return (
        <section ref={containerRef} className="relative py-10 min-h-[90vh] bg-transparent flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.03]">

            <div className="text-center mb-8 z-10 w-full max-w-4xl px-4">

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl md:text-4xl font-semibold text-white tracking-tight"
                >
                    4-Layer Capability System
                </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl w-full px-4 z-10">
                {capabilities.map((cap, i) => (
                    <motion.div
                        key={i}
                        style={{ y: yTransforms[i] }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02, y: -5 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className="group relative p-4 md:p-6 rounded-2xl bg-white/[0.015] border border-white/[0.04] hover:border-primary/30 backdrop-blur-xl overflow-hidden shadow-2xl shadow-black/40 cursor-crosshair"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${cap.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

                        {/* Hover glow ring */}
                        <div className="absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/30 via-transparent to-transparent pointer-events-none" style={{ maskImage: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude', padding: '1px' }} />

                        <div className="p-3 rounded-lg bg-white/[0.03] inline-block mb-4 group-hover:bg-primary/20 transition-colors duration-500 shadow-inner group-hover:shadow-[0_0_20px_rgba(192,132,252,0.4)]">
                            <cap.icon className="w-5 h-5 text-white/70 group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                        </div>

                        <h3 className="text-lg md:text-xl font-medium text-white mb-2 tracking-tight group-hover:text-primary-glow transition-colors">{cap.title}</h3>
                        <p className="text-white/50 text-xs md:text-sm leading-relaxed font-light group-hover:text-white/80 transition-colors">{cap.description}</p>

                        <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 scale-x-0 group-hover:scale-x-100" />
                    </motion.div>
                ))}
            </div>

            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-primary blur-[150px] opacity-[0.05] pointer-events-none" />
        </section>
    );
}
