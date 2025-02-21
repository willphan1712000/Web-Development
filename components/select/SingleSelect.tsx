import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { handleSelectContext } from './Select'
import X from './icon/X'
import ArrowDown from './icon/ArrowDown'
import List from './List'

const SingleSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)
  const [search, setSearch] = useState<string>(data.value)

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  return (
    <>
      <div className='relative w-[20rem] aspect-[6] m-[0.5rem]'>
        <div
          className="p-[3%] flex flex-row border-[1px] justify-between items-center border-black rounded-[1rem] size-full cursor-pointer relative" onClick={() => {
            setOpen(prev => !prev)
          }}
        >
          <span className=''>{data.value}</span>

          <div className='w-[23%] flex row gap-0'>
            <X onClick={(e) => {
              e.stopPropagation()
              data.change(undefined)
            }}/>
            <ArrowDown />
          </div>
        </div>
          {
            isOpen && (
              <List open={setOpen}/>
            )
          }
      </div>
    </>
  )
}

export default SingleSelect
