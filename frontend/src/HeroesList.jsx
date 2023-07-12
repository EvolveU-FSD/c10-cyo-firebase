import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useFirebase } from "./FirebaseProvider";
import UploadImage from "./UploadImage";

const HeroesList = () => {
  const fbContext = useFirebase();

  const db = fbContext.db;
  const [heroes, setHeroes] = useState([]);
  useEffect(() => {
    let collectionRef = collection(db, "heroes");
    let queryRef = query(collectionRef, orderBy("name"));
    const unsubscribe = onSnapshot(queryRef, (querySnap) => {
      if (querySnap.empty) {
        console.log("No docs found");
      } else {
        let heroesData = querySnap.docs.map((doc) => ({
          ...doc.data(),
          DOC_ID: doc.id,
        }));
        setHeroes(heroesData);
      }
    });
    return unsubscribe;
  }, []);
  return (
    <div>
      {heroes.map((hero) => {
        return (
          <ul key={hero.DOC_ID}>
            <li>name: {hero.name}</li>
            <li>vehicle: {hero.vehicle}</li>
            <li>docId: {hero.DOC_ID}</li>
            <li>
              image:{" "}
              {hero.imageUrl ? (
                <img src={hero.imageUrl} height="50" width="50" />
              ) : (
                <UploadImage docId={hero.DOC_ID} />
              )}
            </li>
            <hr />
          </ul>
        );
      })}
    </div>
  );
};

export default HeroesList;
