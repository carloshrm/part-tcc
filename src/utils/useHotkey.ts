import { useCallback, useEffect } from "react";

interface HotkeyOptions {
  withShift?: boolean;
  withCtrl?: boolean;
  withAlt?: boolean;
}

function UseHotkey(
  key: string,
  callback: () => void,
  { withShift = false, withAlt = false, withCtrl = false }: HotkeyOptions = {},
) {
  const callbackMemo = useCallback(callback, [callback]);

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === key.toLowerCase()) {
        if ((withShift && !e.shiftKey) || (withAlt && !e.altKey) || (withCtrl && !e.ctrlKey)) {
          return;
        }

        callbackMemo();
      }
    };

    window.addEventListener("keydown", keyDownHandler);
    return () => window.removeEventListener("keydown", keyDownHandler);
  }, [key, callbackMemo]);
}

export default UseHotkey;
