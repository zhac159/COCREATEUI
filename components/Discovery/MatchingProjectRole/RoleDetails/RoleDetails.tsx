import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../../Themes/theme";
import RoleDetailIconTexts from "./RoleDetailIconTexts";
import { SkillType } from "@/common/api/model";
import RoleDetailCoinRole from "./RoleDetailCoinRole";
import { windowHeight } from "@/components/Account/Common/getWindowDimensions";

type RoleDetailsProps = {
  name: string;
  location: string;
  effort: number;
  startDateString: string;
  endDateString: string;
  cost: number;
  skillType: SkillType | undefined;
};

const RoleDetails: FC<RoleDetailsProps> = ({
  name,
  location,
  effort,
  startDateString,
  endDateString,
  cost,
  skillType,
}) => {
  const theme = useTheme();

  const effortString =
    effort <= 8 ? `${effort} Hours` : `${Math.floor(effort / 24)} Days`;

  const startDate = new Date(startDateString); // replace startDateString with your start date UTC string
  const endDate = new Date(endDateString); // replace endDateString with your end date UTC string
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const formattedStartDate = `${startDate.getDay()} ${monthNames[startDate.getMonth()]}`;
  const formattedEndDate = `${endDate.getDay()} ${monthNames[endDate.getMonth()]}`;
  const dateString = `${formattedStartDate} - ${formattedEndDate}`;

  return (
    <View
      style={{
        ...styles.container,
      }}
    >
      <RoleDetailCoinRole
        cost={cost}
        skillType={skillType}
      />
      <Text
        style={{
          ...theme.customFonts.secondary.large,
          ...styles.title,
          color: theme.colors.white,
        }}
      >
        {name}
      </Text>
      <View
        style={{
          borderBottomColor: theme.colors.darkerGray,
          ...styles.divider,
        }}
      />
      <View
        style={{
          ...styles.textIconConatiner,
        }}
      >
        <RoleDetailIconTexts icon={"location-dot"} text={location} />
        <RoleDetailIconTexts icon={"stopwatch"} text={effortString} />
        <RoleDetailIconTexts icon={"calendar"} text={dateString} />
      </View>
    </View>
  );
};

export default RoleDetails;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "flex-end",
    width: "100%",
    height: windowHeight - 214,
    paddingHorizontal: 30,
  },
  coinsRoleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 25,
    overflow: "hidden",
  },
  textIconConatiner: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    gap: 20,
  },
  divider: {
    borderBottomWidth: 1,
    marginVertical: 12,
  },
  title: {
    fontWeight: "400",
    fontSize: 32,
    textAlign: "center",
    lineHeight: 48,
  },
  role: {
    fontSize: 18,
    fontWeight: "500",
    textAlign: "center",
  },
});
