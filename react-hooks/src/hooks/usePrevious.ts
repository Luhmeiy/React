import { useDebugValue, useEffect, useRef } from "react";

interface IRef {
    current?: number;
}

export const usePrevious = (value: number) => {
    const ref: IRef = useRef();

    useDebugValue("--- CUSTOM HOOK AND USEDEBUGVALUE ---");
    useDebugValue(`The previous number is ${ref.current}`);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}