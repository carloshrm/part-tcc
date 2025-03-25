import React, { useEffect } from "react";
import { Vex, Stave, Formatter, Voice } from "vexflow";

import * as S from "./styles";
import ClefSelector from "./ClefSelector";
import { useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import TimeSignatureSelector from "./TimeSignatureSelector";
import useUtils from "@/utils/useUtils";
import { Note } from "@/context/MusicData/types";
import NoteManager from "./NoteManager";
import { defaultFontSettings, sheetDisplaySettings } from "@/context/MusicData/constants";

function SheetMusic() {
  const { timeSignatureToString, mapNotesToVexflow } = useUtils();
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);

  useEffect(() => {
    if (!containerRef.current) return;

    const vexFlow = new Vex.Flow.Factory({
      renderer: {
        elementId: containerRef.current.id,
        width: sheetDisplaySettings.maxMeasuresPerLine * (sheetDisplaySettings.measureWidth * 1.1),
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
    for (let i = 0; i < musicData.notes.length; i++) {
      currentStaveNotes.push(musicData.notes[i]);
      currentMeasureValue += musicData.timeSignature.value / +musicData.notes[i].duration[0];

      if (currentMeasureValue === musicData.timeSignature.value) {
        if (measureCount % sheetDisplaySettings.maxMeasuresPerLine === 0) {
          lineCount++;
          lastMeasurePos = 0;
          measureCount = 0;
        }
        const currentStave = new Stave(
          lastMeasurePos === 0 ? sheetDisplaySettings.widthOffset : lastMeasurePos,
          sheetDisplaySettings.heightOffset * lineCount,
          sheetDisplaySettings.measureWidth,
        );

        if (measureCount === 0) {
          currentStave.addClef(musicData.clef);
          currentStave.addTimeSignature(timeSignatureToString(musicData.timeSignature));
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
      }
    }
  }, [musicData]);

  return (
    <S.MainContainer>
      <S.ControlsContainer>
        <h3>Sheet Music</h3>
        <NoteManager />
        <ClefSelector />
        <TimeSignatureSelector />
      </S.ControlsContainer>
      <S.SheetContainer>
        <S.SheetCanvas ref={containerRef} id="render-canvas" />
      </S.SheetContainer>
    </S.MainContainer>
  );
}

export default SheetMusic;
