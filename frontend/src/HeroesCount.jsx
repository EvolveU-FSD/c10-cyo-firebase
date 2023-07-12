import { httpsCallable } from "firebase/functions";
import React, { useState } from "react";
import { useFirebase } from "./FirebaseProvider";

const HeroesCount = () => {
  const fb = useFirebase();
  const cloudFuncs = fb.cloudFuncs;

  const [count, setCount] = useState();
  const getHeroesCount = async () => {
    const getNumberOfHeroes = httpsCallable(cloudFuncs, "getNumberOfHeroes");
    const result = await getNumberOfHeroes();
    const data = result.data;
    setCount(data.numHeroes);
  };

  return (
    <div>
      <button onClick={getHeroesCount}>Get Count</button>
      <p>Number of heroes is: {count}</p>
    </div>
  );
};

export default HeroesCount;
