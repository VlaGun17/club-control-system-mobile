import { ImageSourcePropType } from "react-native";

export interface Item {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType | string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}
