"use client";
import { DragDropProvider } from "@dnd-kit/react";
import { useState } from "react";
import Droppable from "../components/Droppable";
import Draggable from "../components/Draggable";
import note from "../../public/images/note.png";
import camra from "../../public/images/camra.png";
import checkList from "../../public/images/checkList.png";

function Page() {
    const [items] = useState([
        { id: 1, src: checkList, title: "CL", data: [{ isCheck: false, text: "" }], type: "CL" },
        { id: 2, src: note, title: "NO", data: [{ isCheck: false, text: "" }], type: "NO" },
        { id: 3, src: camra, title: "PH", data: [{ isCheck: false, text: "" }], type: "PH" },
    ]);
    const [droppedItems, setDroppedItems] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [displayPalette, setDisplayPalette] = useState(false);
    const [displayPopup, setDisplayPopup] = useState(false);
    const selectedItem = droppedItems.find((item) => item.id === selectedId);

    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const { source, target } = event.operation;
                const id = source.id;

                // ลากทิ้ง
                if (!target) {
                    setDroppedItems((prev) => prev.filter((item) => item.id !== id));
                    return;
                }

                // drop ลง droppable
                if (target.id === "droppable") {
                    const original = items.find((el) => el.id === id);
                    if (!original) return;

                    const newItem = {
                        ...original,
                        id: crypto.randomUUID(),
                    };

                    setDroppedItems((prev) => [...prev, newItem]);
                    setDisplayPalette(false);
                }
            }}
        >
            <div className="h-dvh flex flex-col bg-amber-100">
                <div className="flex-2 pt-10 py-6 px-4">
                    <div className="border-4 border-amber-500 p-2 w-full h-full bg-amber-200 rounded-lg">
                        <Droppable id="droppable">
                            <div className="grid grid-cols-5 gap-2">
                                {droppedItems.map((el) => (
                                    <Draggable
                                        key={el.id}
                                        id={el.id}
                                        title={el.title}
                                        src={el.src}
                                        onClick={() => {
                                            console.log("el.id", el.id);
                                            setDisplayPopup(!displayPopup);
                                            setSelectedId(el.id);
                                        }}
                                    />
                                ))}
                            </div>
                        </Droppable>
                    </div>
                </div>
                <div className="border flex-1">
                    <div className="border h-full relative">
                        <div className="absolute bottom-8 right-14 flex flex-col w-fit items-end gap-1">
                            {displayPalette && (
                                <div className="border p-2 w-fit flex gap-2">
                                    {items.map((el) => (
                                        <Draggable key={el.id} id={el.id} title={el.title} src={el.src} />
                                    ))}
                                </div>
                            )}
                            <button className="border" onClick={() => setDisplayPalette(!displayPalette)}>
                                รายการ
                            </button>
                        </div>
                        <div className="absolute bottom-0 border-b-3 h-7 w-full bg-amber-600 border-4 border-amber-500 rounded-sm"></div>
                    </div>
                </div>
                {displayPopup && (
                    <div className="bg-green-300 w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="h-dvh flex flex-col bg-green-300">
                            <div className="flex-2 pt-10 py-6 px-4">
                                <div className="border-4 border-amber-500 p-2 w-full h-full bg-amber-200 rounded-lg relative">
                                    <div className="w-full flex justify-center text-lg font-bold mb-3">
                                        <input
                                            className="border w-40 text-center"
                                            type="text"
                                            value={selectedItem?.title || ""}
                                            placeholder="หัวเรื่อง"
                                            onChange={(e) => {
                                                const text = e.target.value;

                                                setDroppedItems((prev) =>
                                                    prev.map((item) =>
                                                        item.id === selectedId
                                                            ? {
                                                                  ...item,
                                                                  title: text,
                                                              }
                                                            : item,
                                                    ),
                                                );
                                            }}
                                        />
                                    </div>
                                    <ul className="grid gap-4">
                                        {selectedItem?.data?.map((subItem, index) => (
                                            <li key={subItem.id} className="flex gap-2 items-center">
                                                {index + 1}
                                                <input
                                                    type="checkbox"
                                                    checked={subItem.checked}
                                                    onChange={(e) => {
                                                        const checked = e.target.checked;

                                                        setDroppedItems((prev) =>
                                                            prev.map((item) =>
                                                                item.id === selectedId
                                                                    ? {
                                                                          ...item,
                                                                          data: item.data.map((d) =>
                                                                              d.id === subItem.id
                                                                                  ? { ...d, checked }
                                                                                  : d,
                                                                          ),
                                                                      }
                                                                    : item,
                                                            ),
                                                        );
                                                    }}
                                                />

                                                <input
                                                    className="border w-full sub-input"
                                                    value={subItem.text}
                                                    onChange={(e) => {
                                                        const text = e.target.value;

                                                        setDroppedItems((prev) =>
                                                            prev.map((item) =>
                                                                item.id === selectedId
                                                                    ? {
                                                                          ...item,
                                                                          data: item.data.map((d) =>
                                                                              d.id === subItem.id ? { ...d, text } : d,
                                                                          ),
                                                                      }
                                                                    : item,
                                                            ),
                                                        );
                                                    }}
                                                    onKeyDown={(event) => {
                                                        if (event.key === "Enter") {
                                                            event.preventDefault();

                                                            const newId = crypto.randomUUID();

                                                            setDroppedItems((prev) =>
                                                                prev.map((item) =>
                                                                    item.id === selectedId
                                                                        ? {
                                                                              ...item,
                                                                              data: [
                                                                                  ...item.data,
                                                                                  {
                                                                                      id: newId,
                                                                                      checked: false,
                                                                                      text: "",
                                                                                  },
                                                                              ],
                                                                          }
                                                                        : item,
                                                                ),
                                                            );

                                                            // focus ช่องใหม่
                                                            setTimeout(() => {
                                                                const inputs = document.querySelectorAll(".sub-input");
                                                                inputs[inputs.length - 1]?.focus();
                                                            }, 0);
                                                        }
                                                    }}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className="border h-14 w-14 absolute bottom-2 right-2 rounded-full bg-white"
                                        onClick={() => setDisplayPopup(false)}
                                    >
                                        ปิด
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="border h-full relative">bottom</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DragDropProvider>
    );
}

export default Page;
