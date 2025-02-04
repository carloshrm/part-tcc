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
import ClefSelector from "./ClefSelector";
import { useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import TimeSignatureSelector from "./TimeSignatureSelector";

const defaultFontSettings: FontInfo = {
  family: "Arial",
  size: 10,
  weight: "",
  style: "",
};

function SheetMusic() {
  const vexFlow = useMemo(() => Vex.Flow, []);
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);

  useEffect(() => {
    if (!containerRef.current) return;

    const renderer = new vexFlow.Renderer(
      containerRef.current,
      vexFlow.Renderer.Backends.CANVAS,
    );

    renderer.resize(window.innerWidth * 0.6, window.innerHeight * 0.8);
    const context = renderer.getContext();
    context.setFont(defaultFontSettings);

    const stave = new Stave(10, 0, 400);
    stave.addClef(musicData.clef).addTimeSignature("3/5"); // move params to context
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
  }, [musicData]);

  return (
    <S.Container>
      <h3>Sheet Music</h3>
      <input type="text" name="notes" id="notes" />
      <ClefSelector />
      <TimeSignatureSelector />
      <div></div>

      <S.SheetCanvas ref={containerRef} />
    </S.Container>
  );
}

export default SheetMusic;
