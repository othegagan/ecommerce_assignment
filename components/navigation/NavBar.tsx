import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { getSession } from '@/lib/auth';
import { CircleUserRound, Search, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import BoxContainer from '../BoxContainer';
import { Button } from '../ui/button';
import LogoutButton from './LogoutButton';
import Menu from './Menu';
import SmallerMenu from './SmallerMenu';

export default async function Navbar() {
    const session = await getSession();
    return (
        <>
            <SmallerMenu />
            <header className='relative '>
                <BoxContainer>
                    <nav aria-label='Top'>
                        <div className=' pb-14 sm:px-0 sm:pb-0'>
                            <div className='flex h-16 items-center justify-between'>
                                {/* Logo */}
                                <div className='flex flex-1'>
                                    <Link href='/'>
                                        <span className='sr-only'>ecommerce logo</span>
                                        <h4 className='font-extrabold uppercase'>ecommerce </h4>
                                    </Link>
                                </div>

                                {/*  menus */}
                                <Menu />

                                <div className='flex flex-1 items-center justify-end gap-4'>
                                    {/* Search */}
                                    <Button variant='ghost' size='icon'>
                                        {' '}
                                        <Search className='h-6 w-6' />
                                    </Button>

                                    {/* Cart */}

                                    <Button variant='ghost' size='icon'>
                                        <ShoppingCart className='h-6 w-6 flex-shrink-0 ' />
                                        <span className='sr-only'>items in cart, view bag</span>
                                    </Button>

                                    {session.isLoggedIn && (
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <div className='flex items-center gap-2'>
                                                    <Button variant='ghost' size='icon' className='rounded-full bg-black/10'>
                                                        <CircleUserRound className='h-6 w-6 flex-shrink-0 ' />
                                                    </Button>
                                                    <span className='hidden md:block'>{session.name}</span>
                                                </div>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className='mt-2 w-48'>
                                                <p className='px-4 md:hidden'>Hi {session.name}</p>
                                                <DropdownMenuItem>
                                                    <LogoutButton />
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    )}
                                </div>
                            </div>
                        </div>
                    </nav>
                </BoxContainer>
            </header>
        </>
    );
}
