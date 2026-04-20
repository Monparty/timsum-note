"use client";
import { useDraggable } from "@dnd-kit/react";
import Image from "next/image";

function Draggable({ id, title, onClick, src }) {
    const { ref } = useDraggable({
        id: id,
    });

    return (
        <button ref={ref} className="w-full h-13 min-w-13 bg-red-300 p-2" onClick={onClick}>
            <Image src={src} width={30} height={30} class="select-none [user-drag:none] [-webkit-user-drag:none]" />
        </button>
    );
}

export default Draggable;
