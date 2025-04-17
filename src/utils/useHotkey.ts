import { useCallback, useEffect } from "react";

function UseHotkey(key: string, callback: () => void) {
  const callbackMemo = useCallback(callback, [callback]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callbackMemo();
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [key, callbackMemo]);
}

export default UseHotkey;
