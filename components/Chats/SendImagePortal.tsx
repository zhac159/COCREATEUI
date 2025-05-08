import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import Media from "../MediaViewer/Media";
import { MessageCreateDTO } from "@/common/api/model";
import { useTheme } from "../Themes/theme";

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
  const theme= useTheme(); 
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
    <View
      style={{
        flex: 1,
      }}
    >
      <Media
        uri={uri}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          zIndex: -100,
        }}
        onPress={() => { Keyboard.dismiss(); }}
      />
      <KeyboardAvoidingView style={styles.container}
        behavior="padding"
        pointerEvents="box-none"
      >
        <IconButton
          style={{ right: 0, top: "5%", alignSelf: "flex-end", position: "absolute" }}
          onPress={() => setUris([])}
          size={30}
          icon={() => <FontAwesome6 name="xmark" size={30} />}
        />
        <View style={styles.textInputContainer}>
        <TextInput
          style={{
            ...theme.customFonts.primary.small,
            ...styles.input,
            fontSize: 17,
            backgroundColor: theme.colors.lightGray,
          }}
          blurOnSubmit={false}
          value={message}
          onChangeText={setMessage}
          onSubmitEditing={handleSend}
        />
        <IconButton
          icon={() => (
            <FontAwesome6
              name={"arrow-up"}
              size={18}
              solid
              color={theme.colors.white}
            />
          )}
          onPress={handleSend}
          style={{
            backgroundColor: theme.colors.black,
            margin: 0,
            padding: 0,
          }}
          size={26}
        />
          
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default SendImagePortal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
    flexDirection: "column",
    justifyContent: "flex-end",
  },
  textInputContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    paddingHorizontal: 10,
    marginBottom: "10%",
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

