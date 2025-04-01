import React, { useEffect } from "react";
import { Vex, Stave, Formatter, Voice, Beam, TextNote } from "vexflow";

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
  const { timeSignatureToString, mapNotesToVexflow, mapNotesToMeasures } = useUtils();
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);

  useEffect(() => {
    console.log(musicData.notes);
  }, [musicData.notes]);

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
    let readSelectedNote = -1;
    let selectedNoteRef = null;
    let currentStaveNotes: Note[] = [];
    let currentMeasureValue = 0;
    let measureCount = 0;
    let lastMeasurePos = 0;
    let lineCount = 0;
    const measureDuration = musicData.timeSignature.beats * (1 / musicData.timeSignature.value);

    for (let i = 0; i < musicData.notes.length; i++) {
      currentStaveNotes.push(musicData.notes[i]);
      currentMeasureValue += 1 / parseInt(musicData.notes[i].duration);

      if (i === musicData.selectedNote) {
        readSelectedNote = currentStaveNotes.length;
      }

      if (Math.abs(currentMeasureValue - measureDuration) < 1e-6) {
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

        const notes = mapNotesToVexflow(currentStaveNotes, musicData.clef);

        if (readSelectedNote !== -1) {
          selectedNoteRef = notes[readSelectedNote - 1];
          readSelectedNote = -1;
        }

        const voice = new Voice({
          num_beats: musicData.timeSignature.beats,
          beat_value: musicData.timeSignature.value,
        });

        voice.addTickables(notes);
        currentStave.setContext(context).draw();
        Formatter.FormatAndDraw(context, currentStave, notes, { auto_beam: true });
        lastMeasurePos = currentStave.getNoteEndX();

        measureCount++;
        currentMeasureValue = 0;
        currentStaveNotes = [];
      }

      if (selectedNoteRef !== null) {
        const pos = selectedNoteRef.getBoundingBox();
        const canvasContext = containerRef.current.getContext("2d");
        if (canvasContext) {
          const prevFill = canvasContext.fillStyle;
          canvasContext.fillStyle = "#00AA000f";
          canvasContext.fillRect(pos.x, pos.y, 20, 20);
          canvasContext.fillStyle = prevFill;
        }
      }
    }
  }, [musicData]);

  return (
    <S.MainContainer>
      <S.ControlsContainer>
        <h3>abcd edit</h3>
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
