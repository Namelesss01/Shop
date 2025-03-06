import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { db } from "../../firebase/config";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AddFile = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Мужской");
  const [photoFiles, setPhotoFiles] = useState<File[]>([]);
  const [previewPhotos, setPreviewPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      setPhotoFiles(fileList);

      const previews = fileList.map((file) => URL.createObjectURL(file));
      setPreviewPhotos(previews);
    }
  };

  const uploadImages = async (productId: string) => {
    const uploadPromises = photoFiles.map(async (file) => {
      const storageRef = ref(storage, `products/${productId}/${file.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, file);
      return getDownloadURL(uploadTask.ref);
    });

    return Promise.all(uploadPromises);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productsCollectionRef = collection(db, "products");
      const productDocRef = await addDoc(productsCollectionRef, {
        name: productName,
        description,
        category,
        photoURLs: [],
        inBasket: false,
        isFavorite: false,
        isShared: false,
        time: new Date().toLocaleString(),
      });

      const photoURLs = await uploadImages(productDocRef.id);
      await updateDoc(doc(db, "products", productDocRef.id), { photoURLs });

      alert("Продукт успешно добавлен!");
      setProductName("");
      setDescription("");
      setCategory("Мужской");
      setPhotoFiles([]);
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
