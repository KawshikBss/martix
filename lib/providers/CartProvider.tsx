import React, {
    createContext,
    ReactNode,
    useEffect,
    useState,
    useContext,
} from "react";
import { ProductInterface } from "../interfaces/ProductInterface";
import { SalesProduct, SalesVariant } from "../interfaces/SalesProduct";

export interface CartItem {
    inventory_id: number;
    product_id: number;
    name: string;
    image: string;
    variation: { option: string; value: string } | null;
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
    inCart: (inventoryId: number) => boolean;
    getItem: (inventoryId: number) => CartItem | undefined;
    addItem: (
        variant: SalesVariant,
        product: SalesProduct,
        quantity?: number
    ) => void;
    removeItem: (inventoryId: number) => void;
    updateItemQuantity: (inventoryId: number, delta: number) => void;

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

    const inCart = (inventoryId: number) =>
        items.some((i) => i.inventory_id === inventoryId);

    const getItem = (inventoryId: number) =>
        items.find((i) => i.inventory_id === inventoryId);

    const removeItem = (inventoryId: number) => {
        setItems((prev) => prev.filter((i) => i.inventory_id !== inventoryId));
    };

    const addItem = (
        variant: SalesVariant,
        product: SalesProduct,
        quantity: number = 1
    ) => {
        setItems((prev) => {
            const existing = prev.find(
                (i) => i.inventory_id === variant.inventory_id
            );

            const price = Number(variant.price);
            const tax = (Number(product.tax) * price) / 100;

            if (!existing) {
                return [
                    ...prev,
                    {
                        inventory_id: variant.inventory_id,
                        product_id: product.product_id,
                        name: product.name,
                        image: product.image,
                        variation: variant.variation,
                        quantity,
                        price,
                        tax,
                        itemTotal: (price + tax) * quantity,
                    },
                ];
            }

            const newQty = existing.quantity + quantity;

            return prev.map((item) =>
                item.inventory_id !== variant.inventory_id
                    ? item
                    : {
                          ...item,
                          quantity: newQty,
                          itemTotal: (item.price + item.tax) * newQty,
                      }
            );
        });
    };

    const updateItemQuantity = (inventoryId: number, delta: number) => {
        setItems(
            (prev) =>
                prev
                    .map((item) => {
                        if (item.inventory_id !== inventoryId) return item;

                        const newQty = item.quantity + delta;
                        if (newQty <= 0) return null;

                        return {
                            ...item,
                            quantity: newQty,
                            itemTotal: (item.price + item.tax) * newQty,
                        };
                    })
                    .filter(Boolean) as CartItem[]
        );
    };

    const clearCart = () => setItems([]);

    useEffect(() => {
        setTotalItems(items.reduce((sum, i) => sum + i.quantity, 0));
        setTotalUniqueItems(items.length);
        setSubTotal(items.reduce((sum, i) => sum + i.price * i.quantity, 0));
        setTaxTotal(items.reduce((sum, i) => sum + i.tax * i.quantity, 0));
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
