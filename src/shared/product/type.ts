export default interface ProductProps {
  name: string;
  time: string;
  id: number;
  photoURLs: string[]; // Обновим это для массива изображений
  description: string;
  category: string; // Добавляем категорию
}
