import { FC } from "react";
import { useTheme } from "../../Themes/theme";
import { TouchableOpacity, Text } from "react-native";

type CancelButtonPros = {
  onPress: () => void;
};

const CancelButton: FC<CancelButtonPros> = ({ onPress }) => {
  const theme = useTheme();
  return (
    <TouchableOpacity
    style={{
      backgroundColor: theme.colors.darkerGray,
      alignSelf: "flex-end",
      borderRadius: 21,
    }}
    onPress={onPress}
  >
    <Text
      style={{
        ...theme.customFonts.primary.medium,
        color: theme.colors.white,
        paddingTop: 10,
        paddingBottom: 11,
        paddingRight: 14,
        paddingLeft: 14,
      }}
    >
      Cancel
    </Text>
  </TouchableOpacity>
  );
};

export default CancelButton;
