import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

export default function Banner() {
    return (
        <div className='flex h-9 items-center justify-center gap-4 bg-[#F4F4F4] text-center text-sm font-medium text-black'>
            <span>
                <ChevronLeft  className='text-black/80' />
            </span>{' '}
            Get 10% off on business sign up
            <span>
                <ChevronRight  className='text-black/80'/>
            </span>
        </div>
    );
}
