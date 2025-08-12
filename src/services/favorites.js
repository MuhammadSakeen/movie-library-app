import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"
import { db } from "./firebase"

export async function getFavorites(userId) {
    if (!userId) {
        throw new Error("Invalid userId in getFavorites");
    }
    const docRef = doc(db, "favorites", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data().movies || [];
    }
    return [];
}

export async function addFavorite(userId, movie) {
    const docRef = doc(db, "favorites", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        // Document exists, update it
        await updateDoc(docRef, {
            movies: arrayUnion(movie)
        });
    } else {
        // Document doesn't exist, create it
        await setDoc(docRef, {
            movies: [movie]
        });
    }
}

export async function removeFavorite(userId, movie) {
    const docRef = doc(db, "favorites", userId);

    await updateDoc(docRef, {
        movies: arrayRemove(movie),
    });
}

