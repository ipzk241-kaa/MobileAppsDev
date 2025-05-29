import React from "react";
import { View, FlatList, Text, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const ChatsList = ({ chats }) => {
  const { theme } = useTheme();

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "online":
        return "blue";
      case "offline":
        return "transparent";
      default:
        return "transparent";
    }
  };

  const renderChatItem = ({ item }) => (
    <ChatItem>
      <ImageContainer>
        <UserImage source={item.image} />
        <StatusCircle backgroundColor={getStatusColor(item.status)} />
      </ImageContainer>
      <ChatDetails>
        <StyledText color={theme.text1}>{item.name}</StyledText>
        <View style={{ flexDirection: "row" }}>
          <StyledText color={theme.text2}>{item.message}</StyledText>
          <StyledText color={theme.text2}> • {item.time}</StyledText>
        </View>
      </ChatDetails>
      {item.unread > 0 ? (
        <Unread>{item.unread}</Unread>
      ) : item.isReaded ? (
        <ReadedCircle />
      ) : null}
    </ChatItem>
  );

  return (
    <ChatContainer>
      <FlatList
        data={chats}
        renderItem={renderChatItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
      />
    </ChatContainer>
  );
};

export default ChatsList;

const ChatContainer = styled.View`
  flex: 1;
`;

const ChatItem = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 10px;
  gap: 10px;
`;

const ImageContainer = styled.View`
  height: auto;
  position: relative;
`;

const UserImage = styled.Image`
  width: 52px;
  height: 52px;
  border-radius: 26px;
`;

const StatusCircle = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 8px;
  position: absolute;
  right: 3px;
  bottom: 5px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const ChatDetails = styled.View`
  flex: 1;
  justify-content: center;
`;

const StyledText = styled.Text`
  color: ${(props) => props.color || "black"};
`;

const Unread = styled.Text`
  color: white;
  background-color: rgb(9, 119, 162);
  border-radius: 10px;
  height: 20px;
  width: 20px;
  text-align: center;
  margin-left: 5px;
`;

const ReadedCircle = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 5px;
  background-color: white;
  margin-right: 5px;
`;
