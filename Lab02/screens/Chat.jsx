import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../config/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";
import TabMenu from "../components/TabMenu";
import CustomHeader from "../components/Header";
import ChatsList from "../components/ChatsList";
import { chats } from "../assets/ChatData";
import Friends from "../components/Friends";

const Chat = () => {
  const { theme } = useTheme();

  const tabs = [
    {
      id: "openChats",
      label: "Open chats",
      component: <ChatsList chats={chats} />,
    },
    { id: "myFriends", label: "My friends", component: <Friends /> },
  ];

  return (
    <View style={[{ flex: 1, backgroundColor: theme.background }]}>
      <CustomHeader isSearchEnabled={true} title={"Chat"} />
      <View style={styles.chatContainer}>
        <TabMenu tabs={tabs} initialTab="openChats" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    padding: 15,
    flex: 1,
  },
});

export default Chat;