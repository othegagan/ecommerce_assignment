'use server';

import { SessionData, defaultSession, sessionOptions } from '@/types';
import { getIronSession, SessionOptions } from 'iron-session';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const getSession = async () => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    const sessionData = JSON.parse(JSON.stringify(session)) as SessionData;
    return sessionData;
};



export const updateSessoin = async (userData:any) => {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    session.isLoggedIn = true;
    session.email = userData.email;
    session.userId = userData.id;
    session.name = userData.name;
    //@ts-ignore
    await session.save();
};

export const logout = async () => {
    try {
        const session = await getIronSession<SessionData>(cookies(), sessionOptions);
        //@ts-ignore
        session.destroy();
        redirect('/login');
    } catch (error) {
        console.log(error);
    }
};