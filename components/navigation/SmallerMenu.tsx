import { getSession } from '@/lib/auth';
import Link from 'next/link';
import BoxContainer from '../BoxContainer';

export default async function SmallerMenu() {
    const session = await getSession();

    return (
        <BoxContainer>
            <div className='flex h-9 items-center justify-end gap-4 px-6 text-xs font-light '>
                <div>Help</div>
                <div>Orders & Returns</div>
                {!session.isLoggedIn && <Link href='/login'>Login</Link>}
            </div>
        </BoxContainer>
    );
}
