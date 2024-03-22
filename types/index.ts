import { SessionOptions } from 'iron-session';

export interface SessionData {
    userId: string | null;
    email: string;
    name: string;
    isLoggedIn: boolean;
    isEmailVerified: boolean;
}

export const defaultSession: SessionData = {
    isLoggedIn: false,
    email: '',
    name: '',
    userId: null,
    isEmailVerified: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.SECRET_KEY!,
    cookieName: 'ecommerce-session',
    cookieOptions: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    },
};
