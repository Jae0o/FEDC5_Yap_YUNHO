import * as S from "./MediaPlayer.Styles"

import { MouseEvent, useCallback, useEffect, useRef } from "react"
import ReactPlayer from "react-player"

import { debounce } from "@mui/material"

import { MediaPlayerProps } from "./MediaPlayer.Types"
import MediaPlayerBottom from "./components/MediaPlayerBottom/MediaPlayerBottom"
import MediaPlayerSlider from "./components/MediaPlayerPlaySlider/MediaPlayerSlider"
import { MEDIA_PLAYER_EMPTY_URL_KEYWORD } from "./constants/MediaPlayer.Constants"
import useMediaPlayer from "./hooks/useMediaPlayer"
import { ChangePlayer } from "./store/useMediaPlayerStore.Types"

const MediaPlayer = ({ isBlock, url }: MediaPlayerProps): React.ReactNode => {
  const {
    playerRef,
    isPlaying,
    isMute,
    playUrl,
    playPercent,
    volume,
    onClickPlayer,
    onChangeRange,
    onChangeUrl,
  } = useMediaPlayer()

  useEffect(() => {
    if (isBlock) {
      return
    }

    if (playUrl === "") {
      onChangeUrl(MEDIA_PLAYER_EMPTY_URL_KEYWORD)
      return
    }

    onChangeUrl(playUrl)
  }, [isBlock, onChangeUrl, playUrl])

  const handleClickPlayer = useCallback(
    ({ target }: MouseEvent) => {
      if (isBlock) {
        return
      }

      if (!(target instanceof HTMLElement)) {
        return
      }

      const { clickType } = target.dataset
      if (clickType === "play" || clickType === "mute") {
        onClickPlayer({ type: clickType })
      }
    },
    [isBlock, onClickPlayer],
  )

  const handleChangePlayer: ChangePlayer = useCallback(
    (newRange) => {
      if (isBlock) {
        return
      }

      onChangeRange(newRange)
    },
    [isBlock, onChangeRange],
  )

  const changeOnProgress = useRef(
    debounce((played: number) => {
      handleChangePlayer({ type: "onProgress", percent: played })
    }, 100),
  ).current

  return (
    <>
      <S.MediaPlayerHidden>
        <ReactPlayer
          ref={playerRef}
          playing={isBlock ? false : isPlaying}
          muted={isBlock ? true : isMute}
          volume={isBlock ? 0.2 : volume}
          url={isBlock ? "" : url}
          progressInterval={10}
          config={{
            youtube: {
              playerVars: {
                origin: window.location.origin,
              },
            },
          }}
          onProgress={({ played }) => {
            changeOnProgress(played)
          }}
        />
      </S.MediaPlayerHidden>

      <S.MediaPlayerLayout>
        <S.MediaPlayerTop>
          <MediaPlayerSlider
            changeType="play"
            isBlock={isBlock}
            initialPercent={0}
            percent={playPercent}
            onChange={handleChangePlayer}
          />
        </S.MediaPlayerTop>
        <MediaPlayerBottom
          isBlock={isBlock}
          isMute={isMute}
          isPlaying={isPlaying}
          volume={volume}
          onClick={handleClickPlayer}
          onChange={handleChangePlayer}
        />
      </S.MediaPlayerLayout>
    </>
  )
}

export default MediaPlayer
