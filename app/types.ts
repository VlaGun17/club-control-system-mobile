import { ImageSourcePropType } from "react-native";

export interface Item {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType | string;
}
