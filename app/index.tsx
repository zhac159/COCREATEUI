import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { useState } from "react";
import { LoginType } from "@/components/LoginPage/loginFormHelper";
import { useTheme } from "@/components/Themes/theme";
import StyledButton from "@/components/Common/StyledButton";
import { router } from "expo-router";

const LoginPage = () => {
  const [form, setForm] = useState(LoginType.SignIn);

  const theme = useTheme();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "bold",
              fontSize: 50,
              lineHeight: 48,
            }}
          >
            Welcome to the
          </Text>
          <Text
            style={{
              ...theme.customFonts.primary.medium,
              fontWeight: "bold",
              color: theme.colors.orange,
              fontSize: 50,
              lineHeight: 48,
            }}
          >
            {"Future of\nCreative Work"}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <StyledButton
            text="Sign In"
            style={{ backgroundColor: theme.colors.black }}
            onPress={() => setForm(LoginType.SignUp)}
            icon="arrow-right"
          />
          <StyledButton
            text="Get Started"
            style={{ backgroundColor: theme.colors.orange }}
            onPress={() =>
              router.navigate({
                pathname: "/getStarted",
              })
            }
            icon="arrow-right"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: "20%",
    paddingHorizontal: "3%",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    alignSelf: "center",
    gap: 20,
  },
});

export default LoginPage;
