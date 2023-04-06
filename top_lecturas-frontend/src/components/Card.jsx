import React from "react";
import MedalGold from "src/components/MedalOro";
import MedalSilver from "src/components/MedalSilver";
import MedalBronze from "src/components/MedalBronze";

const images = {
  1: MedalGold,
  2: MedalSilver,
  3: MedalBronze,
};

const Card = ({ place, name, points, rank}) => {
  const Image = images[place];

  let cardClasses ="border border-blue-300 rounded-xl mx-8 p-4 w-40 h-56 flex flex-col items-center shadow-2xl bg-white dark:bg-bgDarkSecondary dark:border-zinc-600";
  let nameClasses = "text-xl text-gray-700 font-bold font-sans mb-4 text-center mt-2 dark:text-gray-300";
  let pointsClasses = "text-gray-700 font-bold italic text-center dark:text-gray-300";
  let imageClasses = "w-24 h-24 flex items-center justify-center";
  let placeClasses= "flex items-center justify-center text-xl text-gray-700 font-extrabold italic dark:text-gray-300 "

  if (place === 1) {
    cardClasses ="border border-gray-300 rounded-xl bg-white mx-8 p-4 w-40 h-64 flex flex-col items-center shadow-2xl bg-white dark:bg-bgDarkSecondary dark:border-zinc-600 dark:text-gray-300";
    nameClasses += "text-gray-700 font-extrabold dark:bg-bgDarkSecondary dark:text-gray-300";
    pointsClasses += "text-gray-700 font-extrabold dark:text-gray-300";
    imageClasses += "w-28 h-28";
  } else if (place === 2 || place === 3) {
    cardClasses +="border border-gray-300 rounded-xl bg-white mx-8 p-4 w-28 h-56 flex flex-col items-center shadow-xl bg-white dark:bg-bgDarkSecondary dark:text-gray-300 dark:border-zinc-600 ";
  }

  return (
    <div className={cardClasses}>
      <span className={placeClasses}>{rank}</span>
      <div className={imageClasses}>
        <Image />
      </div>
      <span className={nameClasses}>{name}</span>
      <p className={pointsClasses}>{points} Puntos.</p>
    </div>
  );
};


export default Card;
