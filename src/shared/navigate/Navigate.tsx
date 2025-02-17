import React from "react";
import { Button } from "../../components/ui/button";

interface NavigateProps {
  setSelectedCategory: (category: string) => void; // Функция для установки категории
}

const Navigate = ({ setSelectedCategory }: NavigateProps) => {
  const categories = ["Все", "Женские", "Мужские", "Детские"];

  return (
    <div className="flex space-x-2 mt-4">
      {categories.map((category) => (
        <Button
          key={category}
          className="rounded-3xl ml-2 px-4 py-2 transition-colors"
          onClick={() => setSelectedCategory(category)} // Обновляем категорию
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Navigate;
