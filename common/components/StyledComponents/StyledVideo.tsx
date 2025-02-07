import { useVideoPlayer, VideoView, VideoViewProps } from "expo-video";
import { FC } from "react";

type StyledVideoProps = Omit<VideoViewProps, "player"> & {
  uri: string;
};

export const StyledVideo: FC<StyledVideoProps> = ({ uri, style, ...props }) => {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <VideoView
      player={player}
      style={style}
      allowsFullscreen
      allowsPictureInPicture
      {...props}
    />
  );
};
