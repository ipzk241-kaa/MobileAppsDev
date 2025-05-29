import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Game from "./Game";

const GameList = ({ games }) => {
  const [infiniteGames, setInfiniteGames] = useState([...games, ...games]); 
    const duplicateGames = () => {
      setInfiniteGames((prevGames) => [...prevGames, ...games]);
    };
  
    const handleEndReached = () => {
      duplicateGames();
    };
  const renderItem = ({ item }) => <Game game={item} />;

  return (
    <FlatList
      data={infiniteGames}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={renderItem}
      decelerationRate="fast"
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({});

export default GameList;