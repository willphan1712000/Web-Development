import { useEffect, useRef, useState } from 'react'
import { handleSelectContext } from './Select'
import X from './icon/X'
import ArrowDown from './icon/ArrowDown'

const SingleSelect = () => {
  const [isOpen, setOpen] = useState<boolean>(false)
  const list = useRef<HTMLDivElement>(null)
  const data = handleSelectContext()

  useEffect(() => {
    list.current?.focus()
  }, [isOpen])

  return (
    <>
      <div className='relative w-[20rem] aspect-[6] m-[0.5rem]'>
        <div
          className="p-[3%] flex flex-row border-[1px] justify-between items-center border-black rounded-[1rem] size-full cursor-pointer relative"  tabIndex={0} onClick={() => {
            setOpen(prev => !prev)
          }}
        >
          <span className='text-[1rem]'>{data.value}</span>

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
              <div className='flex flex-col border-[1px] justify-center items-center absolute top-[110%] left-0 border-black rounded-[1rem] p-[1rem] w-full max-h-[40rem] overflow-auto' ref={list} tabIndex={1} onBlur={() => setOpen(false)}>
                {/* <input type="text" value={'Hello'}/> */}
                {data.options.map(option => (
                  <div key={option.value} className='hover:bg-[#f0f0f0] w-full p-1.5 rounded-[10px] cursor-pointer' onClick={() => {
                    data.change(option.value)
                    setOpen(false)
                  }}>{option.label}</div>
                ))}
              </div>  
            )
          }
      </div>
    </>
  )
}

export default SingleSelect
