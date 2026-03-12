import React, { useEffect, useRef } from 'react';


export const ScrollContainer = ({ children }) => {
    const outerRef = useRef(null);
    const innerRef = useRef(null);

    // start the container at the bottom
    useEffect(() => {
        const outerHeight = outerRef.current.clientHeight;
        const innerHeight = innerRef.current.clientHeight;

        outerRef.current.scrollTo({
            top: innerHeight - outerHeight,
            left: 0
        });
    }, []);

    // scroll smoothly on change of children
    useEffect(() => {
        const outerHeight = outerRef.current.clientHeight;
        const innerHeight = innerRef.current.clientHeight;

        outerRef.current.scrollTo({
            top: innerHeight - outerHeight,
            left: 0
        });
    }, [children]);
            behavior: "smooth"
        });
    }, [children]);

    return (
        <div
            ref={outerRef}
            className="flex-1 w-full overflow-y-auto p-4 border rounded-lg bg-gray-100 shadow-md"
            style={{
                position: "relative",
                height: "100%",
                overflow: "scroll",
                maxHeight: "70vh",
            }}
        >
            <div
                ref={innerRef}
                style={{
                    position: "relative"
                }}
            >
                {children}
            </div>
        </div>
    )
};