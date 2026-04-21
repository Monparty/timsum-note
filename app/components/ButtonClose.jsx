import React from "react";

function ButtonClose({ onClick }) {
    return (
        <button
            className="h-14 w-14 absolute -bottom-1 -right-1 bg-white rounded-tl-2xl rounded-br-4xl cursor-pointer border-t-4 border-l-4 border-amber-500 flex items-center justify-center"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="oklch(76.9% 0.188 70.08)"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="lucide lucide-check-icon lucide-check"
            >
                <path d="M20 6 9 17l-5-5" />
            </svg>
        </button>
    );
}

export default ButtonClose;
