import { UserLoginDTO } from "@/api/model";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { useEncryption } from "@/common/hooks/encryption/useEncryption";
import { useOnUserLogIn } from "@/components/SignIn/hooks/useOnUserLogIn";
import { generalPadding } from "@/common/constants/generalPadding";
import { usePostApiAuthenticationLogin } from "@/api2/endpoints/cocreateApi";
import { LoginRequest } from "@/api2/model";

export default function Index() {
  const { t } = useTranslation();

  const { onUserLogIn } = useOnUserLogIn();

  const { mutate, error, isPending } = usePostApiAuthenticationLogin({
    mutation: {
      onSuccess: onUserLogIn,
    },
  });

  const { handleSubmit, control } = useForm<LoginRequest>();
  const { hashPassword } = useEncryption();

  const onSubmit = async (loginRequest: LoginRequest) => {
    const hashedPassword = await hashPassword(loginRequest.password);
    mutate({
      data: {
        ...loginRequest,
        password: hashedPassword,
      },
    });
  };

  return (
    <>
      <ScrollViewWrapper
        contentContainerStyle={styles.container}
        showBackgroundColor
        disableTopInset
      >
        <View style={styles.formContainer}>
          <Controller
            name="usernameOrEmail"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <StyledTextInput
                label={t("sign-in.username-email")}
                onChangeText={field.onChange}
                value={field.value}
                error={fieldState.error?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field, fieldState }) => (
              <StyledTextInput
                label={t("sign-in.password")}
                onChangeText={field.onChange}
                value={field.value}
                error={fieldState.error?.message}
              />
            )}
          />
        </View>
      </ScrollViewWrapper>
      <StyledButton
        text={t("sign-in.sign-in")}
        error={!!error}
        isLoading={isPending}
        onPress={handleSubmit(onSubmit)}
        style={styles.buttonStyle}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: generalPadding,
    backgroundColor: "transparent",
  },
  formContainer: {
    flex: 1,
    height: "100%",
    gap: 20,
    justifyContent: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  buttonStyle: {
    position: "absolute",
    bottom: 50,
  },
});
