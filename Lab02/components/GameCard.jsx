import React from "react";
import { Dimensions, Image } from "react-native";
import styled from "styled-components";

const { width } = Dimensions.get("window");

const GameItem = styled.ImageBackground`
  width: ${width - 60}px;
  height: 230px;
  border-radius: 10px;
  overflow: hidden;
  flex-direction: row;
  align-items: flex-end;
  margin-right: 10px;
`;

const GameInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding: 15px;
  gap: 5px;
`;

const GameTitle = styled.Text`
  font-family: "ABeeZee-Regular";
  color: rgb(255, 255, 255);
  font-size: 20px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-family: "ABeeZee-Regular";
  color: rgb(240, 228, 228);
  font-size: 13px;
  overflow: visible;
`;

const PriceContainer = styled.View`
  width: auto;
  overflow: hidden;
  flex-direction: row;
  align-items: center;
  border-radius: 0;
`;

const PriceBox = styled.Text`
  color: rgb(255, 255, 255);
  font-size: 12px;
  padding: 1px 6px 1px 5px;
  border-radius: 3px;
`;

const Discount = styled(PriceBox)`
  background-color: rgba(5, 238, 1, 0.5);
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
`;

const Price = styled.View`
  background-color: rgba(0, 0, 0, 0.64);
  flex-direction: row;
  font-family: "pingfang-sc-regular";
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 1px 6px 1px 5px;
  border-radius: 3px;
`;

const OldPrice = styled.Text`
  text-decoration-line: line-through;
  font-family: "pingfang-sc-regular";
  color: rgb(221, 214, 214);
  font-size: 12px;
`;

const NewPrice = styled.Text`
  color: rgb(255, 255, 255);
  font-family: "pingfang-sc-regular";
  font-size: 12px;
  padding-left: 5px;
`;

const Icon = styled.Image`
  width: 16.5px;
  height: 16.5px;
  margin-right: 10px;
  margin-bottom: 20px;
`;

const GameCard = ({ game }) => {
  return (
    <GameItem source={game.image} resizeMode="cover">
      <GameInfo>
        <GameTitle>{game.title}</GameTitle>
        <Description>{game.info}</Description>

        <PriceContainer>
          {game.discount > 0 && (
            <Discount>-{Math.round(game.discount * 100)}%</Discount>
          )}

          <Price>
            {game.discount > 0 && (
              <OldPrice>$ {Math.round(game.price)}</OldPrice>
            )}
            <NewPrice>
              $ {Math.round(game.price - game.price * game.discount)}
            </NewPrice>
          </Price>
        </PriceContainer>
      </GameInfo>
      <Icon source={require("../assets/images/windows_icon.png")} />
    </GameItem>
  );
};

export default GameCard;
