
interface Props {
    src: string,
}

const Image = ({src}: Props) => {
  return (
    <img className="image" src={src} draggable={false} alt='React Image Component' />
  )
}

export default Image
