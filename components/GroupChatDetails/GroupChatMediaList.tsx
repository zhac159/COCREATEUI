import ChatType from "@/common/chat/chatType";
import { useSQLiteContext } from "expo-sqlite/next";
import { FC } from "react";
import { FlatList, StyleSheet, View, Text } from "react-native";
import { useFetchUrisByChatId } from "../Account/Common/Media/mediaHelper";
import Media from "../MediaViewer/Media";
import { useTheme } from "../Themes/theme";

type GroupChatMediaListProps = {
  groupChatId: string;
};

const GroupChatMediaList: FC<GroupChatMediaListProps> = ({ groupChatId }) => {
  const theme = useTheme();
  const database = useSQLiteContext();

  const { uris, loading } = useFetchUrisByChatId(database, groupChatId);

  return (
    <View
      style={{
        marginVertical: 10,
        gap: 10,
      }}
    >
      <Text
        style={{
          ...theme.customFonts.primary.medium,
        }}
      >
        Pictures
      </Text>
      <FlatList
        data={uris}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          flexGrow: 1,
          gap: 10,
        }}
        renderItem={({ item }) => {
          return (
            <Media
              uri={item}
              style={{
                width: 150,
                height: 150,
                borderRadius: 10,
              }}
            />
          );
        }}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default GroupChatMediaList;

const styles = StyleSheet.create({});
