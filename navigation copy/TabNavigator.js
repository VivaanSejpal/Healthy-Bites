/* The class DrawerNavigator creates a drawer navigator with screens for home, profile, and logout, and
a custom sidebar menu. */
import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { RFValue } from "react-native-responsive-fontsize";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feed from "../screens/Feed";
import CreateStory from "../screens/CreateStory";
import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

export default class BottomTabNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activateLightTheme: true,
      isUpdated: false,
    };
  }

  /* `renderFeed` is a method that takes in `props` as a parameter and returns a component `<Feed>`
  with an additional prop `setUpdateToFalse` and all the other props passed to it using the spread
  operator `...props`. The `setUpdateToFalse` prop is a function that is used to update the state of
  the `isUpdated` variable to `false`. This method is used to render the `Feed` screen in the
  `Tab.Navigator`. */
  renderFeed = (props) => {
    return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  /* `renderStory` is a method that takes in `props` as a parameter and returns a component
  `<CreateStory>` with an additional prop `setUpdateToTrue` and all the other props passed to it
  using the spread operator `...props`. The `setUpdateToTrue` prop is a function that is used to
  update the state of the `isUpdated` variable to `true`. This method is used to render the
  `CreateStory` screen in the `Tab.Navigator`. */
  renderStory = (props) => {
    return <CreateStory setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  /* `changeUpdated` is an arrow function that sets the state of the `isUpdated` variable to `true`. It
  is called when the `CreateStory` screen is rendered and the user creates a new story. This
  function is passed as a prop to the `CreateStory` component and is used to update the state of the
  `isUpdated` variable in the parent component `BottomTabNavigator`. This state variable is used to
  trigger a re-render of the `Feed` screen when the user navigates back to it, so that the new story
  is displayed in the feed. */
  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  /* `removeUpdated` is an arrow function that sets the state of the `isUpdated` variable to `false`.
  It is called when the `Feed` screen is rendered and the user navigates back to it. This function
  is passed as a prop to the `Feed` component and is used to update the state of the `isUpdated`
  variable in the parent component `BottomTabNavigator`. This state variable is used to trigger a
  re-render of the `Feed` screen when the user navigates back to it, so that any new stories are
  displayed in the feed. */
  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  /**
   * This function sets the state of a component based on the current theme of a user retrieved from a
   * Firebase database.
   */
  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ activateLightTheme: theme === "light" ? true : false });
  }

  render() {
    return (
      <Tab.Navigator
        labeled={false}
        barStyle={
          this.state.activateLightTheme
            ? styles.bottomTabStyleLight
            : styles.bottomTabStyle
        }
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            /* This code block is determining the name of the icon to display for each screen in the
           `Tab.Navigator`. It first initializes the `iconName` variable to `undefined`. Then, it
           checks the `route.name` value to see if it is equal to "Feed" or "Create Story". If it is
           "Feed", it sets the `iconName` to "home" if the screen is currently focused, or
           "home-outline" if it is not focused. If it is "Create Story", it sets the `iconName` to
           "add-circle" if the screen is currently focused, or "add-circle-outline" if it is not
           focused. The `iconName` variable is then used to display the appropriate icon for each
           screen in the `Tab.Navigator`. */
            let iconName;
            if (route.name === "Feed") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Create Story") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            }
            return (
              /* `<Ionicons>` is a component from the `react-native-vector-icons` library that displays
              an icon from the Ionicons icon set. The `name` prop specifies the name of the icon to
              display, which is determined based on the `route.name` value passed to the
              `screenOptions` prop. The `size` prop specifies the size of the icon, which is set to
              `RFValue(25)` using the `react-native-responsive-fontsize` library to ensure that the
              icon size is responsive to different screen sizes. The `color` prop specifies the
              color of the icon, which is determined based on whether the icon is currently focused
              or not. Finally, the `style` prop specifies additional styles to apply to the icon,
              which are defined in the `styles.icons` object. */
              <Ionicons
                name={iconName}
                size={RFValue(25)}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        /* `activeColor` and `inactiveColor` are props passed to the `Tab.Navigator` component from the
       `@react-navigation/material-bottom-tabs` library. They are used to specify the color of the
       icon and label for the active and inactive screens in the bottom tab navigator. In this case,
       `activeColor` is set to `#ee8249` which is a shade of orange, and `inactiveColor` is set to
       `gray`. This means that when a screen is active, its icon and label will be displayed in
       orange, and when it is inactive, they will be displayed in gray. */
        activeColor={"#ee8249"}
        inactiveColor={"gray"}
      >
        {/* This code block is creating a screen for the `Feed` component in the `Tab.Navigator`. The
        `name` prop specifies the name of the screen, which is "Feed". The `component` prop
        specifies the component to render when this screen is active, which is `this.renderFeed`.
        The `options` prop is an object that specifies additional options for the screen. In this
        case, `unmountOnBlur: true` is set, which means that when the user navigates away from this
        screen, the component will be unmounted and its state will be reset. This is useful for
        optimizing performance and memory usage, especially if the component has a lot of data or
        complex logic. */}
        <Tab.Screen
          name="Feed"
          component={this.renderFeed}
          options={{ unmountOnBlur: true }}
        />
        {/* This code block is creating a screen for the "Create Story" component in the
        `Tab.Navigator`. The `name` prop specifies the name of the screen, which is "Create Story".
        The `component` prop specifies the component to render when this screen is active, which is
        `this.renderStory`. The `options` prop is an object that specifies additional options for
        the screen. In this case, `unmountOnBlur: true` is set, which means that when the user
        navigates away from this screen, the component will be unmounted and its state will be
        reset. This is useful for optimizing performance and memory usage, especially if the
        component has a lot of data or complex logic. */}
        <Tab.Screen
          name="Create Story"
          component={this.renderStory}
          options={{ unmountOnBlur: true }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    /* The `position: "absolute"` style property is setting the position of the
    `Tab.Navigator` component to be absolute with respect to its parent
    container. This means that the component will be positioned relative to the
    nearest positioned ancestor element (if any), or to the initial containing
    block (if there is no positioned ancestor). The `absolute` position allows
    the component to be positioned anywhere on the screen, regardless of its
    parent container's position or size. In this case, it is being used to
    position the bottom tab navigator at the bottom of the screen, regardless of
    the size or position of its parent container. */
    position: "absolute",
  },
  bottomTabStyleLight: {
    backgroundColor: "#eaeaea",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    /* The `overflow: "hidden"` style property is used to specify how content that overflows the bounds
    of a container should be handled. In this case, it is being applied to the `bottomTabStyle` and
    `bottomTabStyleLight` styles in the `styles` object of the `BottomTabNavigator` component. */
    overflow: "hidden",
    position: "absolute",
  },
  icons: {
    width: RFValue(30),
    height: RFValue(30),
  },
});
