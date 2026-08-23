import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useWishlist() {
    const { user } = useAuth();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    async function loadWishlist() {
        if (!user) {
            setWishlist([]);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from('wishlists')
            .select('product_id')
            .eq('user_id', user.id);

        if (error) {
            console.error('WISHLIST ERROR:', error);
        } else {
            setWishlist(
                data.map(item => item.product_id)
            );
        }

        setLoading(false);
    }

    useEffect(() => {
        loadWishlist();
    }, [user]);

    async function toggleWishlist(productId) {
        if (!user) {
            return {
                requiresLogin: true
            };
        }

        const exists = wishlist.includes(productId);

        if (exists) {
            const { error } = await supabase
                .from('wishlists')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', productId);

            if (error) throw error;

            setWishlist(
                wishlist.filter(id => id !== productId)
            );
        } else {
            const { error } = await supabase
                .from('wishlists')
                .insert({
                    user_id: user.id,
                    product_id: productId
                });

            if (error) throw error;

            setWishlist([
                ...wishlist,
                productId
            ]);
        }

        return {
            requiresLogin: false
        };
    }

    return {
        wishlist,
        loading,
        toggleWishlist,
        isInWishlist: productId =>
            wishlist.includes(productId)
    };
}