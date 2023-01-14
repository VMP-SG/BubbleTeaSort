import React, { useState, useEffect } from 'react'
import { auth } from '../utils/firebase'
import { onAuthStateChanged } from 'firebase/auth'

const useFirebaseUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unlisten = onAuthStateChanged(auth, authUser => {
        authUser ? setUser(authUser) : setUser(null);
    });
    return () => {
      unlisten();
    }
  },[]);

  return user;
}

export default useFirebaseUser
