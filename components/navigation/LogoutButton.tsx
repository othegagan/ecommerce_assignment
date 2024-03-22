import { logout } from '@/lib/auth';
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    return (
        <>
            <form action={logout}>
                <button type='submit' className='flex items-center gap-2 text-sm font-medium'>
                    <LogOut /> Logout
                </button>
            </form>
        </>
    );
}
