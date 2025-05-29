import React, { useState } from "react";
import { View, FlatList } from "react-native";
import CommunityContentCard from "./CommunityContentCard";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const NewsCardList = ({ news }) => {
  const { theme } = useTheme();
  const [infiniteNews, setInfiniteNews] = useState([...news]);

  const loadMoreNews = () => {
    setInfiniteNews((prevNews) => [...prevNews, ...news]);
  };

  const handleEndReached = () => {
    loadMoreNews();
  };

  const renderItem = ({ item }) => <CommunityContentCard content={item} />;

  return (
    <Container>
      <FlatList
        data={infiniteNews}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        ListHeaderComponent={() => (
          <HeaderSeparator backgroundColor={theme.backgroundBlacker} />
        )}
        ItemSeparatorComponent={() => (
          <ItemSeparator backgroundColor={theme.backgroundBlacker} />
        )}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const HeaderSeparator = styled.View`
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

const ItemSeparator = styled.View`
  width: 100%;
  height: 8px;
  background-color: ${(props) => props.backgroundColor || "transparent"};
`;

export default NewsCardList;
