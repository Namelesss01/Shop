import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

// Хук для получения коллекции
export const useCollection = (collectionName: string) => {
  const [documents, setDocuments] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const ref = collection(db, collectionName);
        const snapshot = await getDocs(ref);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setDocuments(results);
      } catch (err: any) {
        setError("Ошибка загрузки данных: " + err.message);
      }
    };

    fetchCollection();
  }, [collectionName]);

  return { documents, error };
};

// Хук для добавления документа в коллекцию
export const useAddDocument = (collectionName: string) => {
  const [error, setError] = useState<string | null>(null);

  const addDocument = async (document: any) => {
    try {
      const ref = collection(db, collectionName);
      await addDoc(ref, document);
    } catch (err: any) {
      setError("Ошибка при добавлении документа: " + err.message);
    }
  };

  return { addDocument, error };
};
