"use client";
import { useDraggable } from "@dnd-kit/react";
import Image from "next/image";

function Draggable({ id, onClick, src }) {
    const { ref } = useDraggable({ id });

    return (
        <button ref={ref} className="w-full h-12 min-w-12 bg-red-300 p-2" onClick={onClick}>
            <Image
                src={src}
                width={30}
                height={30}
                alt="image"
                className="select-none [user-drag:none] [-webkit-user-drag:none]"
            />
        </button>
    );
}

export default Draggable;
