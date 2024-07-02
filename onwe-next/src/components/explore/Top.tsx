import React from 'react'
import { Search } from 'lucide-react'

const Top = () => {
  return (
    <div className='w-full h-[16dvh] justify-center items-center'>
        <div className='w-[90%] h-[90%]  ml-10 space-y-4 border-b-2'>
            <h1 className='text-xl mt-6'>Search</h1>
            <div className='w-[40%] h-12 text-gray-400 border-2 mt-1 rounded-xl flex items-center'><Search className='ml-2 mr-3'/> Search</div>
        </div>
    </div>
  )
}

export default Top
