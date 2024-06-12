import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AddMealScreen from "./screens/AddMealScreen";
import AddFoodScreen from "./screens/AddFoodScreen";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import AntIcon from "react-native-vector-icons/AntDesign";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{ 
                    tabBarIcon: ({ size }) => (
                        <Icon name="cat" size={30} color="#900" />
                    ),
                }}
            />
            <Tab.Screen 
                name="Add Meal" 
                component={AddMealScreen}
                options={{ 
                    tabBarIcon: ({ size }) => (
                        <Icon name="bell" size={30} color="#900" />
                        
                        
                    ),
                }}
            />
            <Tab.Screen 
                name="Add Food" 
                component={AddFoodScreen}
                options={{ 
                    tabBarIcon: ({ size }) => (
                        <Icon name="food-drumstick" size={30} color="#900" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;
