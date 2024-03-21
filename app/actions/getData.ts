'use server';

import axios from 'axios';
import { revalidatePath } from 'next/cache';

export async function getCategories() {
    try {
        // const session = await getSession();

        const url = `http://localhost:3000/api/categories?userId=821b89f7-dcd0-4bc1-bd65-470ed4e1e469`;
        const response: any = await axios.get(url);
        if (response.status === 200 && response.data.success === true) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Failed to fetch data.');
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateWishlist(payload: any) {
    try {
        // const session = await getSession();

        const response: any = await axios.post('http://localhost:3000/api/update-wishlist', payload);
        if (response.data.success) {
            revalidatePath('/categories');
        } else {
            // toast.error('Failed to fetch data');
        }
    } catch (error: any) {
        throw new Error(error.message);
    }
}
