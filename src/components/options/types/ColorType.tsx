import {Props} from "./Props"

const ColorType = ({value, face}: Props) => {
  return (
    <div style={{background: value?.toString()}} className="size-full flex justify-center items-center pointer-events-none">
      {face === undefined ? '' : face}
    </div>
  )
}

export default ColorType
