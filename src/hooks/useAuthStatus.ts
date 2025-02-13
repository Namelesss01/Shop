import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';  // Your Firebase config path

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCheckingStatus, setIsCheckingStatus] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);  // If a user is logged in, set the status to true
      setIsCheckingStatus(false);  // Set checking to false when status is known
    });

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  return { isLoggedIn, isCheckingStatus };
};

export default useAuthStatus;
