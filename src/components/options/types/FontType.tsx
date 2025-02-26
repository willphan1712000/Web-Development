import {Props} from "./Props"

const FontType = ({value, face}: Props) => {
  return (
    <p style={{fontFamily: value?.toString()}} className="size-full flex justify-center items-center pointer-events-none">
      {face === undefined ? '' : face}
    </p>
  )
}

export default FontType
