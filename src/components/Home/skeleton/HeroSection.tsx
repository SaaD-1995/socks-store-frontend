import React from "react";
const HeroSectionSkeleton: React.FC = () => {
  return (
    <> 
        <div role="status" className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center ">
            <div className="w-full">
                <div className="h-8 w-36 bg-quaternary rounded-full mb-6"></div>
                <div className="h-4 bg-quaternary rounded-full max-w-[400px] mb-3"></div>
                <div className="h-3 bg-quaternary rounded-full max-w-[350px] mb-3"></div>
                <div className="flex items-center gap-10 mt-5 mb-10">
                <div className="h-10 w-48 bg-quaternary rounded-full max-w-[440px] mb-3"></div>
                <div className="h-10 w-48 bg-quaternary rounded-full max-w-[460px] mb-3"></div>
                </div>
            </div>
            <div className="flex items-center justify-center w-48 h-80 rounded-2xl bg-quaternary sm:w-[500px] lg:w-[600px]">
                <svg className="w-11 h-11 text-fg-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"/></svg>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </>
  )
};
export default HeroSectionSkeleton;