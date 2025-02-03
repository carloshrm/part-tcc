import React, { useEffect, useMemo, useState } from "react";
import {
  Vex,
  Stave,
  StaveNote,
  Formatter,
  Renderer,
  Clef as VexClef,
  FontInfo,
} from "vexflow";

import * as S from "./styles";

export enum Clef {
  Treble = "treble",
  Bass = "bass",
}

const defaultFontSettings: FontInfo = {
  family: "Arial",
  size: 10,
  weight: "",
  style: "",
};

const defaultStave: Stave = new Stave(10, 0, 500);

function SheetMusic() {
  const vexFlow = useMemo(() => Vex.Flow, []);
  const containerRef = React.useRef<HTMLCanvasElement>(null);

  const [clef, setClef] = useState<string>(Clef.Treble);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new vexFlow.Renderer(
      containerRef.current,
      vexFlow.Renderer.Backends.CANVAS,
    );

    renderer.resize(window.innerWidth * 0.6, window.innerHeight * 0.8);
    const context = renderer.getContext();
    context.setFont(defaultFontSettings);

    const stave = Object.assign({}, defaultStave);
    stave.addClef(clef).addTimeSignature("4/4"); // move params to context
    stave.setContext(context).draw();

    // const notes = [
    //   new StaveNote({
    //     keys: ["c/4"],
    //     duration: "q",
    //   }),
    //   new StaveNote({
    //     keys: ["d/4"],
    //     duration: "q",
    //   }),
    //   new StaveNote({
    //     keys: ["e/4"],
    //     duration: "q",
    //   }),
    //   new StaveNote({
    //     keys: ["f/4"],
    //     duration: "q",
    //   }),
    // ];

    // Formatter.FormatAndDraw(context, stave, notes);
  }, [clef]);

  const handleClefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setClef(e.target.value);
  };

  return (
    <S.Container>
      <h3>Sheet Music</h3>
      <input type="text" name="notes" id="notes" />
      <div>
        <input
          type="radio"
          name="clef"
          id="treble-clef"
          value="treble"
          onChange={handleClefChange}
          checked={clef === "treble"}
        />
        <label htmlFor="treble-clef">Treble</label>
        <input
          type="radio"
          name="clef"
          id="bass-clef"
          value="bass"
          onChange={handleClefChange}
          checked={clef === "bass"}
        />
        <label htmlFor="bass-clef">Bass</label>
      </div>

      <S.SheetCanvas ref={containerRef} />
    </S.Container>
  );
}

export default SheetMusic;
