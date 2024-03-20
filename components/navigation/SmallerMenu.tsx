import React from 'react';
import BoxContainer from '../BoxContainer';

export default function SmallerMenu() {
    return (
        <BoxContainer>
            <div className='flex h-9 items-center justify-end gap-4 px-6 text-xs font-light text-black'>
                <div>Help</div>
                <div>Orders & Returns</div>
                <div>Hi, John</div>
            </div>
        </BoxContainer>
    );
}
