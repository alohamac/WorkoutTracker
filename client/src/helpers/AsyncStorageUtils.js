// CreateUserFetchHook.js
import { useEffect, useState } from 'react';
import { fetchData } from './AsyncStorageUtils'; // Import the fetchData function

export const useUserFetch = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const storedUserData = await fetchData('user');
      setUserData(storedUserData);
    }

    fetchUser();
  }, []);

  return userData;
};