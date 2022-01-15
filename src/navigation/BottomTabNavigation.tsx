import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../types';
import { View, ImageProps, Image } from 'react-native';
import { sharedImages } from '../images';
import { hp, wp } from '../shared/responsive-dimension';
import colors from '../styles/colors';
import Favorite from '../screens/favorite';
import Home from '../screens/home';

const BottomTabsNavigator = createBottomTabNavigator<BottomTabParamList>();

interface TabBarIconProps {
  image: ImageProps;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ image, focused }) => {
  return (
    <View>
      <Image
        source={image}
        resizeMode="contain"
        style={{
          width: wp(30),
          height: hp(30),
          tintColor: focused ? colors.black : colors.inactive,
        }}
      />
    </View>
  );
};

function BottomTabs() {
  return (
    <BottomTabsNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarStyle: {
          height: hp(85),
          paddingVertical: hp(10),
          borderWidth: 1,
        },
        tabBarActiveTintColor: colors.white,
        tabBarLabelStyle: {
          fontSize: hp(12),
        },
      }}>
      <BottomTabsNavigator.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon image={sharedImages['active-cat']} focused={focused} />
          ),
        }}
      />

      <BottomTabsNavigator.Screen
        name="Favorite"
        component={Favorite}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              image={sharedImages['active-heart']}
              focused={focused}
            />
          ),
        }}
      />
    </BottomTabsNavigator.Navigator>
  );
}

export default BottomTabs;
