import { useState } from 'react'
import ArrowDown from '../icon/ArrowDown'
import X from '../icon/X'
import { handleSelectContext } from '../Select'
import List from './List'

const SingleSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className='relative aspect-[6]' style={{width: `${data.size}%`, color: `${data.text}`}}>
        <div
          className="p-[3%] flex flex-row border-[1px] justify-between items-center rounded-[1rem] size-full cursor-pointer relative" onClick={() => {
            setOpen(prev => !prev)
          }}
          style={{borderColor: `${data.text}`}}
        >
          <span style={{color: `${data.text}`}}>{data.value}</span>

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
