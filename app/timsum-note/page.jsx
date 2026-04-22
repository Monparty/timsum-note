"use client";
import { useEffect, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import Droppable from "../components/Droppable";
import Draggable from "../components/Draggable";
import note from "../../public/images/note.svg";
import camra from "../../public/images/camra.svg";
import checkList from "../../public/images/checkList.svg";
import Image from "next/image";
import ButtonClose from "../components/ButtonClose";
import TimsumContainer from "../components/TimsumContainer";
import qr from "../../public/images/qr.jpg";
import tim1 from "../../public/images/tim1.jpg";
import tim2 from "../../public/images/tim2.jpg";
import tim3 from "../../public/images/tim3.jpg";
import tim4 from "../../public/images/tim4.jpg";
import tim5 from "../../public/images/tim5.jpg";

function Page() {
    const [items] = useState([
        { id: 1, src: checkList, title: "", data: [{ isCheck: false, text: "" }], type: "checkList", note: "" },
        { id: 2, src: note, title: "", data: [{ isCheck: false, text: "" }], type: "note", note: "" },
        { id: 3, src: camra, title: "", data: [{ isCheck: false, text: "" }], type: "camra", note: "" },
    ]);
    const [droppedItems, setDroppedItems] = useState(() => {
        if (typeof window === "undefined") return [];
        return JSON.parse(localStorage.getItem("timsumNote")) || [];
    });
    const [selectedId, setSelectedId] = useState(null);
    const [displayPalette, setDisplayPalette] = useState(false);
    const [displayPopup, setDisplayPopup] = useState(false);
    const [displayQr, setDisplayQr] = useState(false);
    const selectedItem = droppedItems?.find((item) => item.id === selectedId);
    const timImg = [tim1, tim2, tim3, tim4, tim5];
    const random0to4 = () => Math.floor(Math.random() * 5);
    const [randomNum, setRandomNum] = useState(0);

    useEffect(() => {
        if (!droppedItems) return;
        localStorage.setItem("timsumNote", JSON.stringify(droppedItems));
    }, [droppedItems]);

    return (
        <DragDropProvider
            onDragEnd={(event) => {
                if (event.canceled) return;

                const { source, target } = event.operation;
                if (!source) return;

                const id = source.id;

                // ลากทิ้ง (ไม่ได้ drop ลง Droppable ใดเลย)
                if (!target) {
                    setDroppedItems((prev) => prev?.filter((item) => item.id !== id));
                    return;
                }

                // drop ลงช่อง cell ใดก็ได้
                const isOccupied = droppedItems?.some((el) => el.cellId === target.id && el.id !== id);
                if (isOccupied) return;

                const original = items.find((el) => el.id === id) || droppedItems?.find((el) => el.id === id);
                if (!original) return;

                setDroppedItems((prev) => [
                    ...prev?.filter((el) => el.id !== id), // ลบอันเดิมออก
                    { ...original, id: crypto.randomUUID(), cellId: target.id },
                ]);

                setDisplayPalette(false);
            }}
        >
            <div className="h-dvh flex flex-col bg-amber-200">
                <div className="flex-2 pt-10 py-6 px-4">
                    <div className="border-4 border-amber-500 py-2 px-4 w-full h-full bg-amber-100 rounded-lg">
                        <div className="grid grid-cols-5 grid-rows-5 gap-2 h-full">
                            {Array.from({ length: 25 }).map((_, index) => (
                                <Droppable key={index} id={`cell-${index}`}>
                                    {droppedItems
                                        ?.filter((item) => item.cellId === `cell-${index}`)
                                        .map((el) => (
                                            <Draggable
                                                key={el.id}
                                                id={el.id}
                                                src={el.src}
                                                onClick={() => {
                                                    setDisplayPopup(!displayPopup);
                                                    setSelectedId(el.id);
                                                }}
                                            />
                                        ))}
                                </Droppable>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <TimsumContainer
                        displayPalette={displayPalette}
                        setDisplayPalette={setDisplayPalette}
                        items={items}
                        setDroppedItems={setDroppedItems}
                        isShowObj
                        index={1}
                        setDisplayQr={setDisplayQr}
                        random0to4={random0to4}
                        setRandomNum={setRandomNum}
                    />
                </div>
                {displayPopup && (
                    <div className="w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                        {selectedItem?.type === "checkList" && (
                            <div className="h-dvh flex flex-col bg-green-300">
                                <div className="flex-2 pt-10 py-6 px-4">
                                    <div className="border-4 border-amber-500 py-2 px-4 w-full h-full bg-amber-200 rounded-lg relative rounded-br-4xl">
                                        <div className="w-full flex justify-center text-lg font-bold mb-3">
                                            <input
                                                className="w-40 text-center"
                                                type="text"
                                                value={selectedItem?.title || ""}
                                                placeholder="ใส่หัวข้อ..."
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
                                            {selectedItem?.data?.map((subItem) => (
                                                <li key={subItem.id} className="flex gap-2 items-center">
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
                                                        className={`w-full sub-input ${
                                                            subItem.checked ? "line-through opacity-50" : ""
                                                        }`}
                                                        value={subItem.text}
                                                        placeholder="เพิ่มข้อความ..."
                                                        onChange={(e) => {
                                                            const text = e.target.value;

                                                            setDroppedItems((prev) =>
                                                                prev.map((item) =>
                                                                    item.id === selectedId
                                                                        ? {
                                                                              ...item,
                                                                              data: item.data.map((d) =>
                                                                                  d.id === subItem.id
                                                                                      ? { ...d, text }
                                                                                      : d,
                                                                              ),
                                                                          }
                                                                        : item,
                                                                ),
                                                            );
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (event.key === "Enter") {
                                                                event.preventDefault();
                                                                if (selectedItem.data?.length === 5) {
                                                                    return alert("สูงสุดได้ 5 รายการ");
                                                                }
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
                                                                    const inputs =
                                                                        document.querySelectorAll(".sub-input");
                                                                    inputs[inputs.length - 1]?.focus();
                                                                }, 0);
                                                            }
                                                            if (
                                                                event.key === "Backspace" &&
                                                                subItem.text === "" &&
                                                                selectedItem.data?.length > 1
                                                            ) {
                                                                event.preventDefault();
                                                                setDroppedItems((prev) =>
                                                                    prev.map((item) =>
                                                                        item.id === selectedId
                                                                            ? {
                                                                                  ...item,
                                                                                  data: item.data.filter(
                                                                                      (d) => d.id !== subItem.id,
                                                                                  ),
                                                                              }
                                                                            : item,
                                                                    ),
                                                                );
                                                                // focus row ก่อนหน้า
                                                                setTimeout(() => {
                                                                    const inputs =
                                                                        document.querySelectorAll(".sub-input");
                                                                    const currentIndex = Array.from(inputs).findIndex(
                                                                        (el) => el === event.target,
                                                                    );
                                                                    if (currentIndex > 0) {
                                                                        inputs[currentIndex - 1]?.focus();
                                                                    }
                                                                }, 0);
                                                            }
                                                        }}
                                                    />
                                                </li>
                                            ))}
                                        </ul>
                                        <ButtonClose onClick={() => setDisplayPopup(false)} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <TimsumContainer
                                        displayPalette={displayPalette}
                                        setDisplayPalette={setDisplayPalette}
                                        items={items}
                                        setDroppedItems={setDroppedItems}
                                        index={2}
                                        setDisplayQr={setDisplayQr}
                                        random0to4={random0to4}
                                        setRandomNum={setRandomNum}
                                    />
                                </div>
                            </div>
                        )}
                        {selectedItem?.type === "note" && (
                            <div className="h-dvh flex flex-col bg-blue-300">
                                <div className="flex-2 pt-10 py-6 px-4">
                                    <div className="border-4 border-amber-500 py-2 px-4 w-full h-full bg-amber-200 rounded-lg rounded-br-4xl relative">
                                        <div className="w-full flex justify-center text-lg font-bold mb-3">
                                            จดโน๊ต...
                                        </div>
                                        <textarea
                                            className="w-full h-[calc(100%-40px)]"
                                            placeholder="จดอะไรสักอย่าง..."
                                            onChange={(e) => {
                                                const text = e.target.value;
                                                setDroppedItems((prev) =>
                                                    prev.map((item) =>
                                                        item.id === selectedId ? { ...item, note: text } : item,
                                                    ),
                                                );
                                            }}
                                            defaultValue={selectedItem?.note || ""}
                                        ></textarea>
                                        <ButtonClose onClick={() => setDisplayPopup(false)} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <TimsumContainer
                                        displayPalette={displayPalette}
                                        setDisplayPalette={setDisplayPalette}
                                        items={items}
                                        setDroppedItems={setDroppedItems}
                                        index={3}
                                        setDisplayQr={setDisplayQr}
                                        random0to4={random0to4}
                                        setRandomNum={setRandomNum}
                                    />
                                </div>
                            </div>
                        )}
                        {selectedItem?.type === "camra" && (
                            <div className="h-dvh flex flex-col bg-pink-300">
                                <div className="flex-2 pt-10 py-6 px-4">
                                    <div className="border-4 border-amber-500 py-2 px-4 w-full h-full bg-amber-200 rounded-lg relative rounded-br-4xl flex items-center justify-center flex-col">
                                        <Image
                                            src={timImg[randomNum]}
                                            width={170}
                                            height={170}
                                            alt="qr"
                                            className="rounded-lg border-4 border-white select-none [-webkit-user-drag:none] [user-drag:none]"
                                        />
                                        <ButtonClose onClick={() => setDisplayPopup(false)} />
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <TimsumContainer
                                        displayPalette={displayPalette}
                                        setDisplayPalette={setDisplayPalette}
                                        items={items}
                                        setDroppedItems={setDroppedItems}
                                        index={4}
                                        setDisplayQr={setDisplayQr}
                                        random0to4={random0to4}
                                        setRandomNum={setRandomNum}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
                {displayQr && (
                    <div className="w-full h-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                        <div className="h-dvh flex flex-col bg-purple-300">
                            <div className="flex-2 pt-10 py-6 px-4">
                                <div className="border-4 border-amber-500 py-2 px-4 w-full h-full bg-amber-200 rounded-lg relative rounded-br-4xl flex items-center justify-center flex-col">
                                    <h2 className="mb-2 select-none [-webkit-user-drag:none] [user-drag:none]">ติ่มซำขอตังกินเปียก</h2>
                                    <Image
                                        src={qr}
                                        width={170}
                                        height={170}
                                        alt="qr"
                                        className="rounded-lg select-none [-webkit-user-drag:none] [user-drag:none]"
                                    />
                                    <ButtonClose onClick={() => setDisplayQr(false)} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <TimsumContainer
                                    displayPalette={displayPalette}
                                    setDisplayPalette={setDisplayPalette}
                                    items={items}
                                    setDroppedItems={setDroppedItems}
                                    index={5}
                                    setDisplayQr={setDisplayQr}
                                    random0to4={random0to4}
                                    setRandomNum={setRandomNum}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DragDropProvider>
    );
}

export default Page;
