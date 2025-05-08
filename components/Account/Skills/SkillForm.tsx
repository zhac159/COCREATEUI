import { SkillDTO } from "@/common/api/model";
import { useUpdateSkillKeywords } from "@/components/RecoilStates/profileState";
import { useTheme } from "@/components/Themes/theme";
import { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { Portal } from "react-native-paper";

type SkillFormType = {
  onClose: () => void;
  skill: SkillDTO;
};

const SkillForm: FC<SkillFormType> = ({ onClose, skill }) => {
  const theme = useTheme();

  const viewRef = useRef<Animatable.View>(null);

  const [keyWords, setKeyWords] = useState<string>("");

  const updateKeyWords = useUpdateSkillKeywords(skill.skillType!);

  useEffect(() => {
    setKeyWords(skill.keywords ? skill.keywords.join(", ") : "");
  }, [skill.keywords]);

  return (
    <Portal>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          updateKeyWords(keyWords.split(", "));
          onClose();
        }}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: 99,
        }}
      >
        <Animatable.View
          animation="fadeIn"
          duration={300}
          style={{
            padding: 10,
            width: "80%",
            height: "30%",
            top: "40%",
            left: "10%",
            zIndex: 100,
          }}
          ref={viewRef}
        >
          <TextInput
            placeholder="Add, Keywords, Separated By, Commas"
            value={keyWords}
            onChangeText={(text) => setKeyWords(text)}
            style={{
              height: "100%",
              width: "100%",
              backgroundColor: theme.colors.grayer,
              padding: 12,
              borderRadius: 10,
              textAlign: "left",
              verticalAlign: "top",
              ...theme.customFonts.primary.medium,
            }}
          />
        </Animatable.View>
      </TouchableOpacity>
    </Portal>
  );
};

export default SkillForm;
