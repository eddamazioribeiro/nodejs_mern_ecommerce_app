export const getCart = () => {
    let cart = [];
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
    }

    return cart;
}

export const updateItem = (productId, count) => {
    let cart = [];
    
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((p, i) => {
            if (p._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }

}

export const addItem = (item, next) => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

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
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }

    return 0;
}