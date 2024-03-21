'use client';

import { Button } from '@/components/ui/button';
// import { deleteMachineryData, getMachineryDataById } from '@/server/machineryData';
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import { Checkbox } from './ui/checkbox';
import ChecBoxComponent from './ChecBoxComponent';

export const columns: ColumnDef<any>[] = [
    {
        id: 'action',
        header: 'action',
        cell: ({ row }) => {
            const item = row.original;
            return (
                <div className='mx-auto flex justify-around gap-3'>
                    <ChecBoxComponent isWishlisted={item.isWishlisted} categoryId={item.id} />
                </div>
            );
        },
    },
    { accessorKey: 'name', header: ' name' },
];
