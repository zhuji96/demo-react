import * as React from "react";
import arrayMove from "../utils/arrayMove";

const { useState, useEffect } = React;

export default function Example() {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setCount(c => c + 1);
        }, 1000);
        return () => clearInterval(id);
    }, []);

    return (
        <div>
            <p>You clicked {count} times</p>
            {/* <button onClick={() => setCount(count + 1)}>Click me!</button> */}
        </div>
    );
}
