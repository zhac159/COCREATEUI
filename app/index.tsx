import { StatusBar } from "expo-status-bar";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Text, View } from "@/components/Themed";
import LoginForm from "@/components/LoginPage/LoginForm";
import RegisterForm from "@/components/LoginPage/RegisterForm";
import { useState } from "react";
import { Button } from "react-native-paper";

const LoginPage = () => {
  const [form, setForm] = useState("login");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {form === "login" ? <LoginForm /> : <RegisterForm />}
        <View style={{ flexDirection: "row" }}>
          <Button
            mode="contained"
            onPress={() => setForm("login")}
            color={form === "login" ? "blue" : "grey"}
            style={{
              marginRight: 10,
              backgroundColor: form === "login" ? "blue" : "grey",
            }}
          >
            Login
          </Button>
          <Button
            mode="contained"
            onPress={() => setForm("register")}
            style={{
              backgroundColor: form === "register" ? "blue" : "grey",
            }}
          >
            Register
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default LoginPage;
