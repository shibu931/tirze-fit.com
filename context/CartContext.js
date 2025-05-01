'use client'
import { useLocale } from "next-intl";
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productTotal, setProductTotal] = useState(0);
  const locale  = useLocale()

  const fetchCart = async () => {
    try {
      const localCart = await JSON.parse(localStorage.getItem("cart")) || null;
      setCart(localCart);
    } catch (error) {
      console.error("Error fetching cart from localStorage:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add item to cart
  const addToCart = (item) => {
    const currentTime = new Date().toISOString();

    if (!cart) {
      const newCart = {
        item: [{ ...item, quantity: item.quantity || 1 }],
        deliveryCharges: 25,
        discount:0,
        couponDiscount:0,
        modifiedTime: currentTime,
      };
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return;
    }

    const existingProductIndex = cart.item.findIndex(
      (cartItem) => cartItem.productId === item.productId
    );

    let updatedCart;
    if (existingProductIndex > -1) {
      updatedCart = {
        ...cart,
        item: cart.item.map((cartItem, index) =>
          index === existingProductIndex
            ? {
              ...cartItem,
              quantity: cartItem.quantity + (item.quantity || 1),
            }
            : cartItem
        ),
        modifiedTime: currentTime,
      };
    } else {
      updatedCart = {
        ...cart,
        item: [...cart.item, { ...item, quantity: item.quantity || 1 }],
        modifiedTime: currentTime,
      };
    }

    // Update the localStorage and state
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    const updatedCart = {
      ...cart,
      item: cart.item.filter((item) => item.productId !== productId),
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    if (updatedCart.item.length == 0) setCart(null)
    else setCart(updatedCart);
  };

  // Update item quantity
  const updateCartItemQuantity = (productId, quantity) => {
    
    const updatedCart = {
      ...cart,
      item: cart.item.map((item) => 
        item.productId === productId ? { ...item, quantity } : item
      ),
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart(null);
    localStorage.removeItem("cart");
  };

  const calculateCartTotal = (cart) => {
    if (!cart || !cart.item || cart.item.length === 0) {
      setProductTotal(0);
      return;
    }
  
    const total = cart.item.reduce((total, item) => {
      const productPrice = locale === 'en' ? item.productPriceEn : item.productPricePl;
      return total + productPrice * parseInt(item.quantity);
    }, 0);
  
    setProductTotal(total);
  };
  
  useEffect(() => {
    calculateCartTotal(cart);
  }, [cart, locale]); 

  useEffect(() => {    
    fetchCart();
  },[]);

  useEffect(() => {
    if (cart) {
      const updatedCart = {
        ...cart,
        modifiedAt: new Date().toISOString(), 
      };
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        setCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        productTotal,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);