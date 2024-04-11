import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  View,
} from 'react-native';
import { mediaDevices, RTCView, MediaStream } from 'react-native-webrtc';

const VideoCall: React.FC = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);

  const start = async () => {
    if (!stream) {
      try {
        const s = await mediaDevices.getUserMedia({ video: true });
        setStream(s);
      } catch(e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <SafeAreaView>
        {stream && <RTCView
        
            style={{ height: 200, width: 300 }}
        streamURL={stream.toURL()} />}
        <View>
          <Button title="Start" onPress={start} />
        </View>
      </SafeAreaView>
    </>
  );
};

export default VideoCall;