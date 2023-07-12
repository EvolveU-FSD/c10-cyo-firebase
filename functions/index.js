/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { onCall, onRequest } from "firebase-functions/v2/https";
import logger from "firebase-functions/logger";

import { initializeApp } from "firebase-admin/app";
// import admin
import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";
import { onDocumentCreated } from "firebase-functions/v2/firestore";

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

export const helloWorld = onRequest((request, response) => {
  logger.log("this is a log");
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

const app = initializeApp(); // uses current Firebase project’s config
const firestore = getFirestore(app);
export const getNumberOfHeroes = onCall(async (data, context) => {
  try {
    let heroCollRef = firestore.collection("heroes");
    let querySnap = await heroCollRef.get();
    logger.log(`request from: ${JSON.stringify(data)}`);
    logger.log(`num of heroes: ${querySnap.size}`);
    return { numHeroes: querySnap.size };
  } catch (ex) {
    logger.info(`ERROR: ${ex.message}`);
    throw ex;
  }
});

export const onHeroCreate = onDocumentCreated(
  "heroes/{heroId}",
  async (event) => {
    try {
      const docSnap = event.data;
      const newHero = docSnap.data();
      logger.log(`new hero! ${newHero.name}`);
      const aggDocRef = firestore.doc("stats/heroes");
      return aggDocRef.update({
        count: admin.firestore.FieldValue.increment(1),
      });
    } catch (ex) {
      logger.info(`ERROR: ${ex.message}`);
      throw ex;
    }
  }
);

// const app = initializeApp(); // uses current Firebase project’s config
// const firestore = getFirestore(app);
// export const getNumberOfHeroes = functions.https.onCall(
//   async (data, context) => {
//     try {
//       let heroCollRef = firestore.collection("heroes");
//       let querySnap = await heroCollRef.get();
//       functions.logger.log(`request from: ${context.auth.token.email}`);
//       functions.logger.log(`num of heroes: ${querySnap.size}`);
//       return { numHeroes: querySnap.size };
//     } catch (ex) {
//       functions.logger.info(`ERROR: ${ex.message}`);
//       throw ex;
//     }
//   }
// );
