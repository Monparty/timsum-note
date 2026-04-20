"use client";
import { useDraggable } from "@dnd-kit/react";
import Image from "next/image";

function Draggable({ id, onClick, src }) {
    const { ref } = useDraggable({ id });

    return (
        <div ref={ref} className="w-11 h-11 rounded-lg bg-red-200 flex items-center justify-center pb-2 cursor-grab" onClick={onClick}>
            <Image
                src={src}
                width={10}
                height={10}
                alt="image"
                className="select-none [user-drag:none] [-webkit-user-drag:none] w-full h-full object-contain"
            />
        </div>
    );
}

export default Draggable;
