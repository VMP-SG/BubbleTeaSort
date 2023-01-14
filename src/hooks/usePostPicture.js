import React, { useState, useEffect } from 'react'
import { ref, getDownloadURL } from 'firebase/storage'
import { auth, storage } from '../utils/firebase'

const usePostPicture = (storageURL) => {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const getImage = async() => {
      const photoRef = ref(storage, storageURL);
      const fetchedUrl = await getDownloadURL(photoRef);
      setUrl(fetchedUrl);
    }
    getImage();
  },[storageURL]);

  return url;
}

export default usePostPicture;
