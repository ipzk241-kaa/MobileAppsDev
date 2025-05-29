import React from "react";
import { View, Text, FlatList, StyleSheet, Image } from "react-native";

const GameList = ({ games }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.image} style={styles.image} />

      <View style={styles.infoContainer}>
        <Text style={styles.title}>
          {item.title} {item.isTM && "™"}
        </Text>

        <View style={styles.platformsContainer}>
          {item.platforms.map((platform) => (
            <View key={platform.id} style={styles.platform}>
              <Image source={platform.icon} style={styles.platformIcon} />
            </View>
          ))}
          {item.platforms.map((platform, index) => (
            <View key={platform.id} style={styles.platform}>
              <Text style={styles.platformText}>
                {platform.name}
                {index < item.platforms.length - 1 && ","}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.priceContainer}>
        <View style={styles.priceBox}>
          {item.discount > 0 && (
            <Text style={styles.oldPrice}>${item.price}</Text>
          )}
          <Text style={styles.newPrice}>
            ${Math.round(item.price - item.price * item.discount)}
          </Text>
        </View>
        {item.discount > 0 && (
          <View style={styles.discountBox}>
            <Text style={styles.discountText}>
              -{Math.round(item.discount * 100)}%
            </Text>
          </View>
        )}
      </View>
    </View>
  );

  return (
    <FlatList
      data={games}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    width: 72,
    height: 50,
    borderRadius: 8,
    resizeMode: "cover",
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  platformsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  platform: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 4,
  },
  platformIcon: {
    width: 11,
    height: 14,
    marginRight: 5,
  },
  platformText: {
    color: "#A0AEC0",
    fontSize: 12,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  oldPrice: {
    textDecorationLine: "line-through",
    fontFamily: "pingfang-sc-regular",
    color: "#A0AEC0",
    fontSize: 12,
  },
  newPrice: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "pingfang-sc-regular",
    fontSize: 18,
  },
  priceBox: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  discountBox: {
    backgroundColor: "#16A34A",
    padding: 4,
    borderRadius: 5,
    marginTop: 4,
  },
  discountText: {
    color: "rgba(255, 255, 255, 1)",
    fontSize: 12,
    fontFamily: "pingfang-sc-regular",
  },
});

export default GameList;