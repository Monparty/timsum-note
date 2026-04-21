"use client";
import { useEffect, useState, useRef } from "react";

const LEFT_EYE = { cx: 61, cy: 67 };
const RIGHT_EYE = { cx: 109, cy: 67 };
const MAX_DIST = 2;

export default function TimsumCat({ className, width = 120 }) {
    const svgRef = useRef(null);
    const [leftOffset, setLeftOffset] = useState({ x: 0, y: 0 });
    const [rightOffset, setRightOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            const svg = svgRef.current;
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            const mx = (e.clientX - rect.left) * (168 / rect.width);
            const my = (e.clientY - rect.top) * (213 / rect.height);

            const calcOffset = (cx, cy) => {
                const dx = mx - cx;
                const dy = my - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) return { x: 0, y: 0 };
                const f = Math.min(MAX_DIST, dist) / dist;
                return { x: dx * f, y: dy * f };
            };

            setLeftOffset(calcOffset(LEFT_EYE.cx, LEFT_EYE.cy));
            setRightOffset(calcOffset(RIGHT_EYE.cx, RIGHT_EYE.cy));
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <svg
            ref={svgRef}
            width={width}
            viewBox="0 0 168 213"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            <defs>
                <style>{`
                    @keyframes tc-float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-5px); }
                    }
                    @keyframes tc-blink {
                        0%, 85%, 95%, 100% { transform: scaleY(1); }
                        90% { transform: scaleY(0.05); }
                    }
                    @keyframes tc-ear-left {
                        0%, 75%, 85%, 100% { transform: rotate(0deg); }
                        80% { transform: rotate(-10deg); }
                    }
                    @keyframes tc-ear-right {
                        0%, 50%, 62%, 100% { transform: rotate(0deg); }
                        56% { transform: rotate(10deg); }
                    }
                    @keyframes tc-breathe {
                        0%, 100% { transform: scaleX(1) scaleY(1); }
                        50% { transform: scaleX(1.015) scaleY(1.02); }
                    }
                    .tc-float { animation: tc-float 3.5s ease-in-out infinite; }
                    .tc-ear-left { transform-origin: 48px 38px; animation: tc-ear-left 6s ease-in-out infinite; }
                    .tc-ear-right { transform-origin: 120px 38px; animation: tc-ear-right 6s ease-in-out infinite 1.2s; }
                    .tc-body { transform-origin: 82px 110px; animation: tc-breathe 3s ease-in-out infinite; }
                    .tc-eye-left { transform-origin: 61px 67px; animation: tc-blink 4s ease-in-out infinite; }
                    .tc-eye-right { transform-origin: 109px 67px; animation: tc-blink 4s ease-in-out infinite 0.05s; }
                `}</style>
            </defs>

            <g className="tc-float">
                {/* Body triangle */}
                <path
                    d="M79.7243 60.0531C81.6707 56.8424 86.3293 56.8424 88.2757 60.0531L152.144 165.408C154.164 168.74 151.765 173 147.868 173H20.132C16.2353 173 13.8362 168.74 15.8563 165.408L79.7243 60.0531Z"
                    fill="white"
                />

                {/* Body */}
                <g className="tc-body">
                    <ellipse cx="82.5" cy="96" rx="56.5" ry="47" fill="#FF8888" />
                    <ellipse cx="82.5" cy="82" rx="63.5" ry="53" fill="white" />
                </g>

                {/* Left ear */}
                <g className="tc-ear-left">
                    <path
                        d="M31.957 22.7858C32.2605 19.4135 35.7577 17.3116 38.878 18.6262L65.4398 29.8163C69.2101 31.4047 69.5809 36.6021 66.0742 38.7096L36.9287 56.2261C33.422 58.3336 29.0064 55.5671 29.3732 51.4923L31.957 22.7858Z"
                        fill="#FAEBCF"
                    />
                    <path
                        d="M35.4745 28.0917C35.778 24.7195 39.2752 22.6176 42.3956 23.9322L61.8816 32.1414C65.652 33.7298 66.0228 38.9272 62.5161 41.0348L41.1345 53.8851C37.6278 55.9927 33.2122 53.2262 33.579 49.1513L35.4745 28.0917Z"
                        fill="#FDEEFA"
                    />
                </g>

                {/* Right ear */}
                <g className="tc-ear-right">
                    <path
                        d="M130.361 21.3837C133.529 20.1888 136.943 22.4222 137.118 25.8036L138.608 54.5877C138.819 58.6735 134.302 61.27 130.878 59.0305L102.42 40.4177C98.996 38.1783 99.5643 32.9988 103.392 31.555L130.361 21.3837Z"
                        fill="#D3C6AE"
                    />
                    <path
                        d="M127.589 26.2765C130.757 25.0816 134.172 27.315 134.347 30.6964L135.267 48.4791C135.478 52.5649 130.961 55.1614 127.537 52.9219L109.956 41.423C106.532 39.1836 107.1 34.004 110.928 32.5602L127.589 26.2765Z"
                        fill="#FDEEFA"
                    />
                </g>

                {/* Forehead highlight */}
                <ellipse
                    cx="65.8571"
                    cy="58.9986"
                    rx="27.0607"
                    ry="19.7034"
                    transform="rotate(8.61781 65.8571 58.9986)"
                    fill="#FFE9BF"
                    fillOpacity="0.43"
                />

                {/* Head stripes */}
                <path
                    d="M76.6491 48.1408C76.3259 50.1693 73.5209 50.451 72.8009 48.5272L66.8508 32.6294C66.3909 31.4007 67.2187 30.0694 68.524 29.9383L77.1444 29.0727C78.4498 28.9416 79.5257 30.0817 79.3193 31.3773L76.6491 48.1408Z"
                    fill="#FCD283"
                />
                <path
                    d="M85.961 47.6791C85.4387 49.6657 82.6196 49.6685 82.0934 47.6829L77.7454 31.2743C77.4094 30.0062 78.3648 28.7633 79.6768 28.7621L88.3405 28.7535C89.6524 28.7523 90.6103 29.9932 90.2767 31.262L85.961 47.6791Z"
                    fill="#756039"
                />
                <path
                    d="M94.2675 48.8601C93.4266 50.7343 90.6451 50.275 90.4516 48.2299L88.852 31.3306C88.7284 30.0245 89.8746 28.9551 91.169 29.1689L99.7169 30.5806C101.011 30.7944 101.753 32.1756 101.216 33.3726L94.2675 48.8601Z"
                    fill="#8B6A2B"
                />

                {/* Left eye (blink + mouse tracking) */}
                <g className="tc-eye-left">
                    <circle cx="61" cy="67" r="13" fill="#D2F5CB" />
                    <circle cx={61 + leftOffset.x} cy={67 + leftOffset.y} r="11" fill="black" />
                    <circle cx={57.5 + leftOffset.x} cy={59.5 + leftOffset.y} r="2.5" fill="white" />
                </g>

                {/* Right eye (blink + mouse tracking) */}
                <g className="tc-eye-right">
                    <circle cx="109" cy="67" r="13" fill="#D2F5CB" />
                    <circle cx={109 + rightOffset.x} cy={67 + rightOffset.y} r="11" fill="black" />
                    <circle cx={105.5 + rightOffset.x} cy={59.5 + rightOffset.y} r="2.5" fill="white" />
                </g>

                {/* Nose */}
                <path
                    d="M86.9641 96C85.4245 98.6666 81.5755 98.6667 80.0359 96L77.8708 92.25C76.3312 89.5833 78.2557 86.25 81.3349 86.25H85.6651C88.7443 86.25 90.6688 89.5833 89.1292 92.25L86.9641 96Z"
                    fill="#F7B0E3"
                />

                {/* Mouth */}
                <path d="M83 97C82.1667 104.333 79 116.2 73 105" stroke="black" />
                <path d="M83 97C83.9167 104.567 87.4 116.812 94 105.255" stroke="black" />

                {/* Right paw */}
                <path
                    d="M127.879 83.2945C125.874 82.8479 125.765 80.0308 127.729 79.4298L143.961 74.4632C145.215 74.0794 146.493 74.987 146.544 76.298L146.881 84.9551C146.932 86.2661 145.728 87.2703 144.448 86.985L127.879 83.2945Z"
                    fill="#FCD283"
                />
                <path
                    d="M126.22 90.1073C124.417 89.1217 125.094 86.385 127.148 86.3528L144.121 86.0873C145.432 86.0668 146.408 87.2935 146.094 88.5671L144.014 96.9775C143.699 98.2511 142.264 98.8817 141.113 98.2522L126.22 90.1073Z"
                    fill="#756039"
                />
                <path
                    d="M123.017 97.2849C121.508 95.8905 122.83 93.4005 124.83 93.869L141.358 97.74C142.635 98.0392 143.284 99.4665 142.668 100.625L138.605 108.277C137.99 109.436 136.445 109.698 135.481 108.808L123.017 97.2849Z"
                    fill="#8B6A2B"
                />

                {/* Button */}
                <circle cx="84" cy="143" r="6" fill="#5680FF" />
                <line x1="83.5" y1="145" x2="83.5" y2="149" stroke="#666666" />
                <line x1="84.5" y1="145" x2="84.5" y2="149" stroke="#666666" />
                <circle cx="84.5" cy="144.5" r="1.5" fill="#666666" />
            </g>
        </svg>
    );
}
