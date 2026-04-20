import { useDroppable } from "@dnd-kit/react";

function Droppable({ id, children }) {
    const { ref } = useDroppable({
        id,
    });

    return (
        <div ref={ref} className="w-full h-full">
            {children}
        </div>
    );
}

export default Droppable;
