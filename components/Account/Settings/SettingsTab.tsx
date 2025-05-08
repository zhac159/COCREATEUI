import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SettingsMenuOptions } from "./settingsMenuHelper";
import SettingsMenu from "./SettingsMenu";
import { EnterCodePage } from "./EnterCodePage";
import { IconButton } from "react-native-paper";
import { FontAwesome6 } from "@expo/vector-icons";
import { tabBarHeight } from "../Common/getWindowDimensions";
import { AccountDetailsAndLocation } from "./AccountDetailsAndLocation/AccountDetailsAndLocation";
import { TermsAndConditions } from "./TermsAndConditions";
import { FeedbackAndContact } from "./FeedbackAndContact";
import { DeleteAccountPage } from "./DeleteAccountPage";
import { SignOutPage } from "./SignOutPage";

const SettingsTab = () => {
  const [active, setActive] = useState<SettingsMenuOptions>();

  const pages = {
    [SettingsMenuOptions.termsandconditions]: <TermsAndConditions />,
    [SettingsMenuOptions.vouchercode]: <EnterCodePage />,
    [SettingsMenuOptions.accountdetails]: <AccountDetailsAndLocation />,
    [SettingsMenuOptions.feedbackandcontact]: <FeedbackAndContact />,
    [SettingsMenuOptions.delete]: <DeleteAccountPage />,
    [SettingsMenuOptions.logout]: <SignOutPage/>,
  };

  return (
    <View style={styles.container}>
      {active == null ? (
        <SettingsMenu setActive={setActive} />
      ) : (
        <View
          style={{
            flex: 1,
          }}
        >
          <IconButton
            icon={() => (
              <FontAwesome6 name="chevron-left" size={18} color="black" solid />
            )}
            style={{ margin: 0, marginBottom: 20 }}
            onPress={() => setActive(undefined)}
          />
          {pages[active]}
        </View>
      )}
    </View>
  );
};

export default SettingsTab;

const styles = StyleSheet.create({
  experienceType: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 12,
  },
  container: {
    flex: 1,
    paddingVertical: 30,
    paddingBottom: tabBarHeight,
  },
});
