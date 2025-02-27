import { useCallback, useRef } from "react"
import ReactPlayer from "react-player"

import useMediaPlayerStore from "@/components/PostCard/components/MediaPlayer/store/useMediaPlayerStore"

import {
  MEDIA_PLAYER_EMPTY_URL_KEYWORD,
  MEDIA_PLAYER_PROGRESS_BAR_RANGE_PERCENTAGE,
} from "../constants/MediaPlayer.Constants"
import {
  ChangePlayer,
  ChangeUrl,
  TogglePlayer,
} from "../store/useMediaPlayerStore.Types"

const useMediaPlayer = () => {
  const playerRef = useRef<ReactPlayer>(null)
  const {
    playUrl,
    isMute,
    isPlaying,
    volume,
    playPercent,
    togglePlayer,
    changeRange,
    changeUrl,
  } = useMediaPlayerStore()

  const onClickPlayer: TogglePlayer = useCallback(
    (toggleType) => {
      togglePlayer(toggleType)
    },
    [togglePlayer],
  )

  const onChangeRange: ChangePlayer = useCallback(
    ({ type, percent }) => {
      const { current } = playerRef

      if (
        !current ||
        percent < MEDIA_PLAYER_PROGRESS_BAR_RANGE_PERCENTAGE.MIN ||
        percent > MEDIA_PLAYER_PROGRESS_BAR_RANGE_PERCENTAGE.MAX
      ) {
        return
      }

      if (!(current instanceof ReactPlayer)) {
        return
      }

      changeRange({ type, percent })

      if (type === "play") {
        current.seekTo(percent)
      }
    },
    [changeRange],
  )

  const onChangeUrl: ChangeUrl = useCallback(
    (url) => {
      if (url === MEDIA_PLAYER_EMPTY_URL_KEYWORD) {
        changeUrl("")
      }

      const isCanPlay = ReactPlayer.canPlay(url)
      if (isCanPlay) {
        changeUrl(url)
      }

      onChangeRange({
        type: "play",
        percent: 0,
      })
    },
    [changeUrl, onChangeRange],
  )

  return {
    playUrl,
    isPlaying,
    isMute,
    playerRef,
    playPercent,
    volume,
    onClickPlayer,
    onChangeRange,
    onChangeUrl,
  }
}

export default useMediaPlayer
