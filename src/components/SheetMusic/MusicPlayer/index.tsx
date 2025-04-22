import ControlContainer from "@/components/ControlContainer";
import { useAppDispatch } from "@/context/hooks";
import { setVolume, toggleMute } from "@/context/Player/playerSettingsSlice";
import UseMusicSymbol from "@/utils/useMusicSymbol";
import UsePlayer from "@/utils/usePlayer";
import { Slider, Tooltip, Typography } from "antd";
import * as S from "./styles";

function MusicPlayer() {
  const { isMuted, playMusic, stopPlayer, isPlaying, volume, playNote } = UsePlayer();
  const dispatch = useAppDispatch();

  const handleMute = () => {
    dispatch(toggleMute());
  };

  return (
    <ControlContainer name="Player" defaultCollapsed={true}>
      <S.ButtonContainer>
        <S.ControlButton onClick={() => playMusic()} $isPlaying={isPlaying}>
          Tocar {UseMusicSymbol("PLAY")}
        </S.ControlButton>
        <S.ControlButton onClick={() => stopPlayer()}>Parar {UseMusicSymbol("STOP")}</S.ControlButton>
        <S.ControlButton type="default" onClick={() => playNote()}>
          Ouvir
        </S.ControlButton>
      </S.ButtonContainer>

      <Typography.Title level={4}>Volume</Typography.Title>

      <S.VolumeContainer>
        <Tooltip title="Liga ou desliga o som">
          <S.MuteButton $isMuted={isMuted} onClick={handleMute}>
            {isMuted ? UseMusicSymbol("SPEAKER_CLOSED", "SMALL") : UseMusicSymbol("SPEAKER_OPEN", "SMALL")}
          </S.MuteButton>
        </Tooltip>
        <S.SliderContainer>
          <Tooltip title="Volume">
            <Slider defaultValue={volume} min={-50} max={-5} onChange={(value) => dispatch(setVolume(value))} />
          </Tooltip>
        </S.SliderContainer>
      </S.VolumeContainer>
    </ControlContainer>
  );
}

export default MusicPlayer;
