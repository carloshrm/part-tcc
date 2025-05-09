import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import { NoteKey } from "@/context/MusicData/types";
import { getAllPlayerSettings, setIsPlaying } from "@/context/Player/playerSettingsSlice";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

function UsePlayer() {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const { isMuted, volume, isPlaying, bpm } = useAppSelector(getAllPlayerSettings);
  const { notes, timeSignature, selectedNote } = useAppSelector(getAllMusicData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      envelope: {
        attack: 0.003,
        decay: 0.2,
        sustain: 0.2,
        release: 0.4,
      },
    }).toDestination();

    Tone.getTransport().on("start", () => {
      dispatch(setIsPlaying(true));
    });
    Tone.getTransport().on("stop", () => {
      dispatch(setIsPlaying(false));
    });
  }, []);

  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.volume.value = volume;
    }
  }, [volume]);

  useEffect(() => {
    Tone.getTransport().bpm.value = bpm;
  }, [bpm]);

  const playNote = () => {
    const currentNote = notes[selectedNote];
    if (!currentNote || currentNote.duration.includes("r") || isMuted) return;

    const keys = currentNote.keys.map((note) => `${note.note}${note.octave}`);
    synthRef.current?.triggerAttackRelease(keys, `${currentNote.duration}n`);
  };

  const playMusic = () => {
    stopPlayer();
    if (notes.length === 0 || isMuted) return;

    Tone.getTransport().timeSignature = [timeSignature.beats, timeSignature.value];
    Tone.getTransport().bpm.value = bpm;

    let currentTime = 0;
    const events: Array<[number, any]> = [];

    for (const note of notes) {
      const durationValue = note.duration.replace("r", "");
      const toneDuration = `${durationValue}n`;

      if (!note.duration.includes("r")) {
        // Playable note
        events.push([
          currentTime,
          {
            keys: note.keys.map((key: NoteKey) => `${key.note}${key.octave}`),
            duration: toneDuration,
          },
        ]);
      }

      // Advance time regardless of rest or note
      currentTime += Tone.Time(toneDuration).toSeconds();
    }

    const part = new Tone.Part((time, value) => {
      if (value) {
        synthRef.current?.triggerAttackRelease(value.keys, value.duration, time);
      }
    }, events);

    part.start(0);
    part.loop = false;

    Tone.getTransport().start();

    // Stop after total duration
    Tone.getTransport().scheduleOnce(() => {
      part.stop();
      stopPlayer();
    }, currentTime);
  };

  const stopPlayer = () => {
    Tone.getTransport().stop();
    Tone.getTransport().cancel();
  };

  return {
    playNote,
    playMusic,
    stopPlayer,
    isPlaying,
    isMuted,
    volume,
  };
}

export default UsePlayer;
