import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="w-96 m-auto my-10">
      <div className="bg-gray-200 text-white p-5 rounded-lg text-center">
        <h1 className="text-3xl text-black font-bold mb-5">Vite + React</h1>
        <button className="bg-green-500 hover:bg-green-700 transition-colors p-2 rounded-md" onClick={() => setCount((count) => count + 1)}>
          Add +1
        </button>
        <div className="mt-2 text-black">
            {count}
        </div>
      </div>
    </div>
  )
}

export default App
