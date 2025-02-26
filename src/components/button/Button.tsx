import React, { createContext, MouseEventHandler, useContext } from 'react'
import Gradient from './gradient/Gradient'
import Solid from './solid/Solid'

interface Props {
    type?: | "gradient" | "solid"
}

type Data = {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    content: string,
    main?: string,
    text?: string,
    first?: string,
    second?: string
} | undefined

const ButtonContext = createContext<Data>(undefined)

export function handleButtonContext() {
  const data = useContext(ButtonContext)

  if(data === undefined) {
    throw new Error("Select Context is undefined")
  }

  return data
}

/**
 * 
 * @param type type of button, default is normal button
 * @param onClick click event handler
 * @param content string content inside the button
 * @param main main color of the button
 * @param text text color
 * @param first first color when using gradient button or solid button, default is #3e8fbc
 * @param second second color when using gradient button, default is #aa6392
 * @returns button UI component
 */
const Button = ({type = "solid", onClick, content, main="#111723", first = "#3e8fbc", second = "#aa6392", text = "#fff"} : Props & Data) => {
    switch(type) {
        case "gradient":
            return (
                <ButtonContext.Provider value={{content, onClick, main, first, second, text}}>
                    <Gradient />
                </ButtonContext.Provider>
            )
        case "solid":
            return (
                <ButtonContext.Provider value={{content, onClick, main, first, text}}>
                    <Solid />
                </ButtonContext.Provider>
            )
        default:
            return (
                <button onClick={onClick}>{content}</button>
            )
    }
}

export default Button
