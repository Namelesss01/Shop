import React, { useState } from "react";
import { Button } from "../../components/ui/button"; // Используем вашу кнопку
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore"; // Импортируем функции для работы с Firebase
import { storage } from "../../firebase/config"; // Импортируем Firebase Storage
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Для работы с Firebase Storage

const AddFile = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Мужской");
  const [photoURLs, setPhotoURLs] = useState<string[]>([]); // Для хранения ссылок на фото
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]); // Для хранения URL-ов предварительного просмотра
  const [isLoading, setIsLoading] = useState(false);

  // Обработчик изменения для фото
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileUrls: string[] = [];
      const filePreviews: string[] = [];

      for (const file of Array.from(files)) {
        // Используем FileReader для предварительного просмотра
        const reader = new FileReader();
        reader.onloadend = async () => {
          filePreviews.push(reader.result as string); // Добавляем предварительный просмотр

          // Создаем уникальный путь для каждой фотографии с ID товара
          const productId = productId.toLowerCase().replace(/\s+/g, "-"); // Используем название продукта как ID
          const storageRef = ref(storage, `products/${productId}/${file.name}`);
          const uploadTask = uploadBytesResumable(storageRef, file);

          uploadTask.on(
            "state_changed",
            null,
            (error) => {
              console.error("Ошибка загрузки файла:", error);
            },
            async () => {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              fileUrls.push(url); // Получаем URL файла после загрузки
              if (fileUrls.length === files.length) {
                setPhotoURLs(fileUrls); // Обновляем список с URL
                setPreviewPhotos(filePreviews); // Обновляем предварительные фотографии
              }
            }
          );
        };

        reader.readAsDataURL(file); // Чтение файла для отображения предварительного просмотра
      }
    }
  };

  // Обработчик отправки формы
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Добавление документа в Firestore
      const productsCollectionRef = collection(db, "products");

      // Создаем уникальный ID для продукта
      const productId = productName.toLowerCase().replace(/\s+/g, "-");

      await addDoc(productsCollectionRef, {
        name: productName,
        description,
        category,
        photoURLs, // Сохраняем URL-ы изображений
        inBasket: false, // начальные значения для корзины и избранного
        isFavorite: false,
        isShared: false,
        time: new Date().toLocaleString(),
        productId, // Добавляем уникальный ID для продукта
      });

      alert("Продукт успешно добавлен!");
      setProductName("");
      setDescription("");
      setCategory("Мужской");
      setPhotoURLs([]);
      setPreviewPhotos([]);
    } catch (error) {
      console.error("Ошибка при добавлении продукта:", error);
      alert("Произошла ошибка при добавлении продукта.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-[375px]">
      <h1 className="font-semibold text-xl mb-4">Добавить продукт</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Название продукта */}
        <div>
          <label className="block text-sm mb-2">Название продукта</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Введите название продукта"
          />
        </div>

        {/* Описание продукта */}
        <div>
          <label className="block text-sm mb-2">Описание продукта</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Введите описание продукта"
          />
        </div>

        {/* Категория продукта */}
        <div>
          <label className="block text-sm mb-2">Категория</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="Мужской">Мужской</option>
            <option value="Женский">Женский</option>
            <option value="Детский">Детский</option>
          </select>
        </div>

        {/* Фотографии */}
        <div>
          <label className="block text-sm mb-2">Фотографии</label>
          <input
            type="file"
            onChange={handleFileChange}
            multiple
            className="w-full px-4 py-2 border rounded-md"
          />
          <div className="mt-4">
            {previewPhotos.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {previewPhotos.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-${index}`}
                    className="w-full h-32 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Кнопка добавления */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-purple-500 text-white rounded-3xl py-2"
        >
          {isLoading ? "Загрузка..." : "Добавить продукт"}
        </Button>
      </form>
    </div>
  );
};

export default AddFile;
