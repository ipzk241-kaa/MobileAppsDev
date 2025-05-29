import React from "react";
import { View, Text } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const Friends = () => {
  const { theme } = useTheme();
  const friendsData = [
    { id: "1", name: "Mark Dyson", status: "online" },
    { id: "2", name: "Player123", status: "offline" },
  ];

  return (
    <ChatContainer>
      {friendsData.map((friend) => (
        <ChatItem key={friend.id}>
          <NameText color={theme.text1}>{friend.name}</NameText>
          <StatusText status={friend.status}>{friend.status}</StatusText>
        </ChatItem>
      ))}
    </ChatContainer>
  );
};

const ChatContainer = styled.View``;

const ChatItem = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #333;
`;

const NameText = styled.Text`
  color: ${(props) => props.color || "black"};
`;

const StatusText = styled.Text`
  color: ${(props) => (props.status === "online" ? "green" : "gray")};
`;

export default Friends;
