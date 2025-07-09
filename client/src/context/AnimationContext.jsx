import { createContext, useContext, useState } from "react";

const AnimationContext = createContext();

const AnimationProvider = ({children}) => {
    const [showAnimation, setShowAnimation] = useState([true, false]) // for showing cursor within typing animation and showing content

    const resetAnimation = () => {setShowAnimation([true, false])}

    return (
        <AnimationContext.Provider value={{showAnimation, setShowAnimation, resetAnimation}}>
            {children}
        </AnimationContext.Provider>
    )
}

const useAnimation = () => useContext(AnimationContext)

export {AnimationProvider, useAnimation}
