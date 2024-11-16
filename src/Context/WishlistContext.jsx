import React , {useState,createContext} from "react";

export const WishlistContext = createContext()

export const WishlistProvider= ({children}) =>{
    const [wishlistItems, setWishlistItems] = useState([])

    const addToWishlist =(item) =>{
        setWishlistItems([...wishlistItems,item])
    }

    const removeFromWishlist =(itemToRemove) =>{
        setWishlistItems(wishlistItems.filter((item)=> item!==itemToRemove))
    }
    return (
        <WishlistContext.Provider value={{addToWishlist,removeFromWishlist,setWishlistItems,wishlistItems}}>
            {children}
        </WishlistContext.Provider>
    )
}

