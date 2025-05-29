import { View, Text, Image } from "react-native";
import { useTheme } from "../config/ThemeContext";
import styled from "styled-components/native";

const Game = ({ game }) => {
  const { theme } = useTheme();

  return (
    <Item>
      <GameImage source={game.image} />
      <InfoContainer>
        <Title color={theme.text1}>
          {game.title} {game.isTM && "™"}
        </Title>
        <PlatformsContainer>
          {game.platforms.map((platform) => (
            <Platform key={platform.id}>
              <PlatformIcon
                source={platform.icon}
                tintColor={theme.iconNonActive}
              />
            </Platform>
          ))}
          {game.platforms.map((platform, index) => (
            <Platform key={platform.id}>
              <PlatformText color={theme.text2}>
                {platform.name}
                {index < game.platforms.length - 1 && ","}
              </PlatformText>
            </Platform>
          ))}
        </PlatformsContainer>
      </InfoContainer>
      <PriceContainer>
        <PriceBox>
          {game.discount > 0 && (
            <OldPrice color={theme.text2}>${game.price}</OldPrice>
          )}
          <NewPrice color={theme.text1}>
            ${Math.round(game.price - game.price * game.discount)}
          </NewPrice>
        </PriceBox>
        {game.discount > 0 && (
          <DiscountBox>
            <DiscountText color={theme.text1}>
              -{Math.round(game.discount * 100)}%
            </DiscountText>
          </DiscountBox>
        )}
      </PriceContainer>
    </Item>
  );
};

const Item = styled.View`
  flex-direction: row;
  align-items: center;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const GameImage = styled.Image`
  width: 72px;
  height: 50px;
  border-radius: 8px;
  object-fit: cover;
`;

const InfoContainer = styled.View`
  flex: 1;
  margin-left: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.color || "black"};
`;

const PlatformsContainer = styled.View`
  flex-direction: row;
  margin-top: 5px;
`;

const Platform = styled.View`
  flex-direction: row;
  align-items: center;
  margin-right: 4px;
`;

const PlatformIcon = styled.Image`
  width: 11px;
  height: 14px;
  margin-right: 5px;
  fill: ${(props) => props.tintColor || "black"};
`;

const PlatformText = styled.Text`
  font-size: 12px;
  color: ${(props) => props.color || "black"};
`;

const PriceContainer = styled.View`
  align-items: flex-end;
`;

const PriceBox = styled.View`
  flex-direction: row;
  align-items: flex-end;
  gap: 5px;
`;

const OldPrice = styled.Text`
  text-decoration-line: line-through;
  font-family: "pingfang-sc-regular";
  font-size: 12px;
  color: ${(props) => props.color || "black"};
`;

const NewPrice = styled.Text`
  font-family: "pingfang-sc-regular";
  font-size: 18px;
  color: ${(props) => props.color || "black"};
`;

const DiscountBox = styled.View`
  background-color: #16a34a;
  padding: 4px;
  border-radius: 5px;
  margin-top: 4px;
`;

const DiscountText = styled.Text`
  font-size: 12px;
  font-family: "pingfang-sc-regular";
  color: ${(props) => props.color || "black"};
`;

export default Game;
