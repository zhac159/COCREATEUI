import {
  useAboutYouState,
  usePortfolioContentsValue,
} from "@/components/RecoilStates/profileState";
import { View, Text } from "react-native";
import TabHeaderButtons from "../Common/TabHeaderButtons";
import { useState } from "react";
import { useTheme } from "@/components/Themes/theme";
import PortofolioContent from "./PortofolioContent";
import NewPortofolioContentForm from "./NewPortofolioContentForm";

const PortofolioContentTab = () => {
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [create, setCreate] = useState<() => void>(() => null);

  const theme = useTheme();

  const [aboutYou, setAboutYou] = useAboutYouState();
  const portofolioContents = usePortfolioContentsValue();

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        justifyContent: "flex-start",
      }}
    >
      <TabHeaderButtons
        editMode={editMode}
        setEditMode={setEditMode}
        showPlayButton={true}
        disableEditMode={false}
        createMode={createMode}
        setCreateMode={setCreateMode}
        onDone={() => create()}
      />
      {createMode ? (
        <NewPortofolioContentForm
          setCreate={setCreate}
          setCreateMode={setCreateMode}
        />
      ) : (
        <>
          <Text
            style={{
              ...theme.customFonts.primary.small,
              fontSize: 14,
              padding: 10,
              flex: 1,
              flexGrow: 1,
            }}
            numberOfLines={14}
            ellipsizeMode="tail"
          >
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
            dwsaoihdsaoisdahsdaoilsdhaosdiallhdsaoiasdhsdaoadshdsalk shasldk
            hadslk shsadl ladsh dsals adaksdalk
          </Text>
          {portofolioContents &&
            portofolioContents.map((content, index) => (
              <PortofolioContent key={index} portofolioContent={content} />
            ))}
        </>
      )}
    </View>
  );
};

export default PortofolioContentTab;
