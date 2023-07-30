/**
 * The code initializes a Firebase app and creates a stack navigator with three screens for a React
 * Native app.
 * @returns The `App` function is returning a `NavigationContainer` component with a `StackNav`
 * component inside it. The `StackNav` component is a `StackNavigator` object that defines a stack of
 * screens for the app, including `LoginScreen`, `RegisterScreen`, and `Dashboard`. The
 * `NavigationContainer` component is a container for the app's navigation state and provides a way to
 * navigate between different screens.
 */

import * as React from "react";

/* These lines of code are importing necessary components from the `@react-navigation/native` and
`@react-navigation/stack` libraries, and a custom `DrawerNavigator` component from a local file. */
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DrawerNavigator from "./navigation/DrawerNavigator";

import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";

/* These lines of code are importing the `firebase` library and a configuration object `firebaseConfig`
from a local file `config.js`. The `firebase` library is used to initialize and interact with the
Firebase app, while the `firebaseConfig` object contains the necessary configuration information for
the app to connect to the Firebase backend. */
import * as firebase from "firebase";
import { firebaseConfig } from "./config";

/* This code block is initializing the Firebase app with the configuration object `firebaseConfig`. The
`if` statement checks if there are any existing Firebase apps, and if there are none, it initializes
the app with the configuration object. If there are existing apps, it retrieves the default app
instance using `firebase.app()`. This ensures that the app is only initialized once, even if this
code is executed multiple times. */
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

/* `const Stack = createStackNavigator();` is creating a `StackNavigator` object that can be used to
define a stack of screens in the app. The `StackNavigator` is a navigation pattern that allows the
user to navigate between screens by pushing and popping screens onto and off of a stack. The
`createStackNavigator()` function returns a `StackNavigator` object that can be used to define the
screens in the stack. */
const Stack = createStackNavigator();

/**
 * This is a function that returns a stack navigator with three screens - Login, RegisterScreen, and
 * Dashboard - for a React Native app.
 * @returns A Stack Navigator component is being returned with three screens: LoginScreen,
 * RegisterScreen, and Dashboard. The initial route is set to LoginScreen and the header is hidden. The
 * gesture is also disabled.
 *
 *  It is wrapping the `StackNav` component, which is a
 *  `StackNavigator` object that defines a stack of screens for the app, including `LoginScreen`,
 *  `RegisterScreen`, and `Dashboard`. The `StackNav` component is being rendered inside the
 *  `NavigationContainer` component, which provides the necessary navigation context for the screens
 *  defined in the `StackNavigator`. This allows the user to navigate between screens by pushing and
 *  popping screens onto and off of a stack.
 */
const StackNav = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DrawerNavigator} />
    </Stack.Navigator>
  );
};

/**
 * This is a default function that returns a NavigationContainer component with a StackNav component
 * inside.
 * @returns The `App` function is returning a `NavigationContainer` component with a `StackNav`
 * component inside it.
 */
export default function App() {
  /* The `return` statement is returning a `NavigationContainer` component that wraps a `StackNav`
  component. The `StackNav` component is a `StackNavigator` object that defines a stack of screens
  for the app, including `LoginScreen`, `RegisterScreen`, and `Dashboard`. The `NavigationContainer`
  component provides the necessary navigation context for the screens defined in the
  `StackNavigator`, allowing the user to navigate between screens by pushing and popping screens
  onto and off of a stack. The `StackNav` component is being rendered inside the
  `NavigationContainer` component. */
  return (
    /* The `NavigationContainer` component is a container for the app's navigation state and provides a
   way to navigate between different screens. */
    <NavigationContainer>
      {/* `<StackNav/>` is rendering the `StackNav` component, which is a `StackNavigator` object that
      defines a stack of screens for the app, including `LoginScreen`, `RegisterScreen`, and
      `Dashboard`. It is being rendered inside the `NavigationContainer` component, which provides a
      way to navigate between different screens. */}
      <StackNav />
    </NavigationContainer>
  );
}
