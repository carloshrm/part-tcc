export interface PlayerSettingsState {
  volume: number;
  isMuted: boolean;
  isPlaying: boolean;
  bpm: number;
}

export const defaultPlayerSettings: PlayerSettingsState = {
  volume: -12,
  isMuted: false,
  isPlaying: false,
  bpm: 120,
};
