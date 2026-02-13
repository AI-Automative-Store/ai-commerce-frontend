'use client';

import { ArrowRight } from 'lucide-react';

export function Newsletter() {
    return (
        <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 md:p-16 my-16 relative overflow-hidden">

            {/* Radial Gradient Effect */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-end justify-between gap-8">
                <div className="max-w-xl">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                        Ready to Get <br /> Our New Stuff?
                    </h2>
                    <div className="relative max-w-md">
                        <input
                            type="email"
                            placeholder="Your Email..."
                            className="w-full bg-white text-black pl-6 pr-32 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white/50"
                        />
                        <button className="absolute right-2 top-2 bottom-2 bg-black text-white px-6 rounded-full flex items-center gap-2 hover:bg-gray-900 transition-colors">
                            Send <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="mt-4 text-gray-400 text-xs">
                        Stuffus for Awesome and Needs. <br />
                        We'll listen to your needs, identify the best approach, and then create a bespoke smart EV charging solution that's right for you.
                    </p>
                </div>
            </div>
        </div>
    );
}
