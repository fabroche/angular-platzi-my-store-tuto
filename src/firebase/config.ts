// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyA-3kWU0iW2_4VfTgmbwGvfejGhCCLah94',
  authDomain: 'yarnstore-8b1f6.firebaseapp.com',
  projectId: 'yarnstore-8b1f6',
  storageBucket: 'yarnstore-8b1f6.appspot.com',
  messagingSenderId: '854042084357',
  appId: '1:854042084357:web:7fcd6821e766d4072f086c',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File) {
  const storageRef = ref(storage, `/assets/products-img/${file.name}`);
  const response = await uploadBytes(storageRef, file);
  return response;
}

export async function downloadFileUrl(file: File) {
    const storageRef = ref(storage, `/assets/products-img/${file.name}`);
    const response = await getDownloadURL(storageRef);
    return response;
}
