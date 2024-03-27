import { ProjectRoleDTO } from "@/common/api/model";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../Themes/theme";
import SkillIcon from "@/components/Account/Skills/SkillIcon";
import Rating from "@/components/Common/Rating";
import { getSkill } from "@/components/Account/Skills/skillHelper";
import SeeProfileButton from "@/components/Common/SeeProfileButton";

type TeamMemberPreviewProps = {
  otherRole: ProjectRoleDTO;
};

const TeamMemberPreview: FC<TeamMemberPreviewProps> = ({ otherRole }) => {
  const theme = useTheme();

  const isFilles = otherRole.assignee?.userId;

  if (!otherRole) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        <SkillIcon skillType={otherRole.skillType} />
        <View
          style={{
            ...styles.detailsContainer,
          }}
        >
          <View
            style={{
              gap: 5,
            }}
          >
            <Text
              style={{
                ...theme.customFonts.primary.medium,
                color: theme.colors.white,
                fontSize: 14,
              }}
            >
              {getSkill(otherRole.skillType)}
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  ...theme.customFonts.secondary.medium,
                  color: theme.colors.white,
                  fontSize: 20,
                }}
              >
                {isFilles ? otherRole.assignee?.username : "Still Hiring"}
              </Text>
              {isFilles && <Rating rating={0} white />}
            </View>
          </View>
        </View>
      </View>
      {isFilles && <SeeProfileButton userId={otherRole.assignee?.userId} />}
    </View>
  );
};

export default TeamMemberPreview;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  detailsContainer: {
    flexDirection: "column",
  },
});
