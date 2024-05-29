import { ReactNode, useState } from "react";

export function Tooltip({ text, children }: { text: string; children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <div className="relative">
        {isVisible && (
          <div className="absolute bottom-[-20px] w-max px-1 py-0.5 bg-black bg-opacity-60 text-white text-tooltip rounded-md shadow-lg">
            {text}
          </div>
        )}
      </div>
      <div onMouseEnter={() => setIsVisible(true)} onMouseLeave={() => setIsVisible(false)}>
        {children}
      </div>
    </div>
  );
}
