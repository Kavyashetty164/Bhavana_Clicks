import {
  addDoc,
  collection
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function saveEnquiry(data) {

    await addDoc(
        collection(db, "enquiries"),
        {
            ...data,
            createdAt: new Date()
        }
    );

}