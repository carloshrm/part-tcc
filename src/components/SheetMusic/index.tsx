import React, { useEffect, useMemo, useState } from "react";
import { Vex, Stave, StaveNote, Formatter, Renderer, Clef as VexClef, FontInfo, Voice, RenderContext } from "vexflow";

import * as S from "./styles";
import ClefSelector from "./ClefSelector";
import { useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import TimeSignatureSelector from "./TimeSignatureSelector";
import useUtils from "@/utils/useUtils";
import { Clef, Note } from "@/context/MusicData/types";

const defaultFontSettings: FontInfo = {
  family: "Arial",
  size: 10,
  weight: "",
  style: "",
};

const defaultStaveSettings = {
  width: 300,
  widthOffset: 10,
  heightOffset: 20,
};

function SheetMusic() {
  const { timeSignatureToString, mapNotesToVexflow } = useUtils();
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);

  const calcWidth = (measures: Note[][]) => {};

  useEffect(() => {
    if (!containerRef.current) return;
    const vexFlow = new Vex.Flow.Factory({
      renderer: {
        elementId: containerRef.current.id,
        width: window.innerWidth * 0.8,
        height: window.innerHeight * 0.8,
        backend: Vex.Flow.Renderer.Backends.CANVAS,
      },
      font: defaultFontSettings,
    });

    const context = vexFlow.getContext();

    let isFirstMeasure = true;
    for (let i = 0; i < musicData.measures.length; i++) {
      const currentStave = new Stave(
        defaultStaveSettings.widthOffset + i * defaultStaveSettings.width,
        i * 80,
        defaultStaveSettings.width,
      );

      if (isFirstMeasure) {
        currentStave.addClef(musicData.clef);
        currentStave.addTimeSignature(timeSignatureToString(musicData.timeSignature));
        isFirstMeasure = false;
      }
      currentStave.setContext(context).draw();

      const notes = Object.groupBy(musicData.measures[i], (note) => note.voice);
      for (const voice in notes) {
        const newVoice = new Voice({
          num_beats: musicData.timeSignature.beats,
          beat_value: musicData.timeSignature.value,
        });

        const currentNotes = mapNotesToVexflow(notes[voice]);
        newVoice.addTickables(currentNotes);
        Formatter.FormatAndDraw(context, currentStave, currentNotes);
      }
    }

    // Formatter.FormatAndDraw(context, stave, notes);
  }, [musicData]);

  return (
    <S.Container>
      <h3>Sheet Music</h3>
      <input type="text" name="notes" id="notes" />
      <ClefSelector />
      <TimeSignatureSelector />
      <div></div>

      <S.SheetCanvas ref={containerRef} id="render-canvas" />
    </S.Container>
  );
}

export default SheetMusic;
