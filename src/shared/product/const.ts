import first from "@/assets/img/image.jpg";
import second from "@/assets/img/image-1.jpg";
import third from "@/assets/img/image-2.jpg";
import fourth from "@/assets/img/image-3.jpg";
import fifth from "@/assets/img/image-4.jpg";
import sixth from "@/assets/img/image-5.jpg";
import seventh from "@/assets/img/image-6.jpg";
import eighth from "@/assets/img/image-7.jpg";
import ProductProps from "./type";

export const PRODUCTS_ITEMS: ProductProps[] = [
  {
    id: 1,
    name: "Куртка кожаная",
    time: "Сегодня 21:31",
    photoURLs: [first, second, third, fourth, fifth, sixth, seventh, eighth],
    description: "Модная мужская куртка из натуральной кожи. Размеры: M, L, XL",
    category: "Мужской", // Категория товара
  },
  {
    id: 2,
    name: "Платье вечернее",
    time: "Сегодня 22:00",
    photoURLs: [first, second, third, fourth, fifth, sixth, seventh, eighth],
    description: "Элегантное вечернее платье для женщин.",
    category: "Женский", // Категория товара
  },
  {
    id: 3,
    name: "Игрушка для детей",
    time: "Сегодня 22:15",
    photoURLs: [first, second, third, fourth, fifth, sixth, seventh, eighth],
    description: "Игрушка для детей младшего возраста.",
    category: "Детский", // Категория товара
  },
];
