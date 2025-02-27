import * as S from "./MediaPlayerBottom.Styles"

import { MouseEvent } from "react"

import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled"
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled"
import VolumeOffIcon from "@mui/icons-material/VolumeOff"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"

import { MEDIA_PLAYER_INITIAL_VOLUME_PERCENTAGE } from "../../constants/MediaPlayer.Constants"
import { ChangePlayer } from "../../store/useMediaPlayerStore.Types"
import MediaPlayerSlider from "../MediaPlayerPlaySlider/MediaPlayerSlider"

interface MediaPlayerBottomProps {
  isBlock: boolean
  isMute: boolean
  isPlaying: boolean
  volume: number
  onClick: (e: MouseEvent) => void
  onChange: ChangePlayer
}

export const MediaPlayerBottom = ({
  isBlock,
  isMute,
  isPlaying,
  volume,
  onChange,
  onClick,
}: MediaPlayerBottomProps) => {
  return (
    <S.MediaPlayerBottomLayout>
      <S.MuteButtonContainer>
        <S.MuteButton
          data-click-type="mute"
          onClick={onClick}
        >
          {isMute ? <VolumeOffIcon /> : <VolumeUpIcon />}
        </S.MuteButton>
      </S.MuteButtonContainer>

      <S.PlayButtonContainer>
        <S.PlayButton
          data-click-type="play"
          onClick={onClick}
        >
          {!isBlock && isPlaying ? (
            <PauseCircleFilledIcon />
          ) : (
            <PlayCircleFilledIcon />
          )}
        </S.PlayButton>
      </S.PlayButtonContainer>

      <S.VolumeSliderContainer>
        <MediaPlayerSlider
          isBlock={isBlock}
          onChange={onChange}
          initialPercent={MEDIA_PLAYER_INITIAL_VOLUME_PERCENTAGE}
          percent={isMute ? 0 : volume}
          changeType="volume"
        />
      </S.VolumeSliderContainer>
    </S.MediaPlayerBottomLayout>
  )
}

export default MediaPlayerBottom
