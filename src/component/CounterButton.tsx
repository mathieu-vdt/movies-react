import React from "react";

export interface CounterButtonPropsI {
    setCount: React.Dispatch<React.SetStateAction<number>>
}

export default function CounterButton({setCount}: CounterButtonPropsI) {
    return (
        <button
            onClick={() => setCount(p => p + 1)}
        >
            Click me
        </button>
    )
}
