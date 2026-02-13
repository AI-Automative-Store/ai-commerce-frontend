'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

// Using a placeholder that mimics the dark Apple style aesthetic
// In a real app, this would be the actual asset
const BANNER_IMAGE = "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?q=80&w=2000&auto=format&fit=crop";

export function PromoBanner() {
    return (
        <div className="bg-black text-white w-full h-[344px] relative overflow-hidden mt-4 md:ml-10">
            <div className="absolute inset-0 bg-black">
                {/* Content Container */}
                <div className="h-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-10 relative z-10">

                    {/* Text Content */}
                    <div className="flex flex-col gap-5 max-w-sm pt-4 md:pt-0">
                        <div className="flex items-center gap-4">
                            <span className="text-5xl"></span>
                            <span className="text-sm font-light">iPhone 14 Series</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-semibold leading-tight tracking-wide">
                            Up to 10% <br /> off Voucher
                        </h2>

                        <Link
                            href="/shop"
                            className="flex items-center gap-2 mt-2 w-fit group border-b border-transparent hover:border-white transition-all pb-1"
                        >
                            <span className="font-medium">Shop Now</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Image Content */}
                    <div className="relative h-full w-full md:w-1/2 flex items-center justify-center mt-6 md:mt-0">
                        {/* Gradient glow effect behind phone */}
                        <div className="absolute w-[300px] h-[300px] bg-white/20 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

                        <div className="relative w-full h-[250px] md:h-[350px]">
                            {/* Using a standard Next.js Image with object-contain for the product */}
                            <Image
                                src={BANNER_IMAGE}
                                alt="iPhone 14 Promo"
                                fill
                                className="object-contain object-center z-10"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Carousel Indicators (Mock) */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500 cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/50 cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/50 cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/50 cursor-pointer"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-white/50 cursor-pointer"></div>
                </div>
            </div>
        </div>
    );
}
