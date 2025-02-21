import { createContext, useContext } from 'react'
import MultiSelect from './MultiSelect'
import SingleSelect from './SingleSelect'

interface Props {
    type?: "single" | "multiple",
    size?: number
}

export type SelectOption = {
  label: string,
  value: any
}

type SelectProps = {
  value?: any,
  options: SelectOption[],
  change: (e: any) => void
} | undefined

const SelectContext = createContext<SelectProps>(undefined)

export function handleSelectContext() {
  const data = useContext(SelectContext)

  if(data === undefined) {
    throw new Error("Select Context is undefined")
  }

  return data
}

const Select = ({type, value, change, options}: Props & SelectProps) => {
  if(!type) {
    type = 'single'
  }

  if(type === "single") return (
    <SelectContext.Provider value={{
       change,
       value,
       options
    }}><SingleSelect />
    </SelectContext.Provider>
  )

  if(type === "multiple") return (
    <SelectContext.Provider value={{
       change,
       value,
       options
    }}><MultiSelect />
    </SelectContext.Provider>
  )
}

export default Select
