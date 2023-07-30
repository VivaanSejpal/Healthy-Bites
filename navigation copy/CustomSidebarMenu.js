/* This is a custom sidebar menu component for a React Native app that displays a user's profile icon
and menu items. */
import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

/* Importing two components, `DrawerContentScrollView` and `DrawerItemList`, from the
`@react-navigation/drawer` library. These components are used to create a custom sidebar menu for a
React Native app. */
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export default class CustomSidebarMenu extends Component {
  /* This is the constructor method for the `CustomSidebarMenu` component in a React Native app. It
  initializes the state of the component with a `activateLightTheme` property set to `true`. The
  `super(props)` line calls the constructor of the parent class, which is necessary when defining a
  constructor in a subclass. */
  constructor(props) {
    super(props);
    this.state = {
      activateLightTheme: true,
    };
  }

  /**
   * This function sets the state of a component based on the current theme of the user retrieved from
   * Firebase database.
   */
  componentDidMount() {
    let themefromDB;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        themefromDB = snapshot.val().current_theme;
      });
    this.setState({ activateLightTheme: themefromDB === "light" });
  }

  render() {
    let props = this.props;
    return (
      /* The `View` component with the `style` prop is setting the background color of the custom
     sidebar menu based on the current theme of the user. If the `activateLightTheme` state property
     is `true`, then the background color is set to white. Otherwise, the background color is set to
     a dark blue color with the hex code `#15193c`. The `flex: 1` property is also setting the
     `View` component to take up the full available space within its parent container. */
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.activateLightTheme ? "white" : "#15193c",
        }}
      >
        {/* This code is rendering an image component in the custom sidebar menu for a React Native app.
        The `source` prop specifies the image file to be displayed, which is located in the
        `../assets` directory and has the filename `logo.png`. The `style` prop specifies the
        styling for the image, which includes setting the width and height to a responsive font
        value of 140, setting the border radius to half of the width and height to create a circular
        shape, centering the image horizontally, adding a top margin of 60, and setting the
        resizeMode to "contain" to ensure the entire image is visible within the specified
      dimensions. */}
        <Image
          source={require("../assets/logo.png")}
          style={styles.sideMenuProfileIcon}
        ></Image>
        {/* `<DrawerContentScrollView>` and `<DrawerItemList>` are components from the
       `@react-navigation/drawer` library used to create a custom sidebar menu for a React Native
       app. */}
        <DrawerContentScrollView {...props}>
          {/* `<DrawerItemList {...props} />` is rendering a list of menu items in the custom sidebar menu
       for a React Native app. The `...props` syntax is used to pass all the props received by the
       `CustomSidebarMenu` component to the `DrawerItemList` component, which includes the
       navigation state and navigation actions. This allows the menu items to be clickable and
      navigate to different screens within the app. */}
          <DrawerItemList {...props} />
        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: "center",
    marginTop: RFValue(60),
    resizeMode: "contain",
  },
});
