import { ReviewDTO } from "@/common/api/model/reviewDTO";
import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";


type ReivewProps = {
  review: ReviewDTO;
};


const Review: FC<ReivewProps> = ({ review }) => {
  return (
    <View>
      <Text>{review.rating}</Text>
    </View>
  );
};


export default Review;

const styles = StyleSheet.create({

});