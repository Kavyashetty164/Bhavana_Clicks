// scripts/seedImages.js
// Run once with: node scripts/seedImages.js
// Fill in your Cloudinary URLs below, then run.
//
// Prerequisites:
//   npm install firebase-admin
//   Set GOOGLE_APPLICATION_CREDENTIALS env var to your service account JSON path
//   OR replace initializeApp() below with your own admin SDK init

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// ─── Replace this path with your service account key file ───
import serviceAccount from "../serviceAccountKey.json" assert { type: "json" };

initializeApp({ credential: cert(serviceAccount) });

const db = getFirestore();

// ─────────────────────────────────────────────────────────────
// FILL IN YOUR CLOUDINARY URLs HERE
// Upload each image to Cloudinary, then paste the delivery URL.
// Format: https://res.cloudinary.com/<cloud_name>/image/upload/<public_id>
// ─────────────────────────────────────────────────────────────
const images = [
  {
    position: "topImage",
    imageUrl: "https://res.cloudinary.com/dlat2xbe5/image/upload/v1781171137/image_d8q6cy.jpg",
  },
  {
    position: "bottomBg",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/bottomimage.jpg",
  },
  {
    position: "aboutImage",
    imageUrl: "https://res.cloudinary.com/dlat2xbe5/image/upload/v1781171137/image_d8q6cy.jpg",
  },
  {
    position: "overlay",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/overlay.png",
  },
  {
    position: "gallery1",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery1.jpg",
  },
  {
    position: "gallery2",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery2.jpg",
  },
  {
    position: "gallery3",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery3.jpg",
  },
  {
    position: "gallery4",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery4.jpg",
  },
  {
    position: "gallery5",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery5.jpg",
  },
  {
    position: "gallery6",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery6.jpg",
  },
  {
    position: "gallery7",
    imageUrl: "https://res.cloudinary.com/YOUR_CLOUD/image/upload/gallery7.jpg",
  },
];

async function seed() {
  const col = db.collection("about_images");

  for (const img of images) {
    // Use position as the document ID so updates are idempotent
    await col.doc(img.position).set(img);
    console.log(`✓ seeded: ${img.position}`);
  }

  console.log("\nAll images seeded to Firestore ✓");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
