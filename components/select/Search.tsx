import React, { ChangeEvent, useState } from 'react'

const Search = () => {
  const [query, setQuery] = useState<string>("")
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }
  return (
    <div className='w-full'>
      <input type="text" className='w-full border-black border-[1px] p-[0.25rem] rounded-[0.5rem] mb-[0.25rem]' placeholder='Search' value={query} onChange={handleSearchChange}/>
    </div>
  )
}

export default Search
