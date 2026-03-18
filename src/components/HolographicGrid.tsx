"use client";

import { motion } from "framer-motion";
import TechBadge from "./TechBadge";

const certs = [
    {
        title: "Oracle Certified Professional: Java SE 17 Developer",
        issuer: "Oracle",
        date: "March 17, 2026",
        color: "#F58220", // Oracle Red/Orange
        link: "/certifications/java_cert.pdf",
        logoUrl: "/certifications/oracle_logo.svg"
    },
    {
        title: "Salesforce Developer with Agentblazer Champion",
        issuer: "Smartbridge & Salesforce",
        date: "August 25, 2025",
        color: "#00A1E0", // Salesforce Blue
        link: "https://drive.google.com/file/d/1Xvt1fPIkeVQ2WTNMSgk5e_H9f7lpjgFJ/view?usp=sharing",
        logoUrl: "/certifications/salesforce_logo.svg"
    },
    {
        title: "VR and AI Workshop",
        issuer: "GFG Campus Body, SRMUAP",
        date: "January 26, 2026",
        color: "#2F8D46", // GFG Green
        link: "/certifications/vr_ai_cert.pdf",
        logoUrl: "/certifications/gfg_logo.svg"
    }
];

export default function HolographicGrid() {
    return (
        <section className="relative py-20 bg-transparent flex flex-col justify-center overflow-hidden border-t border-white/[0.03] z-20">
            {/* Background structural elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Section Header */}
                <div className="mb-16">

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight">
                        Verified<br />Certifications
                    </h2>
                    <p className="text-white/50 text-sm md:text-base font-light max-w-lg mt-6">
                        Access granted. The following credentials form the verified backbone of security and systemic engineering capabilities.
                    </p>
                </div>

                {/* The Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certs.map((cert, index) => (
                        <TechBadge
                            key={index}
                            title={cert.title}
                            issuer={cert.issuer}
                            date={cert.date}
                            color={cert.color}
                            link={cert.link}
                            logoUrl={cert.logoUrl}
                            index={index}
                        />
                    ))}
                </div>

            </div>
            
            {/* Bottom scanning laser */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-cyan-400 blur-sm w-32"
                    animate={{
                        x: ['-200%', '100vw', '-200%']
                    }}
                    transition={{
                        duration: 8,
                        ease: "linear",
                        repeat: Infinity
                    }}
                />
            </div>
        </section>
    );
}
