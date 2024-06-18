import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import MealList from '../mealComponents/MealList';


const AddMealScreen = () => {

  const [currentDate, setCurrentDate] = useState(dayjs());
  const nextDay = () => {
      setCurrentDate(currentDate.add(1, 'day'));
  };
  const prevDay = () => {
      setCurrentDate(currentDate.subtract(1, 'day'));
  };

  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);

  const formatDate = (date) => {
      const now = dayjs();
      if (date.isSame(now, 'day')) {
          return "Today";
      } else {
          return date.format('MMMM D, YYYY');
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="<" onPress={prevDay} />
        <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
        <Button title=">" onPress={nextDay} />
      </View>
      <MealList currentDate={currentDate} />
    </View>
  );
};
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  dateText: {
    fontSize: 20,
  },
  timeline: {
    flex: 1,
    paddingTop: 20,
  }
});

export default AddMealScreen;
