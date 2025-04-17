import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { getAllMusicData } from "@/context/MusicData/musicDataSlice";
import { NoteKey } from "@/context/MusicData/types";
import { getAllPlayerSettings, setIsPlaying } from "@/context/Player/playerSettingsSlice";
import { useEffect, useRef } from "react";
import * as Tone from "tone";

function UsePlayer() {
  const synthRef = useRef<Tone.PolySynth | null>(null);
  const { isMuted, volume, isPlaying, bpm } = useAppSelector(getAllPlayerSettings);
  const { notes, timeSignature } = useAppSelector(getAllMusicData);
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

  const playNote = (noteKeys: NoteKey[], noteValue: number) => {
    const keys = noteKeys.map((note) => `${note.note}${note.octave}`);
    synthRef.current?.triggerAttackRelease(keys, `${noteValue}n`);
  };

  const playMusic = () => {
    stopPlayer();
    if (notes.length === 0 || isMuted) return;

    const music = new Tone.Sequence((time, note) => {
      if (note && !note.duration.includes("r")) {
        const noteKeys = note.keys.map((key: NoteKey) => `${key.note}${key.octave}`);
        synthRef.current?.triggerAttackRelease(noteKeys, `${note.duration}n`, time);
      }
    }, notes);

    Tone.getTransport().timeSignature = [timeSignature.beats, timeSignature.value];

    music.loop = false;
    const duration = notes.reduce((acc, note) => {
      const noteDuration = note.duration.replace(`r`, "");
      const duration = Tone.Time(`${noteDuration}n`).toSeconds();
      return acc + duration;
    }, 0);

    music.start(0);
    Tone.getTransport().start();
    Tone.getTransport().scheduleOnce(() => {
      music.stop();
      stopPlayer();
    }, duration);
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
