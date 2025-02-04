import { useAppDispatch, useAppSelector } from "@/context/hooks";
import { Clef } from "@/context/MusicData/types";
import { setClef, getClef } from "@/context/MusicData/musicDataSlice";
import * as S from "./styles";

const ClefSelector = () => {
  const currentClef = useAppSelector(getClef);
  const dispatch = useAppDispatch();

  const handleClefChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setClef(e.target.value as Clef));
  };

  return (
    <S.Container>
      <input
        type="radio"
        name="clef"
        id="treble-clef"
        value={Clef.Treble}
        onChange={handleClefChange}
        checked={currentClef === Clef.Treble}
      />
      <label htmlFor="treble-clef">Treble</label>
      <input
        type="radio"
        name="clef"
        id="bass-clef"
        value={Clef.Bass}
        onChange={handleClefChange}
        checked={currentClef === Clef.Bass}
      />
      <label htmlFor="bass-clef">Bass</label>
    </S.Container>
  );
};

export default ClefSelector;
