import { useEffect, useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure the initial state is set
      setTimeout(() => setAnimationClass("translate-y-0"), 10);
    } else {
      setAnimationClass("translate-y-full");
    }
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className="">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className={`bg-white w-full max-w-md rounded-xl p-6 transition-all transform duration-200 ease-out ${animationClass}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
