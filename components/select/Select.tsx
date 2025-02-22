import { createContext, useContext } from 'react'
import MultiSelect from './multiple/MultiSelect'
import SingleSelect from './single/SingleSelect'

interface Props {
    type?: "single" | "multiple",
}

export type SelectOption = {
  label: string,
  value: any
}

type SelectProps = {
  value?: any | any[],
  options: SelectOption[],
  change: (e: any) => void,
  size?: | "10" | "15" | "20" | "25" | "30" | "35" | "40"
} | undefined

const SelectContext = createContext<SelectProps>(undefined)

export function handleSelectContext() {
  const data = useContext(SelectContext)

  if(data === undefined) {
    throw new Error("Select Context is undefined")
  }

  return data
}

/**
 * @param type : type of select, default is "single"
 * @param value : a value state that is chosen
 * @param change : state change function
 * @param options : options array
 * @param size : size of select, default is "30"
 * @returns : Select UI Component
 */
const Select = ({type = "single", value, change, options, size = "30"}: Props & SelectProps) => {
  if(type === "single") return (
    <SelectContext.Provider value={{
       change,
       value,
       options,
       size
    }}><SingleSelect />
    </SelectContext.Provider>
  )

  if(type === "multiple") return (
    <SelectContext.Provider value={{
       change,
       value,
       options,
       size
    }}><MultiSelect />
    </SelectContext.Provider>
  )
}

export default Select
