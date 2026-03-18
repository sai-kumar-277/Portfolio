"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Terminal, FileText } from "lucide-react";

export default function FooterCTA() {
    return (
        <section className="relative min-h-screen bg-transparent flex flex-col items-center justify-center overflow-hidden border-t border-white/[0.05]">

            {/* Dynamic Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#A855F7] rounded-[100%] blur-[180px] opacity-[0.15] pointer-events-none" />

            <div className="z-10 text-center max-w-4xl px-6">


                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter leading-tight"
                    style={{ textShadow: "0 0 80px rgba(168, 85, 247, 0.4)" }}
                >
                    Let's Build <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40">
                        Intelligent Systems.
                    </span>
                </motion.h2>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <a 
                        href="mailto:saikumar72727@gmail.com"
                        className="px-8 py-4 rounded-full bg-white text-black font-semibold text-base hover:scale-105 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] border border-transparent hover:border-cyan-300 relative overflow-hidden group"
                    >
                        <span className="relative z-10">Initiate Contact</span>
                        <div className="absolute inset-0 bg-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
                    </a>

                    <a 
                        href="https://github.com/sai-kumar-277" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-cyan-400 text-white font-medium text-base transition-all duration-300 backdrop-blur-md flex items-center gap-3 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                    >
                        <Terminal className="w-5 h-5 text-white/50 group-hover:text-cyan-400 transition-colors" />
                        View Architecture Docs
                    </a>

                    <a 
                        href="https://drive.google.com/file/d/1hCnV9fyCUxpp8qh11E8q0e55Ud-IiKkH/view?usp=sharing" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group px-8 py-4 rounded-full bg-white/[0.03] border border-white/10 hover:border-purple-400 text-white font-medium text-base transition-all duration-300 backdrop-blur-md flex items-center gap-3 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                    >
                        <FileText className="w-5 h-5 text-white/50 group-hover:text-purple-400 transition-colors" />
                        View Resume
                    </a>
                </motion.div>
            </div>

            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute bottom-12 w-full px-12 flex flex-col md:flex-row justify-between items-center z-10 text-white/40 text-sm font-light gap-6"
            >
                <p>© {new Date().getFullYear()} Sai Kumar. All Systems Operational.</p>

                <div className="flex gap-8">
                    <a href="mailto:saikumar72727@gmail.com" className="hover:text-white hover:scale-110 transition-all"><Mail size={20} /></a>
                    <a href="https://github.com/sai-kumar-277" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><Github size={20} /></a>
                    <a href="https://www.linkedin.com/in/gottipilli-sai-kumar" target="_blank" rel="noopener noreferrer" className="hover:text-white hover:scale-110 transition-all"><Linkedin size={20} /></a>
                </div>
            </motion.footer>
        </section>
    );
}
