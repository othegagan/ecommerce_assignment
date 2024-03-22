'use client';
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { updateWishlist } from '@/app/actions/getData';
import { toast, useToast } from './ui/use-toast';

interface CheckBoxComponentProps {
    categoryId: string;
    isWishlisted: boolean;
}

export default function CheckBoxComponent({ categoryId, isWishlisted }: CheckBoxComponentProps) {
    const [isChecked, setIsChecked] = useState(isWishlisted);
    const { toast } = useToast();

    async function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            const newValue = event.target.checked;
            const payload = {
                userId: '821b89f7-dcd0-4bc1-bd65-470ed4e1e469',
                categoryId: categoryId,
                action: newValue ? 'add' : 'remove',
            };
            const response: any = await updateWishlist(payload);
            toast({
                duration:3000,
                description: 'Category Updated.',
            });
            setIsChecked(newValue);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input type='checkbox' className='scale-125 cursor-pointer rounded-md accent-black' checked={isChecked} onChange={handleCheckboxChange} />
        </div>
    );
}
