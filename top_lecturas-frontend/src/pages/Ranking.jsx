import React, { useState } from "react";
import Card from "../components/Card";
import Tabla from "../components/TableRanking";
import TitleH1 from "../components/TitleH1";

const initialData = [
  { place: "4º", user: "Carla", points: 100, streak: 5 },
  { place: "5º", user: "Cecilia", points: 85, streak: 3 },
  { place: "6º", user: "Daniel", points: 100, streak: 5 },
  { place: "7º", user: "Pedro", points: 70, streak: 2 },
  { place: "8º", user: "Juan", points: 100, streak: 5 },
  { place: "9º", user: "Juan", points: 100, streak: 5 },
  { place: "10º", user: "Martin", points: 65, streak: 2 },
];

function Ranking() {
  const [data, setData] = useState(initialData);

  return (
    <div className="my-8 mt-2 grow flex flex-col items-center justify-around">
      <div className="flex flex-col justify-between items-center mx-auto max-w-7xl h-full bg-white dark:bg-zinc-800 shadow-md rounded-xl">
      <TitleH1 text="Ranking de Jugadores" />
        <div className="flex justify-beetween items-center mx-auto max-w-7xl h-80">
          <Card place={2} name="Ana" points={90} rank="2º" />
          <Card place={1} name="Juan" points={100} rank="1º" />
          <Card place={3} name="Carlos" points={80} rank="3º" />
        </div>
        <Tabla />
      </div>
    </div>
  );
}

export default Ranking;
