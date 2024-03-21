'use client';
import { cn } from '@/lib/utils';
import React from 'react';

interface FormErrorProps {
    message: string | undefined | any;
    className?: string;
}

const FormError: React.FC<FormErrorProps> = ({ message, className }) => {
    return <p className={cn(className, 'text-xs font-medium text-red-500')}>{message}</p>;
};

export default FormError;
