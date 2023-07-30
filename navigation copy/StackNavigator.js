/* This is a JavaScript code that defines a Stack Navigator component using the `createStackNavigator`
function from the `@react-navigation/stack` library. The Stack Navigator is used to manage the
navigation between screens in a React Native app. */

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import StoryScreen from "../screens/StoryScreen";

/* `const Stack = createStackNavigator();` is importing the `createStackNavigator` function from the
`@react-navigation/stack` library and assigning it to the `Stack` constant. This function is used to
create a stack navigator component that manages the navigation between screens in a React Native
app. */
const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      {/* `<Stack.Screen name="Home" component={TabNavigator} />` is defining a screen in the Stack
      Navigator with the name "Home" and the component `TabNavigator`. This means that when the user
      navigates to the "Home" screen, the `TabNavigator` component will be rendered. */}
      <Stack.Screen name="Home" component={TabNavigator} />
      {/* `<Stack.Screen name="StoryScreen" component={StoryScreen} />` is defining a screen in the
      Stack Navigator with the name "StoryScreen" and the component `StoryScreen`. This means that
      when the user navigates to the "StoryScreen" screen, the `StoryScreen` component will be
      rendered. */}
      <Stack.Screen name="StoryScreen" component={StoryScreen} />
    </Stack.Navigator>
  );
};

/* `export default StackNavigator;` is exporting the `StackNavigator` component as the default export
of the module. This means that when another module imports this module, they can import the
`StackNavigator` component directly without having to specify its name. For example, another module
could import this module like this: `import Navigator from './StackNavigator';` and use the
`StackNavigator` component like this: `<Navigator />`. */
export default StackNavigator;
