import React, { useEffect, useState } from "react";
import { Accidental, BoundingBox, Formatter, Stave, Vex, Voice } from "vexflow";

import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { defaultFontSettings, sheetDisplaySettings } from "@/context/MusicData/constants";
import { getAllMusicData, setHoverNote, setSelectedNote } from "@/context/MusicData/musicDataSlice";
import { Note } from "@/context/MusicData/types";
import useUtils from "@/utils/useUtils";
import { useTheme } from "styled-components";
import BaseSettings from "./BaseSettings";
import KeySelector from "./KeySelector";
import MeasureDisplay from "./MeasureDisplay";
import MusicPlayer from "./MusicPlayer";
import NoteManager from "./NoteManager";
import * as S from "./styles";
import TimeSignatureSelector from "./TimeSignatureSelector";

function SheetMusic() {
  const [noteCoords, setNoteCoords] = useState<{ [key: number]: BoundingBox }>({});
  const theme = useTheme();

  const { timeSignatureToString, mapNotesToVexflow } = useUtils();
  const containerRef = React.useRef<HTMLCanvasElement>(null);
  const musicData = useAppSelector(getAllMusicData);
  const dispatch = useAppDispatch();

  const strokeNote = (pos: BoundingBox, isHover: boolean = false) => {
    if (!containerRef.current) return;
    const context = containerRef.current.getContext("2d");
    if (context) {
      const prevStroke = context.strokeStyle;
      const prevLineWidth = context.lineWidth;

      context.lineWidth = 3;
      context.strokeStyle = isHover ? theme.colors.noteHover : theme.colors.noteHighlight;
      context.strokeRect(pos.x - 5, pos.y - 5, pos.w + 10, pos.h + 10);
      context.strokeStyle = prevStroke;
      context.lineWidth = prevLineWidth;
    }
  };

  const handleCanvasClick = () => {
    if (!containerRef.current || musicData.hoverNote === -1) return;

    dispatch(setSelectedNote(musicData.hoverNote));
    dispatch(setHoverNote(-1));
    strokeNote(noteCoords[musicData.hoverNote]);
  };

  const handleCanvasMouseover = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!containerRef.current) return;
    for (const [key, pos] of Object.entries(noteCoords)) {
      const intKey = parseInt(key);
      const rect = containerRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      if (x >= pos.x && x <= pos.x + pos.w && y >= pos.y && y <= pos.y + pos.h) {
        if (intKey === musicData.selectedNote) return;
        dispatch(setHoverNote(intKey));
        return;
      }
    }
  };

  useEffect(() => {
    if (Object.keys(noteCoords).length === 0) return;

    const pos = noteCoords[musicData.selectedNote];
    strokeNote(pos);
  }, [noteCoords]);

  useEffect(() => {
    if (!containerRef.current) return;

    const vexFlow = new Vex.Flow.Factory({
      renderer: {
        elementId: containerRef.current.id,
        width: sheetDisplaySettings.canvasWidth,
        height: sheetDisplaySettings.canvasHeight,
        backend: Vex.Flow.Renderer.Backends.CANVAS,
      },
      font: defaultFontSettings,
    });

    const context = vexFlow.getContext();
    context.setFont({ ...defaultFontSettings });
    const titleWidth = context.measureText(musicData.title).width;
    context.fillText(musicData.title, (containerRef.current.width - titleWidth) / 2, 60);

    let currentStaveNotes: Note[] = [];
    let currentMeasureValue = 0;
    let measureCount = 0;
    let lastMeasurePos = 0;
    let lineCount = 0;
    let indexControl = 0;
    const measureDuration = musicData.timeSignature.beats * (1 / musicData.timeSignature.value);

    for (let i = 0; i < musicData.notes.length; i++) {
      currentStaveNotes.push(musicData.notes[i]);
      currentMeasureValue += 1 / parseInt(musicData.notes[i].duration);

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
          currentStave.addClef(musicData.clef).addKeySignature(musicData.keySignature);
          currentStave.addTimeSignature(timeSignatureToString(musicData.timeSignature));
        }
        const notes = mapNotesToVexflow(currentStaveNotes, musicData.clef);

        const voice = new Voice({
          num_beats: musicData.timeSignature.beats,
          beat_value: musicData.timeSignature.value,
        });

        voice.addTickables(notes);
        Accidental.applyAccidentals([voice], `C`);
        currentStave.setContext(context).draw();
        Formatter.FormatAndDraw(context, currentStave, notes, { auto_beam: true });
        lastMeasurePos = currentStave.getNoteEndX();

        const notePositions = notes.reduce((acc: { [key: number]: BoundingBox }, note) => {
          const boundingBox = note.getBoundingBox();
          if (indexControl === musicData.hoverNote) {
            strokeNote(boundingBox, true);
          }
          acc[indexControl++] = boundingBox;
          return acc;
        }, {});
        setNoteCoords((prev) => ({ ...prev, ...notePositions }));

        measureCount++;
        currentMeasureValue = 0;
        currentStaveNotes = [];
      }
    }
  }, [musicData]);

  return (
    <S.MainContainer>
      <S.ControlsContainer>
        <BaseSettings />
        <MusicPlayer />
        <NoteManager />
        <MeasureDisplay />
        <TimeSignatureSelector />
        <KeySelector />
      </S.ControlsContainer>
      <S.SheetContainer>
        <S.SheetCanvas
          ref={containerRef}
          id="render-canvas"
          onMouseMove={handleCanvasMouseover}
          onMouseDown={handleCanvasClick}
        />
      </S.SheetContainer>
    </S.MainContainer>
  );
}

export default SheetMusic;
