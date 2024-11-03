import React from "react";

const SkeletonCard = () => {
    return (
        <div className="p-4 bg-gray-700 text-white rounded-lg shadow-lg w-full animate-pulse">
            <div className="flex flex-col items-center">
                {/* Image Skeleton */}
                <div className="w-32 h-32 bg-gray-600 rounded-full mb-4"></div>

                {/* ID and Name Skeleton */}
                <div className="w-12 h-4 bg-gray-600 rounded-full mb-2"></div>
                <div className="w-20 h-6 bg-gray-600 rounded-full mb-4"></div>

                {/* Type Skeleton */}
                <div className="flex gap-2 mt-2">
                    <div className="w-16 h-6 bg-gray-600 rounded-full"></div>
                    <div className="w-16 h-6 bg-gray-600 rounded-full"></div>
                </div>

                {/* Stats Skeleton */}
                <div className="mt-4 w-full">
                    <div className="w-10 h-4 bg-gray-600 rounded-full mb-2"></div>
                    <div className="grid grid-cols-2 gap-1 text-sm">
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                        <div className="w-16 h-4 bg-gray-600 rounded-full mb-1"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkeletonCard;
