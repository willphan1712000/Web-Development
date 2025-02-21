import { useEffect, useRef } from 'react'
import Search from './Search'
import { handleSelectContext } from './Select'

interface Props {
  open: (e: boolean) => void
}

const List = ({open}: Props) => {
  const data = handleSelectContext()
  const list = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    document.addEventListener('click', e => {
      if(list.current?.contains(e.target as HTMLElement)) {
        console.log("clicked")
      }
    }, { signal })

    return () => {
      controller.abort()
    }

  }, [])

  return (
    <div className='flex flex-col border-[1px] justify-center items-center absolute top-[110%] left-0 border-black rounded-[1rem] p-[1rem] w-full max-h-[40rem] overflow-auto' ref={list}>
      <Search />
      {data.options.map(option => (
        <div key={option.value} className='hover:bg-[#f0f0f0] w-full p-1.5 rounded-[10px] cursor-pointer' onClick={() => {
          data.change(option.value)
          open(false)
        }}>{option.label}</div>
      ))}
    </div>  
  )
}

export default List
