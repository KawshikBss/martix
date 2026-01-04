import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
} from "react";
import { ProductInterface } from "../interfaces/ProductInterface";

export interface CartItem {
    id: string;
    item: ProductInterface;
    quantity: number;
    price: number;
    tax: number;
    itemTotal: number;
}

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    totalUniqueItems: number;
    subTotal: number;
    taxTotal: number;
    cartTotal: number;
    isEmpty: boolean;
    inCart: (id: string) => boolean;
    getItem: (id: string) => CartItem | undefined;
    addItem: (newItem: ProductInterface, quantity?: number) => void;
    removeItem: (id: string) => void;
    updateItemQuantity: (id: string, increase?: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalUniqueItems, setTotalUniqueItems] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [taxTotal, setTaxTotal] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    const inCart = (id: string) => items.some((item) => item.id === id);

    const getItem = (id: string) => items.find((item) => item.id === id);

    const addItem = (newItem: ProductInterface, quantity?: number) => {
        quantity ??= 1;
        setItems((prev) => {
            const existing = prev.find((i) => i.id === newItem.id);

            if (!existing) {
                var price = Number(newItem.max_selling_price);
                var tax = Number(((newItem.tax_rate ?? 0) * price) / 100);
                var total = (price + tax) * quantity;
                return [
                    ...prev,
                    {
                        id: newItem.id,
                        item: newItem,
                        quantity,
                        price: newItem.max_selling_price,
                        tax: tax,
                        itemTotal: total,
                    },
                ];
            }

            return prev.map((item) =>
                item.id !== newItem.id
                    ? item
                    : {
                          ...item,
                          quantity: item.quantity + quantity,
                          itemTotal:
                              (item.price + item.tax) *
                              (item.quantity + quantity),
                      }
            );
        });
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id != id));
    };

    const updateItemQuantity = (id: string, increase?: number) => {
        increase ??= 1;
        var item = getItem(id);
        var newQuantity = Number((item?.quantity ?? 0) + increase);
        if (newQuantity <= 0) removeItem(id);
        else {
            var newItemTotal = Number(
                (Number(item?.price ?? 0) + Number(item?.tax ?? 0)) *
                    newQuantity
            );

            setItems((prev) =>
                prev.map((item) =>
                    item.id != id
                        ? item
                        : {
                              ...item,
                              quantity: newQuantity,
                              itemTotal: newItemTotal,
                          }
                )
            );
        }
    };

    const clearCart = () => setItems([]);

    useEffect(() => {
        setTotalItems(items.reduce((sum, i) => sum + i.quantity, 0));
        setTotalUniqueItems(items.length);
        setSubTotal(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
        setTaxTotal(items.reduce((sum, i) => sum + i.tax, 0));
        setCartTotal(items.reduce((sum, i) => sum + i.itemTotal, 0));
    }, [items]);

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                totalUniqueItems,
                subTotal,
                taxTotal,
                cartTotal,
                isEmpty: totalUniqueItems == 0,
                inCart,
                getItem,
                addItem,
                removeItem,
                updateItemQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
};
