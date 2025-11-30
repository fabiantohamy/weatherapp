import { collection, getDocs, setDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function fetchFavoritesFromDb() {
  const snapshot = await getDocs(collection(db, "favorites"));
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
}

export async function addFavoriteToDb(weather) {
  const docRef = doc(collection(db, "favorites"), String(weather.id));
  await setDoc(docRef, weather);
}

export async function removeFavoriteFromDb(id) {
  const docRef = doc(collection(db, "favorites"), String(id));
  await deleteDoc(docRef);
}
