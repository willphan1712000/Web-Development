import { useState } from 'react'
import ArrowDown from './icon/ArrowDown'
import X from './icon/X'
import List from './List'
import { handleSelectContext } from './Select'

const SingleSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)

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
