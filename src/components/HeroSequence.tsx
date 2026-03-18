"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";

const TOTAL_FRAMES = 168;

export default function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [loaded, setLoaded] = useState(0);
    const [images, setImages] = useState<HTMLImageElement[]>([]);

    // Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            const frameNum = i.toString().padStart(3, "0");
            img.src = `/frames/ezgif-frame-${frameNum}.jpg`;
            img.onload = () => {
                loadedCount++;
                setLoaded(loadedCount);
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate frame mapped to scroll. Wait until 30% scroll (when text is gone) before moving frames.
    const frameIndex = useTransform(smoothProgress, [0, 0.3, 1], [0, 0, TOTAL_FRAMES - 1]);

    const drawImage = useCallback((index: number) => {
        if (!canvasRef.current || images.length === 0) return;
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        const image = images[index];
        if (image && image.complete) {
            const canvas = canvasRef.current;
            const w = canvas.width;
            const h = canvas.height;
            const imgAspect = image.width / image.height;
            const canvasAspect = w / h;
            let drawW, drawH, drawX, drawY;

            if (canvasAspect > imgAspect) {
                drawW = w;
                drawH = w / imgAspect;
                drawX = 0;
                drawY = (h - drawH) / 2;
            } else {
                drawH = h;
                drawW = h * imgAspect;
                drawY = 0;
                drawX = (w - drawW) / 2;
            }

            ctx.clearRect(0, 0, w, h);
            ctx.globalAlpha = 1.0;
            ctx.drawImage(image, drawX, drawY, drawW, drawH);
        }
    }, [images]);

    // Handle Scroll Update
    useEffect(() => {
        return frameIndex.on("change", (latest) => {
            const index = Math.min(Math.floor(latest), TOTAL_FRAMES - 1);
            drawImage(index);
        });
    }, [frameIndex, drawImage]);

    // Handle Resize and init
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                // Removed the buggy ctx.scale(dpr, dpr) which was causing a double-zoom error.

                const index = Math.min(Math.floor(frameIndex.get()), TOTAL_FRAMES - 1);
                drawImage(index);
            }
        };

        if (loaded === TOTAL_FRAMES) {
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [loaded, drawImage, frameIndex]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-transparent">
            {/* Loading State */}
            {loaded < TOTAL_FRAMES && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
                    <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((loaded / TOTAL_FRAMES) * 100)}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                    </div>
                    <p className="mt-8 text-white/40 text-xs font-mono tracking-[0.2em] uppercase">
                        Initializing Core Systems [{Math.round((loaded / TOTAL_FRAMES) * 100)}%]
                    </p>
                </div>
            )}

            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Act I - Presence Text Overlay */}
                <motion.div
                    style={{
                        opacity: useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]),
                        y: useTransform(smoothProgress, [0, 0.25], [0, -100]),
                        scale: useTransform(smoothProgress, [0, 0.25], [1, 0.95])
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6"
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tighter text-center leading-none"
                        style={{ textShadow: '0 0 60px rgba(192, 132, 252, 0.4)' }}
                    >
                        Sai Kumar
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-6 text-lg md:text-xl text-primary max-w-2xl text-center font-light leading-relaxed flex flex-col gap-2"
                    >
                        <span>AI Systems Engineer &amp; B.Tech CSE</span>
                        <span className="text-white/60 text-sm md:text-lg">Designing Intelligent, Data-Driven Systems. SRM University.</span>
                    </motion.p>
                </motion.div>

                {/* Canvas below text */}
                <motion.canvas
                    ref={canvasRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        opacity: useTransform(smoothProgress, [0.25, 0.3], [0, 1]) // Solid color until text fades (0.25)
                    }}
                />

                {/* Gradient mask at the bottom to blend with next section */}
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none" />
            </div>
        </div>
    );
}
