// services/getImages.js
// Firestore collection: "about_images"
// Each document: { position: string, imageUrl: string (Cloudinary URL) }
//
// Expected positions:
//   "topImage"     → hero banner (top of page)
//   "bottomBg"     → bottom parallax background
//   "aboutImage"   → portrait photo in about section
//   "overlay"      → full-width overlay image
//   "gallery1"     → photo grid image 1  (ptop1)
//   "gallery2"     → photo grid image 2  (pbot1)
//   "gallery3"     → photo grid image 3  (ptop2)
//   "gallery4"     → photo grid image 4  (pbot2)
//   "gallery5"     → photo grid image 5  (pbot3)
//   "gallery6"     → photo grid image 6  (ptop3)
//   "gallery7"     → photo grid image 7  (pbot4)

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; // adjust path to your firebase.js config

/**
 * Fetches all image documents from Firestore "about_images" collection.
 * Returns an array of { position, imageUrl } objects.
 */
export async function getImages() {
  const snapshot = await getDocs(collection(db, "about_images"));
  return snapshot.docs.map((doc) => ({
    position: doc.data().position,
    imageUrl: doc.data().imageUrl,
  }));
}
