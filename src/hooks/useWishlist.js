import { useEffect, useState } from 'react';

const STORAGE_KEY = 'moldlab-wishlist';

export function useWishlist() {
    const [wishlist, setWishlist] = useState(() => {
        try {
            const saved =
                localStorage.getItem(STORAGE_KEY);

            return saved
                ? JSON.parse(saved)
                : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(wishlist)
        );
    }, [wishlist]);

    function isInWishlist(id) {
        return wishlist.some(
            item =>
                String(item.id) === String(id)
        );
    }

    function toggleWishlist(product) {
        setWishlist(current => {
            const exists = current.some(
                item =>
                    String(item.id) ===
                    String(product.id)
            );

            if (exists) {
                return current.filter(
                    item =>
                        String(item.id) !==
                        String(product.id)
                );
            }

            return [
                ...current,
                product
            ];
        });
    }

    function removeFromWishlist(id) {
        setWishlist(current =>
            current.filter(
                item =>
                    String(item.id) !== String(id)
            )
        );
    }

    function clearWishlist() {
        setWishlist([]);
    }

    return {
        wishlist,
        isInWishlist,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist
    };
}