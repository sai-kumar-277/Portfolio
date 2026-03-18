"use client";

import { useEffect, useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";

interface Star {
    x: number;
    y: number;
    size: number;
    baseOpacity: number;
    velocity: number;
    phase: number;
    twinkleSpeed: number;
}

export default function NightSky() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Track mouse with high spring interpolation for soft, trailing reactiveness
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);

    const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        
        // Reset off-screen when mouse leaves
        const handleMouseLeave = () => {
            mouseX.set(-1000);
            mouseY.set(-1000);
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [mouseX, mouseY]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false }); // Optimization for opaque background
        if (!ctx) return;

        let stars: Star[] = [];
        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // The radius of interaction
        const HOVER_RADIUS = 150; 

        const init = () => {
            // Need devicePixelRatio for crisp sub-pixel rendering of tiny stars on high-res monitors
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            ctx.scale(dpr, dpr);

            stars = [];
            // Density relative to screen size. Very sparse for minimalistic feel.
            const numStars = Math.floor((width * height) / 12000); 

            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    size: Math.random() * 1.5 + 0.4, // Slightly larger base size
                    baseOpacity: Math.random() * 0.5 + 0.2, // Brighter base opacity
                    velocity: Math.random() * 0.05 + 0.01, // Barely drifting
                    phase: Math.random() * Math.PI * 2,
                    twinkleSpeed: Math.random() * 0.5 + 0.2
                });
            }
        };

        init();
        window.addEventListener("resize", init);

        const animate = () => {
            // Fill pitch black background
            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, width, height);

            const mX = smoothMouseX.get();
            const mY = smoothMouseY.get();
            const time = Date.now() / 1000;

            stars.forEach((star) => {
                // Extremely slow upward drift
                star.y -= star.velocity;
                if (star.y < 0) {
                    star.y = height;
                    star.x = Math.random() * width;
                }

                // Distance to soft-interpolated mouse
                const dx = star.x - mX;
                const dy = star.y - mY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Twinkle effect
                const twinkle = Math.sin(time * star.twinkleSpeed + star.phase);
                // Oscillation between 0.5 and 1.5
                const opacityMultiplier = 1 + twinkle * 0.5;

                let drawSize = star.size;
                let drawOpacity = Math.min(1, star.baseOpacity * opacityMultiplier);

                // Subtle hover effect logic
                if (distance < HOVER_RADIUS) {
                    // Normalize distance from 0 (center) to 1 (edge of radius)
                    const intensity = 1 - (distance / HOVER_RADIUS);
                    
                    // Slightly increase size (+0.5px maximum)
                    drawSize = star.size + (intensity * 0.8);
                    
                    // Slightly brighten
                    drawOpacity = Math.min(1, drawOpacity + (intensity * 0.4));
                }

                // Base continuous ambient glow to make them "shine" heavily
                let blur = drawSize * 4 + 3;
                let glowColor = `rgba(255, 255, 255, ${drawOpacity * 0.9})`;

                // Add interactive glow on hover
                if (distance < HOVER_RADIUS) {
                    const intensity = 1 - (distance / HOVER_RADIUS);
                    blur += 15 * intensity;
                    glowColor = `rgba(168, 85, 247, ${0.6 * intensity + drawOpacity * 0.3})`; // Stronger purple glow
                }

                ctx.shadowBlur = blur;
                ctx.shadowColor = glowColor;

                // Draw the star
                ctx.beginPath();
                ctx.arc(star.x, star.y, drawSize, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${drawOpacity})`;
                ctx.fill();

                // Reset shadow to avoid leaking into other draws
                ctx.shadowBlur = 0;
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", init);
            cancelAnimationFrame(animationFrameId);
        };
    }, [smoothMouseX, smoothMouseY]);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none -z-50"
            style={{ background: "#000" }}
        />
    );
}
