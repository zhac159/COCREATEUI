import StyledButton from "@/components/Common/StyledButton";
import { SettingsMenuOptions } from "./settingsMenuHelper";
import { StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useTheme } from "@/components/Themes/theme";

type SettingMenuProps = {
  setActive: (active: SettingsMenuOptions | undefined) => void;
};

const SettingsMenu: React.FC<SettingMenuProps> = ({ setActive }) => {

  const {t} = useTranslation();
  const theme = useTheme();

  const menuOptions = Object.keys(SettingsMenuOptions).filter((key) =>
    isNaN(Number(key))
  );

  const menuButtons = menuOptions.map((option) => (
    <StyledButton
      key={option}
      text={t(`account.menu-items.${option as keyof typeof SettingsMenuOptions}`)}
      icon="chevron-right"
      textColour={theme.colors.darkGray}
      onPress={() =>
        setActive(
          SettingsMenuOptions[option as keyof typeof SettingsMenuOptions]
        )
      }
      style={{
        backgroundColor: "transparent",
        width: "100%",
        justifyContent: "space-between",
        borderBottomColor: theme.colors.lightGray,
        borderBottomWidth: 1,
        marginBottom: 15,
      }}
    />
  ));

  return <>{menuButtons}</>;
};

export default SettingsMenu;

const styles = StyleSheet.create({});
