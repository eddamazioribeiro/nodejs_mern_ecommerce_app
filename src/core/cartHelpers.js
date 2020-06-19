export const getLocalStorageItem = (itemName) => {
    let item = [];
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem(itemName)) {
            item = JSON.parse(localStorage.getItem(itemName));
        }
    }

    return item;
}

export const getCart = () => {
    let cart = getLocalStorageItem('cart');

    return cart ? cart : 'undefined';
}

export const updateItem = (productId, count) => {
    let cart = getCart();

    if (cart) {
        cart.map((p, i) => {
            if (p._id === productId) {
                cart[i].count = count;
            }
        });
    
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}

export const addItem = (item, next) => {
    let cart = getCart();

    if (cart) {
        cart.push({...item,
            count: 1
        });
    
        cart = Array.from(new Set(cart.map((p) => (p._id))))
            .map((id) => {
                return cart.find(p => p._id === id);
            });
    
        localStorage.setItem('cart', JSON.stringify(cart));
    
        next();
    }
}

export const itemTotal = () => {
    let cartLength = getCart() ? getCart().length : 0;

    return cartLength;
}