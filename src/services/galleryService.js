import {
  addDoc,
  collection
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function saveImageData(data) {

    await addDoc(
        collection(db, "gallery"),
        {
            title: data.title,
            category: data.category,
            imageUrl: data.imageUrl,
            createdAt: new Date()
        }
    );

}