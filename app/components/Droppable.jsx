import { useDroppable } from "@dnd-kit/react";
function Droppable({ id, children }) {
    const { ref, isOver } = useDroppable({ id });

    return (
        <div
            ref={ref}
            className={`w-12 h-12 border border-dashed border-slate-400 bg-orange-200 rounded-lg flex items-center justify-center ${isOver ? "bg-blue-200" : ""}`}
        >
            {children}
        </div>
    );
}
export default Droppable;
