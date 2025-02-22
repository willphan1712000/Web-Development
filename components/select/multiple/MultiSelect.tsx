import { useState } from 'react'
import ArrowDown from '../icon/ArrowDown'
import X from '../icon/X'
import { handleSelectContext } from '../Select'
import List from './List'

const MultiSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)

  return (
    <>
      <div className={`relative`} style={{width: `${data.size}%`}}>
        <div
          className="p-[3%] flex flex-row border-[1px] justify-between items-center border-black rounded-[1rem] size-full cursor-pointer relative" onClick={() => {
            setOpen(prev => !prev)
          }}
        >
          <div className='flex flex-wrap gap-4 flex-[3]'>
            {data.value.map((item: any, index: number) => (
                <div key={index} className='relative'>
                  <span className='p-1 bg-[#f0f0f0] rounded-md'>{item}</span>
                  <span className='absolute top-[-1rem] right-[-1rem] w-[2rem]'><X onClick={e => {
                    e.stopPropagation()
                    data.change((prev: any[]) => {
                      return [...prev.filter(item_new => item_new !== item)]
                    })
                  }}/></span>
                </div>
              ))}
          </div>

          <div className='w-[23%] flex flex-1 row gap-0'>
            <X onClick={(e) => {
              e.stopPropagation()
              data.change([])
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

export default MultiSelect
