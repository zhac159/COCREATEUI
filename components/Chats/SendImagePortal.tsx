import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Button,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import Media from "../MediaViewer/Media";
import { MessageCreateDTO } from "@/common/api/model";
import { EntityType } from "../Account/Common/Media/EntityType";
import { usePrepareAndUpload } from "@/common/media/mediaHooks";

type SendImagePortalProps = {
  handleSendMessage: (message: MessageCreateDTO) => void;
  setUris: Dispatch<SetStateAction<string[]>>;
  uri: string;
};

const SendImagePortal: FC<SendImagePortalProps> = ({
  handleSendMessage,
  setUris,
  uri,
}) => {

  const [message, setMessage] = useState("");

  const handleSend = async () => {

    const messageCreateDTO: MessageCreateDTO = {
      content: message,
      uri,
    };
    
    handleSendMessage(messageCreateDTO);
    setUris([]);
  };

  return (
    <View style={styles.container}>
      <Media
        uri={uri}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          zIndex: -100,
        }}
        onPress={() => {}}
      />
      <IconButton
        style={{ right: 0, top: "5%", alignSelf: "flex-end" }}
        onPress={() => setUris([])}
        size={30}
        icon={() => <FontAwesome6 name="x" size={30} />}
      />
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          
        />
        <Button title="Send" onPress={handleSend} />
      </View>
    </View>
  );
};

export default SendImagePortal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: "white",
  },
});

