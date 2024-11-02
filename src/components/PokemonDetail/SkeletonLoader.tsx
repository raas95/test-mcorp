import React from "react";

const SkeletonLoader = () => (
    <div className="container mx-auto p-4 max-w-5xl animate-pulse">
        <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <div className="w-[200px] h-[200px] rounded-full bg-gray-300"></div>
            <div className="flex-1 space-y-4">
                <div className="h-8 w-1/3 bg-gray-300 rounded-md"></div>
                <div className="h-6 w-1/4 bg-gray-300 rounded-md"></div>
                <div className="flex gap-2">
                    <div className="h-8 w-16 bg-gray-300 rounded-full"></div>
                    <div className="h-8 w-16 bg-gray-300 rounded-full"></div>
                </div>
            </div>
            <div className="w-full md:w-1/2 bg-gray-300 h-40 rounded-lg"></div>
        </div>
        <div className="space-y-4">
            <div className="h-8 w-1/4 bg-gray-300 rounded-md"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-10 bg-gray-300 rounded-md"></div>
                ))}
            </div>
        </div>
    </div>
);

export default SkeletonLoader;
