import React from 'react';
import BoxContainer from '../BoxContainer';
import { getSession } from '@/lib/auth';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import LogoutButton from './LogoutButton';

export default async function SmallerMenu() {
    const session = await getSession();
    if (!session.isLoggedIn) {
        return (
            <>
                <BoxContainer>
                    <div className='flex h-9 items-center justify-end gap-4 px-6 text-xs font-light text-black'>
                        <div>Help</div>
                        <div>Orders & Returns</div>
                        <Link href='/login'>Login</Link>
                    </div>
                </BoxContainer>
            </>
        );
    }
    return (
        <BoxContainer>
            <div className='flex h-9 items-center justify-end gap-4 px-6 text-xs font-light text-black'>
                <div>Help</div>
                <div>Orders & Returns</div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>Hi, {session.name} </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='mt-2 w-48'>
                        <DropdownMenuItem>
                            <LogoutButton />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </BoxContainer>
    );
}
