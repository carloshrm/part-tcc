import React, { useEffect } from "react";
import { Vex, Stave, Formatter, FontInfo, Voice } from "vexflow";

import * as S from "./styles";
import ClefSelector from "./ClefSelector";
import { useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import TimeSignatureSelector from "./TimeSignatureSelector";
import useUtils from "@/utils/useUtils";
import { Note } from "@/context/MusicData/types";

const defaultFontSettings: FontInfo = {
  family: "Arial",
  size: 10,
  weight: "",
  style: "",
};

const sheetSettings = {
  measureWidth: 400,
  widthOffset: 10,
  heightOffset: 110,
  noteWidth: 26,
  maxMeasuresPerLine: 3,
};

function SheetMusic() {
  const { timeSignatureToString, mapNotesToVexflow } = useUtils();
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);

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
    context.setFont({ ...defaultFontSettings });

    let currentStaveNotes: Note[] = [];
    let currentMeasureValue = 0;
    let measureCount = 0;
    let lastMeasurePos = 0;
    let lineCount = 0;
    let drawLineBreak = false;
    for (let i = 0; i < musicData.notes.length; i++) {
      currentStaveNotes.push(musicData.notes[i]);
      currentMeasureValue += musicData.timeSignature.value / +musicData.notes[i].duration[0];
      debugger;
      if (currentMeasureValue === musicData.timeSignature.value) {
        if (measureCount % sheetSettings.maxMeasuresPerLine === 0) {
          lineCount++;
          drawLineBreak = true;
          lastMeasurePos = 0;
        }
        const currentStave = new Stave(
          lastMeasurePos === 0 ? sheetSettings.widthOffset : lastMeasurePos,
          sheetSettings.heightOffset * lineCount,
          sheetSettings.measureWidth,
        );

        if (measureCount === 0 || drawLineBreak) {
          currentStave.addClef(musicData.clef);

          if (lineCount === 0) {
            currentStave.addTimeSignature(timeSignatureToString(musicData.timeSignature));
          }
        }

        const notes = mapNotesToVexflow(currentStaveNotes);
        const voice = new Voice({
          num_beats: musicData.timeSignature.beats,
          beat_value: musicData.timeSignature.value,
        });
        voice.addTickables(notes);

        currentStave.setContext(context).draw();
        Formatter.FormatAndDraw(context, currentStave, notes);
        lastMeasurePos = currentStave.getNoteEndX();

        measureCount++;
        currentMeasureValue = 0;
        currentStaveNotes = [];
        drawLineBreak = false;
      }
    }
  }, [musicData]);

  return (
    <S.Container>
      <h3>Sheet Music</h3>
      <input type="text" name="notes" id="notes" />
      <ClefSelector />
      <TimeSignatureSelector />
      <S.SheetContainer>
        <S.SheetCanvas ref={containerRef} id="render-canvas" />
      </S.SheetContainer>
    </S.Container>
  );
}

export default SheetMusic;
