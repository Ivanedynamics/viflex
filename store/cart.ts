import { defineStore } from "pinia";
import type { IFrontProduct } from "~/types/front";
import { v4 as uuidv4 } from "uuid";
import { handleOpenCart } from "~/composables/drawer";
import type { IColor, IMeasure, IPresentation } from "~/server/api/models";
export type IProductCart = {
  quantity: number;
  product: IFrontProduct;
  id?: string;
  selection: {
    presentacion: IPresentation;
    medida: IMeasure;
    color: IColor;
  };
};
export type IProductOmitQ = Omit<IProductCart, "quantity" | "id">;
type Props = {
  products: IProductCart[];
  showCart: boolean;
};

export const useCartStore = defineStore("cart-store", {
  state: (): Props => {
    return {
      products: [],
      showCart: false,
    };
  },
  getters: {
    totalCart(state) {
      return 0;
    },
    productCart: (state) => state?.products,
    totalProductsInCart: (state) => state?.products?.length,
    getShowCart: (state) => state?.showCart,
  },
  actions: {
    OpenModalCart() {
      this.showCart = true;
    },
    CloseModalCart() {
      this.showCart = false;
    },
    setState(state: Props) {
      this.products = state?.products;
      this.showCart = state?.showCart;
    },
    existThisProductInCart(id: string | undefined) {
      return this.products?.some((e) => e?.id === id);
    },
    decreaseProduct(id: string | undefined) {
      const p = this.products?.find((e) => e?.id === id);
      const decrease = Number(p?.quantity) - 1;
      if (decrease < 1) {
        this.products = this.products.filter((e) => e?.id !== id);
        return;
      }
      this.products = this.products.map((e) =>
        e?.id === id ? { ...e, quantity: Number(e?.quantity) - 1 } : e
      );
      return;
    },
    incrementProduct(id: string | undefined) {
      this.products = this.products.map((e) =>
        e?.id === id ? { ...e, quantity: Number(e?.quantity) + 1 } : e
      );
      return;
    },
    handleReset() {
      this.products = [];
      this.showCart = false;
    },
    setProduct(newProduct: Omit<IProductCart, "quantity">) {
      if (
        this.products?.find(
          (e) =>
            e?.product?.id === newProduct?.product?.id &&
            e?.selection?.color?.id === newProduct?.selection?.color?.id &&
            e?.selection?.medida?.id === newProduct?.selection?.medida?.id &&
            e?.selection?.presentacion?.id ===
              newProduct?.selection?.presentacion?.id
        )
      ) {
        this.products = this?.products?.map((e) => {
          if (e?.product?.id === newProduct?.product?.id) {
            return {
              ...e,
              quantity: e?.quantity + 1,
            };
          }
          return e;
        });

        this.showCart = true;
        handleOpenCart();
        return;
      }

      this.products = [
        {
          ...newProduct,
          id: uuidv4(),
          quantity: 1,
        },
        ...this.products,
      ];

      this.showCart = true;
      handleOpenCart();
      return;
    },
    deleteProduct(id?: string) {
      this.products = this.products?.filter((e) => e?.id !== id);
      return;
    },
  },
});
