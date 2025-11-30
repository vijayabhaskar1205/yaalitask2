import React, { Suspense } from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'


function App() {
const Display=React.lazy(()=>import ('./component/Display'))

  return (
    <>
     <BrowserRouter>
     <Routes>
      
      <Route path='/' element={<Suspense fallback={<h1 className='h-screen text-6xl text-black font-semibold flex items-center justify-center '>Loading</h1>}> <Display/> </Suspense>}/>
      
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
