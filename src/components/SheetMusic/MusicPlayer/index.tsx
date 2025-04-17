import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch } from "@/context/hooks";
import { setVolume, toggleMute } from "@/context/Player/playerSettingsSlice";
import UsePlayer from "@/utils/usePlayer";
import { Slider, Tooltip } from "antd";
import * as S from "./styles";

function MusicPlayer() {
  const { isMuted, playMusic, stopPlayer, isPlaying, volume } = UsePlayer();
  const dispatch = useAppDispatch();

  const handleMute = () => {
    dispatch(toggleMute());
  };

  return (
    <ControlContainer name="Player" defaultCollapsed={true}>
      <Tooltip title="Liga ou Desliga o som">
        <S.MuteButton $isMuted={isMuted} onClick={handleMute}>
          {isMuted ? "\ueb26" : "\ueb27"}
        </S.MuteButton>
      </Tooltip>
      <S.PlayButton onClick={() => playMusic()} $isPlaying={isPlaying}>
        {"\ueb1c"}
      </S.PlayButton>
      <S.MusicControlButton onClick={() => stopPlayer()}>{"\ueb1d"}</S.MusicControlButton>
      <Tooltip title="Volume">
        <Slider defaultValue={volume} min={-50} max={-5} onChange={(value) => dispatch(setVolume(value))} />
      </Tooltip>
    </ControlContainer>
  );
}

export default MusicPlayer;
