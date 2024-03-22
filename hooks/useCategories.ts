'use client';
import { useEffect, useState } from 'react';
import { getSession } from '@/lib/auth';
import axios from 'axios';


export function useCategories() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    async function getCategories() {
        setLoading(true);
        setError(null);

        try {
            const session = await getSession();
            const url = `/api/categories?userId=${session.userId}`;
            const response = await axios.get(url);

            if (response.status === 200 && response.data.success === true) {
                setCategories(response.data.data);
            } else {
                setError(response.data.message || 'Failed to fetch categories.');
            }
        } catch (error: any) {
            setError(error.message || 'Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    }

    async function updateWishlist(payload: {}) {
        setLoading(true);
        setError(null);

        try {
            const response = await axios.post('/api/update-wishlist', payload);

            if (response.data.success) {
                getCategories();

                return response.data;
            } else {
                throw new Error(response.data.message || 'Failed to update wishlist.');
            }
        } catch (error: any) {
            setError(error.message || 'Failed to update wishlist.');
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        error,
        loading,
        updateWishlist,
        getCategories
    };
}
