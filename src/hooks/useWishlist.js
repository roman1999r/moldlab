// import { useEffect, useState } from 'react';
//
// const STORAGE_KEY = 'moldlab-wishlist';
//
// export function useWishlist() {
//     const [wishlist, setWishlist] = useState(() => {
//         try {
//             const saved =
//                 localStorage.getItem(STORAGE_KEY);
//
//             return saved
//                 ? JSON.parse(saved)
//                 : [];
//         } catch {
//             return [];
//         }
//     });
//
//     useEffect(() => {
//         localStorage.setItem(
//             STORAGE_KEY,
//             JSON.stringify(wishlist)
//         );
//     }, [wishlist]);
//
//     function isInWishlist(id) {
//         return wishlist.some(
//             item =>
//                 String(item.id) === String(id)
//         );
//     }
//
//     function toggleWishlist(product) {
//         setWishlist(current => {
//             const exists = current.some(
//                 item =>
//                     String(item.id) ===
//                     String(product.id)
//             );
//
//             if (exists) {
//                 return current.filter(
//                     item =>
//                         String(item.id) !==
//                         String(product.id)
//                 );
//             }
//
//             return [
//                 ...current,
//                 product
//             ];
//         });
//     }
//
//     function removeFromWishlist(id) {
//         setWishlist(current =>
//             current.filter(
//                 item =>
//                     String(item.id) !== String(id)
//             )
//         );
//     }
//
//     function clearWishlist() {
//         setWishlist([]);
//     }
//
//     return {
//         wishlist,
//         isInWishlist,
//         toggleWishlist,
//         removeFromWishlist,
//         clearWishlist
//     };
// }


import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function useWishlist() {
    const { user } = useAuth();

    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadWishlist = useCallback(async () => {
        if (!user) {
            setWishlist([]);
            return;
        }

        setLoading(true);

        const { data, error } = await supabase
            .from('wishlists')
            .select(`
        id,
        product_id,
        selected_size,
        created_at,
        products (*)
    `)
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });

        console.log(
            '❤️ WISHLIST SIZES:',
            (data || []).map(item => ({
                wishlistId: item.id,
                productId: item.product_id,
                selected_size: item.selected_size,
                product: item.products
            }))
        );

        if (error) {
            console.error('Wishlist loading error:', error);
            setWishlist([]);
        } else {
            const wishlistItems = (data || [])
                .map((item) => {
                    console.log('🔄 MAPPING WISHLIST ITEM:', item);

                    if (!item.products) {
                        console.log('❌ NO PRODUCT FOR:', item.product_id);
                        return null;
                    }

                    return {
                        ...item.products,
                        wishlistId: item.id,
                        selectedSize: item.selected_size
                            ? String(item.selected_size)
                            : null,
                    };
                })
                .filter(Boolean);

            console.log('✅ FINAL WISHLIST:', wishlistItems);

            setWishlist(wishlistItems);
        }

        setLoading(false);
    }, [user]);

    useEffect(() => {
        loadWishlist();
    }, [loadWishlist]);

    function isInWishlist(id, selectedSize) {
        const normalizedSize =
            selectedSize !== null &&
            selectedSize !== undefined &&
            selectedSize !== ''
                ? String(selectedSize)
                : null;

        return wishlist.some(
            (item) =>
                String(item.id) === String(id) &&
                item.selectedSize === normalizedSize
        );
    }

    async function toggleWishlist(product, selectedSize) {
        if (!user || !selectedSize) return;

        const normalizedSize = String(selectedSize);

        const exists = isInWishlist(
            product.id,
            normalizedSize
        );

        if (exists) {
            const { error } = await supabase
                .from('wishlists')
                .delete()
                .eq('user_id', user.id)
                .eq('product_id', product.id)
                .eq('selected_size', normalizedSize);

            if (error) {
                console.error(
                    'Wishlist delete error:',
                    error
                );
                return;
            }
        } else {
            const { error } = await supabase
                .from('wishlists')
                .insert({
                    user_id: user.id,
                    product_id: product.id,
                    selected_size: normalizedSize,
                });

            if (error) {
                console.error(
                    'Wishlist insert error:',
                    error
                );
                return;
            }
        }

        await loadWishlist();
    }

    async function removeFromWishlist(id, selectedSize) {
        if (!user) return;

        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('user_id', user.id)
            .eq('product_id', id)
            .eq('selected_size', selectedSize);

        if (error) {
            console.error(
                'Wishlist remove error:',
                error
            );
            return;
        }

        await loadWishlist();
    }

    async function clearWishlist() {
        if (!user) return;

        const { error } = await supabase
            .from('wishlists')
            .delete()
            .eq('user_id', user.id);

        if (error) {
            console.error('Wishlist clear error:', error);
            return;
        }

        setWishlist([]);
    }

    return {
        wishlist,
        loading,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        refreshWishlist: loadWishlist,
    };
}