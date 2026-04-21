"use client";
import Draggable from "../components/Draggable";
import TimsumCat from "../components/TimsumCat";
import brush from "../../public/images/brush.svg";
import catHand from "../../public/images/catHand.svg";
import pc from "../../public/images/pc.svg";
import cam from "../../public/images/cam.svg";
import piggy from "../../public/images/piggy.svg";
import matcha from "../../public/images/matcha.svg";
import Book from "../components/Book";
import Image from "next/image";
import { useEffect } from "react";

function TimsumContainer({ displayPalette, setDisplayPalette, items, setDroppedItems, isShowObj = false, index }) {
    useEffect(() => {
        const bars = [`#bar-left${index}`, `#bar-right${index}`].map((id) => document.querySelector(id));

        const handleMove = (e) => {
            bars.forEach((el) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
                if (angle >= -20 || angle <= -160) return;
                el.style.transform = `rotate(${angle}deg)`;
            });
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div className="h-full relative">
            {isShowObj && (
                <>
                    <div className="absolute bottom-7 right-15 flex flex-col w-fit items-end gap-2 z-20">
                        {displayPalette && (
                            <div className="p-2 w-fit flex gap-2 rounded-lg bg-white border border-slate-200">
                                {items.map((el) => (
                                    <Draggable key={el.id} id={el.id} title={el.title} src={el.src} />
                                ))}
                            </div>
                        )}
                        <Book onClick={() => setDisplayPalette(!displayPalette)} displayPalette={displayPalette} />
                    </div>
                    <Image
                        src={brush}
                        className="absolute bottom-7 right-3 select-none [-webkit-user-drag:none] cursor-pointer hover:-translate-y-1 transition-all"
                        alt="brush"
                        width={34}
                        onClick={() => {
                            localStorage.clear();
                            setDroppedItems([]);
                        }}
                    />
                </>
            )}
            {index === 2 && (
                <Image
                    src={matcha}
                    className="absolute bottom-5 right-5 z-30 select-none [-webkit-user-drag:none] active:cursor-grabbing cursor-pointer hover:-translate-y-1 transition-all"
                    alt="matcha"
                    width={80}
                />
            )}
            {index === 3 && (
                <Image
                    src={piggy}
                    className="absolute bottom-2 right-5 z-30 select-none [-webkit-user-drag:none] active:cursor-grabbing cursor-pointer hover:-translate-y-1 transition-all"
                    alt="piggy"
                    width={80}
                />
            )}
            {index === 4 && (
                <Image
                    src={cam}
                    className="absolute bottom-4 right-5 z-30 select-none [-webkit-user-drag:none] active:cursor-grabbing cursor-pointer hover:-translate-y-1 transition-all"
                    alt="cam"
                    width={60}
                />
            )}
            <Image
                src={catHand}
                id={`bar-left${index}`}
                className="absolute bottom-2 left-18 z-10 select-none [-webkit-user-drag:none] cursor-grab active:cursor-grabbing"
                alt="cat hand"
                width={120}
            />
            <Image
                src={catHand}
                id={`bar-right${index}`}
                className="absolute bottom-2 right-18 z-10 select-none [-webkit-user-drag:none] cursor-grab active:cursor-grabbing"
                alt="cat hand"
                width={120}
            />
            <TimsumCat
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 select-none [-webkit-user-drag:none] cursor-grab active:cursor-grabbing"
                width={120}
            />
            <Image
                src={pc}
                id="bar-right"
                className="absolute bottom-1 left-5 z-30 select-none [-webkit-user-drag:none]"
                alt="computer"
                width={120}
            />
            <div className="absolute bottom-0 border-b-3 h-7 w-full bg-amber-600 border-4 border-amber-500 rounded-sm z-20"></div>
        </div>
    );
}

export default TimsumContainer;
