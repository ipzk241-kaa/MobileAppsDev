const popularGames = [
  {
    id: 1,
    title: "Dead by Daylight",
    image: require("../assets/images/dbd.png"),
    info: "Recommended by your friend, Player",
    price: 18,
    discount: 0.7,
  },
  {
    id: 2,
    title: "Dead by Daylight",
    image: require("../assets/images/dbd.png"),
    info: "Recommended by your friend, Vitalik",
    price: 18,
    discount: 0.7,
  },
  {
    id: 3,
    title: "Dead by Daylight",
    image: require("../assets/images/dbd.png"),
    info: "Some new game",
    price: 18,
    discount: 0,
  },
];

const games = [
  {
    id: 1,
    title: "Grand Theft Auto V",
    image: require("../assets/images/gta5.png"),
    info: "Recommended by your friend, Player",
    platforms: [
      {
        id: 1,
        name: "Windows",
        icon: require("../assets/images/windows_icon.png"),
      },
    ],
    price: 20,
    discount: 0.5,
    isTM: false,
  },
  {
    id: 2,
    title: "Battlefield 4",
    image: require("../assets/images/battlefield4.png"),
    info: "Recommended by your friend, Player",
    platforms: [
      {
        id: 1,
        name: "Windows",
        icon: require("../assets/images/windows_icon.png"),
      },
    ],
    price: 35,
    discount: 0,
    isTM: true,
  },
  {
    id: 3,
    title: "Factorio",
    image: require("../assets/images/factorio.png"),
    info: "Recommended by your friend, Player",
    platforms: [
      {
        id: 1,
        name: "Windows",
        icon: require("../assets/images/windows_icon.png"),
      },
      {
        id: 2,
        name: "Mac",
        icon: require("../assets/images/mac_icon.png"),
      },
    ],
    price: 7,
    discount: 0,
    isTM: false,
  },
  {
    id: 4,
    title: "Horizon Zero Dawn",
    image: require("../assets/images/horizon.png"),
    info: "Recommended by your friend, Player",
    platforms: [
      {
        id: 1,
        name: "Windows",
        icon: require("../assets/images/windows_icon.png"),
      },
    ],
    price: 38,
    discount: 0,
    isTM: false,
  },
  {
    id: 5,
    title: "Horizon Zero Dawn",
    image: require("../assets/images/horizon.png"),
    info: "Recommended by your friend, Player",
    platforms: [
      {
        id: 1,
        name: "Windows",
        icon: require("../assets/images/windows_icon.png"),
      },
    ],
    price: 38,
    discount: 0,
    isTM: false,
  },
];

export { popularGames, games };
