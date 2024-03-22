'use client';
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { toast, useToast } from './ui/use-toast';
import { getSession } from '@/lib/auth';
import { useCategories } from '@/hooks/useCategories';
import { useRouter } from 'next/navigation';

interface CheckBoxComponentProps {
    categoryId: string;
    isWishlisted: boolean;
}

export default function CheckBoxComponent({ categoryId, isWishlisted }: CheckBoxComponentProps) {
    const { updateWishlist, getCategories } = useCategories();
    const [isChecked, setIsChecked] = useState(isWishlisted);
    const { toast } = useToast();
    const router = useRouter();

    async function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
        try {
            const newValue = event.target.checked;
            const session = await getSession();
            const payload = {
                userId: session.userId,
                categoryId: categoryId,
                action: newValue ? 'add' : 'remove',
            };
            const response: any = await updateWishlist(payload);
            toast({
                duration: 2000,
                description: 'Category Updated.',
            });
            window.location.reload();
            setIsChecked(newValue);
            getCategories();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <input type='checkbox' className='scale-125 cursor-pointer rounded-md accent-black dark:accent-current' checked={isChecked} onChange={handleCheckboxChange} />
        </div>
    );
}
