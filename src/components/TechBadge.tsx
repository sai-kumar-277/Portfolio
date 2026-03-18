"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Award, ShieldCheck } from "lucide-react";

interface TechBadgeProps {
    title: string;
    issuer: string;
    date: string;
    color: string;
    link: string;
    logoUrl?: string; // Optional logo image
    index: number;
}

export default function TechBadge({ title, issuer, date, color, link, logoUrl, index }: TechBadgeProps) {
    const [flipped, setFlipped] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.15, type: "spring", stiffness: 100 }}
            className="group relative w-full h-[340px]"
            style={{ perspective: "1500px" }}
        >
            <div
                className="w-full h-full relative cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
                onClick={() => setFlipped(f => !f)}
            >
                {/* --- FRONT SIDE --- */}
                <div
                    className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-transparent"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden"
                    }}
                >
                    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
                        {logoUrl ? (
                            <img 
                                src={logoUrl} 
                                alt={issuer} 
                                className="w-48 h-48 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] group-hover:drop-shadow-[0_0_35px_rgba(255,255,255,0.3)] transition-all duration-500 scale-110" 
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-6 w-full">
                                <div 
                                    className="p-6 rounded-full bg-white/5 border border-white/10"
                                    style={{ color: color, boxShadow: `0 0 30px ${color}40`, }}
                                >
                                    <ShieldCheck size={48} />
                                </div>
                                <h3 
                                    className="text-xl font-bold font-mono tracking-widest text-white/90 text-center uppercase break-words w-full" 
                                    style={{ textShadow: `0 0 10px ${color}50` }}
                                >
                                    {issuer}
                                </h3>
                            </div>
                        )}
                        <p className="absolute bottom-4 text-xs text-white/40 tracking-widest uppercase animate-pulse">
                            Click to Decrypt
                        </p>
                    </div>
                </div>

                {/* --- BACK SIDE --- */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 w-full h-full flex flex-col justify-between p-8 rounded-2xl bg-[#0F0518]/95 overflow-hidden cursor-pointer"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        boxShadow: `0 0 30px ${color}30, inset 0 0 40px ${color}20`,
                        border: `1px solid ${color}80`
                    }}
                >
                    {/* Glowing background gradient for back */}
                    <div 
                        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none z-0 mix-blend-screen"
                        style={{
                            background: `radial-gradient(circle at center, ${color} 0%, transparent 80%)`,
                        }}
                    />

                    {/* Top Section */}
                    <div className="relative z-10 flex justify-between items-start mb-6">
                        <div 
                            className="p-3 rounded-xl bg-white/5 border border-white/10"
                            style={{ color: color }}
                        >
                            <Award size={24} />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-white/50 tracking-wider">
                                STATUS: <span className="text-green-400">VERIFIED</span>
                            </span>
                            <ExternalLink size={16} className="text-white hover:text-cyan-300 transition-colors" />
                        </div>
                    </div>

                    {/* Content Details */}
                    <div className="relative z-10 flex-grow flex flex-col justify-center">
                        <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: color }}>
                            {issuer}
                        </p>
                        <h3 className="text-lg md:text-xl font-semibold text-white tracking-tight leading-snug">
                            {title}
                        </h3>
                    </div>
                    
                    {/* Data readout style footer */}
                    <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Issued</span>
                            <span className="text-sm text-white/80 font-mono mt-1">{date}</span>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">ID</span>
                            <span className="text-sm text-white/60 font-mono mt-1">#0{index + 1}</span>
                        </div>
                    </div>
                </a>
            </div>
        </motion.div>
    );
}
