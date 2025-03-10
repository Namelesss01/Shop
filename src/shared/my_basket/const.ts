// import { PRODUCTS_ITEMS } from "./const";
import { PRODUCTS_ITEMS } from "../product/const";
import MyBasketProps from "./type";

// Формируем MY_BASKET_ITEMS на основе PRODUCTS_ITEMS
export const MY_BASKET_ITEMS: MyBasketProps[] = PRODUCTS_ITEMS.map(
  ({ id, name, time, photoURLs, description, category }) => ({
    id,
    name,
    time,
    photoURLs: [photoURLs[0]], // Берем первое фото
    description,
    category,
  })
);
