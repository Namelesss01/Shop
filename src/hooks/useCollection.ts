import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

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
      } catch (err) {
        setError("Ошибка загрузки данных: " + err.message);
      }
    };

    fetchCollection();
  }, [collectionName]);

  return { documents, error };
};
