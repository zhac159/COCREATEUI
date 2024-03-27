import { Dimensions } from "react-native";

export const windowHeight = Math.max(Dimensions.get("window").width, Dimensions.get("window").height);

export const windowWidth = Math.min(Dimensions.get("window").width, Dimensions.get("window").height);

export const tabBarHeight = 81;
