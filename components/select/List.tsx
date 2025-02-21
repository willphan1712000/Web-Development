import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { handleSelectContext } from './Select'

interface Props {
  open: (e: boolean) => void
}

const List = ({open}: Props) => {
  const data = handleSelectContext()
  const list = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState<string>("")
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const filteredList = useMemo(() => {
    return data.options.filter(option => {
      return option.label.toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    document.addEventListener('click', e => {
      if(!list.current?.contains(e.target as HTMLElement)) {
        open(false)
      }
    }, { signal })

    return () => {
      controller.abort()
    }

  }, [])

  return (
    <div className='flex flex-col border-[1px] justify-center items-center absolute top-[110%] left-0 border-black rounded-[1rem] p-[1rem] w-full max-h-[40rem] overflow-auto' ref={list}>
      <div className='w-full'>
        <input type="text" className='w-full border-black border-[1px] p-[0.25rem] rounded-[0.5rem] mb-[0.25rem]' placeholder='Search' value={query} onChange={handleSearchChange}/>
      </div>
      {filteredList.map(option => (
        <div key={option.value} className='hover:bg-[#f0f0f0] w-full p-1.5 rounded-[10px] cursor-pointer' onClick={() => {
          data.change(option.value)
          open(false)
        }}>{option.label}</div>
      ))}
    </div>  
  )
}

export default List
