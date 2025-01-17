import { UserLoginDTO } from "@/api/model";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { StyledTextInput } from "@/common/components/StyledComponents/StyledTextInput";
import StyledButton from "@/common/components/StyledComponents/StyledButton";
import { ScrollViewWrapper } from "@/common/components/ScrollViewWrapper";
import { usePostApiLogin } from "@/api/endpoints/cocreateApi";
import { useEncryption } from "@/common/hooks/encryption/useEncryption";
import { useOnUserLogIn } from "@/components/SignIn/hooks/useOnUserLogIn";
import { generalPadding } from "@/common/constants/generalPadding";

export default function Index() {
  const { t } = useTranslation();

  const { onUserLogIn } = useOnUserLogIn();

  const { mutate, error, isPending } = usePostApiLogin({
    mutation: {
      onSuccess: async (data) => {
        await onUserLogIn(data);
      },
    },
  });

  const { handleSubmit, control } = useForm<UserLoginDTO>();
  const { hashPassword } = useEncryption();

  const onSubmit = async (userLoginDTO: UserLoginDTO) => {
    const hashedPassword = await hashPassword(userLoginDTO.password);
    mutate({
      data: {
        ...userLoginDTO,
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
