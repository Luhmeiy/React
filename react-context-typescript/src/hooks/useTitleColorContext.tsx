// context
import { TitleColorContext } from "../context/TitleColorContext";

// React
import { useContext } from "react";

export const useTitleColorContext = () => {
    const context = useContext(TitleColorContext);

    if (!context) {
        console.log("Context não encontrado!");
    }

    return context;
}