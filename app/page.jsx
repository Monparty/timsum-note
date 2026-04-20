"use client";

import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();
    return (
        <div className="h-dvh flex items-center justify-center bg-amber-100">
            <button
                className="py-3 px-10 rounded-full border-5 border-amber-400 bg-amber-200 cursor-pointer"
                // onClick={() => window.open("/landing", "popup", "width=360,height=480")}
                onClick={() => router.push("/landing")}
            >
                เปิดติ่มซำแอป
            </button>
        </div>
    );
}
