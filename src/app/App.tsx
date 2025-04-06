import {  useEffect } from "react"

import { getCabins } from "../services/apiCabins"
// Define the Cabin type
type Cabin = {
  id: number;
  name: string;
  location: string;
};

function App() {

useEffect(() => {
 getCabins().then((data: Cabin[]) => {
  console.log(data)
  return data
}
)

  
}, [])
  return (

      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-green-500">
    <h1 className="text-5xl text-red-500 uppercase font-bold">project The Wind Oasis</h1>
      </div>
   
  )
}

export default App
