import React, { useState } from "react";

const initialData = [
    { place: "4º", user: "Carla", points: 100, streak: 5 },
    { place: "5º", user: "Cecilia", points: 85, streak: 3 },
    { place: "6º", user: "Daniel", points: 100, streak: 5 },
    { place: "7º", user: "Pedro", points: 70, streak: 2 },
    { place: "8º", user: "Juan", points: 100, streak: 5 },
    { place: "9º", user: "Juan", points: 100, streak: 5 },
    { place: "10º", user: "Martin", points: 65, streak: 2 },
  ];

  function Tabla() {
    const [data, setData] = useState(initialData);
    return (
        <div className="my-8 max-md:px-2 px-8 w-full flex flex-col items-center max-w-5xl rounded-xl">
          <table className="w-full shadow-md">
            <thead>
              <tr>
                <th className="border border-gray-300  text-gray-700 px-4 py-2 font-black  bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 rounded-xl ">
                  <span>Puesto</span>
                </th>
                <th className="border border-gray-300 text-gray-700 px-4 py-2 font-black bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                  <span>Usuario</span>
                </th>
                <th className="border border-gray-300 text-gray-700 px-4 py-2 font-black bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                  <span>Puntos</span>
                </th>
                <th className="border border-gray-300 text-gray-700 px-4 py-2 font-black bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                  <span>Racha</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className=" px-4 py-2 border border-gray-300 text-gray-700 text-center italic font-bold font-sans  bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                    {item.place}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center italic font-bold font-sans  bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                    {item.user}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center italic font-bold font-sans  bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                    {item.points}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-gray-700 text-center italic font-bold font-sans  bg-white dark:bg-bgDarkPrimary dark:text-gray-300 dark:border-zinc-600 ">
                    {item.streak}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    )
  }

  export default Tabla;