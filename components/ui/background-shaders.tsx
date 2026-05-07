"use client";

import { Warp } from "@paper-design/shaders-react";

type Props = {
  fullScreen?: boolean;
};

export default function Wrapper({ fullScreen = false }: Props) {
  return (
    <div className={`relative ${fullScreen ? "min-h-screen" : "h-full min-h-0"}`}>
      <div className={`${fullScreen ? "fixed inset-0 -z-10" : "absolute inset-0"}`}>
        <Warp
          style={{ width: "100%", height: "100%" }}
          proportion={0.45}
          softness={1}
          distortion={0.25}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={0}
          speed={1}
          colors={["hsl(230, 18%, 8%)", "hsl(223, 28%, 12%)", "hsl(214, 25%, 19%)", "hsl(44, 64%, 52%)"]}
        />
      </div>
      <div className="absolute left-8 top-1/2 z-10 -translate-y-1/2"></div>
      <div className="relative z-10 p-8"></div>
    </div>
  );
}
