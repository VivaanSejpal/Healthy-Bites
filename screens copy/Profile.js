/* The above code is importing necessary components and libraries for a React Native app. It is also
importing Firebase and Expo libraries. The code is also preventing the app from auto-hiding the
splash screen using the `SplashScreen.preventAutoHideAsync()` method. */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Switch,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

import firebase from "firebase";
/* The above code is using the Expo SDK to prevent the automatic hiding of the splash screen in a
JavaScript application. The `import` statement is importing the `expo-splash-screen` module, which
provides methods for controlling the splash screen behavior. The
`SplashScreen.preventAutoHideAsync()` method is then called to prevent the splash screen from
automatically hiding. */
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class Profile extends Component {
  /**
   * This is a constructor function that initializes the state of a component in a React application.
   * @param props - props is an object that contains all the properties passed to a component. It can
   * include both user-defined properties and built-in properties like children and className. In this
   * case, the constructor is using props to initialize the state of the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      isEnabled: false,
      activateLightTheme: true,
      profile_image: "",
      name: "",
    };
  }
  /**
   * The function loads fonts asynchronously and fetches user data on component mount.
   */
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
  /**
   * This function loads custom fonts asynchronously in JavaScript.
   */
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  /**
   * This function fetches user data from a Firebase database and updates the state of the component
   * with the retrieved data.
   */
  async fetchUser() {
    let themefromDB, name, image;
    /* This code is fetching user data from a Firebase database and updating the state of the component
    with the retrieved data. It is using the `on()` method to listen for changes to the data at the
    specified database reference (`/users/` + current user's UID). When the data changes, the
    callback function is executed and the `snapshot` object contains the updated data. The code is
    then extracting the `current_theme`, `first_name`, `last_name`, and `profile_picture` values
    from the `snapshot` object and storing them in variables `themefromDB`, `name`, and `image`,
    respectively. These values are then used to update the state of the component. The `await`
    keyword is used to wait for the asynchronous database call to complete before continuing with
    the execution of the function. */
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        themefromDB = snapshot.val().current_theme;
        name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
        image = snapshot.val().profile_picture;
    });
    /* This code is updating the state of the component with the values retrieved from a Firebase
    database. It sets the `activateLightTheme` state to `true` if the `current_theme` value in the
    database is "light", and `false` otherwise. It sets the `isEnabled` state to `false` if the
    `current_theme` value in the database is "light", and `true` otherwise. It sets the `name` state
    to the user's first and last name retrieved from the database, and the `profile_image` state to
    the user's profile picture retrieved from the database. */
    this.setState({
      activateLightTheme: themefromDB === "light" ? true : false,
      isEnabled: themefromDB === "light" ? false : true,
      name: name,
      profile_image: image,
    });
  }
  /**
   * This function toggles between a dark and light theme and updates the user's current theme in the
   * Firebase database.
   */
  toggleSwitch() {
    /* `const previous_state = this.state.isEnabled;` is assigning the current value of the `isEnabled`
    state to a constant variable `previous_state`. This is done so that the value of `isEnabled` can
    be toggled later in the `toggleSwitch()` function. By assigning the current value of `isEnabled`
    to `previous_state`, the function can toggle the value of `isEnabled` and update the state
    accordingly. */
    const previous_state = this.state.isEnabled;

    /* `const theme = !this.state.isEnabled ? "dark" : "light";` is a ternary operator that sets the
    value of the `theme` variable based on the value of the `isEnabled` state. 

    if current theme before clicking the toggle was dark.. that means this.state.isEnabled = previous_state = true
    ! this.state.isEnabled ? "dark" : "light"
    NOT true      == true  ? dark: light
    so now theme will be set to LIGHT


    if current theme before clicking the toggle was light.. that means this.state.isEnabled = previous_state = false
    ! this.state.isEnabled ? "dark" : "light"
    NOT false     == true  ? dark: light
    so now theme will be set to DARK
    
    This variable  is later used to update the user's current theme in the Firebase database.
    
    */
    const theme = ! this.state.isEnabled ? "dark" : "light";

    /* `var updates = {};` is initializing an empty object called `updates`. This object is later used
   to update the Firebase database with the user's current theme. The `updates` object is passed as
   an argument to the `update()` method of the Firebase database, which updates the specified
   database reference with the new data. By initializing an empty object, the code can add new
   key-value pairs to the object as needed before passing it to the `update()` method. */
    var updates = {};

    /* The above code is updating the current theme of the user in the Firebase Realtime Database. It
    is creating a new entry in the "updates" object with the key "/users/{current user's
    UID}/current_theme" and the value of the "theme" variable. This update will be sent to the
    Firebase Realtime Database when the updates object is passed to the database's update() method. */
    updates["/users/" + firebase.auth().currentUser.uid + "/current_theme"] = theme;

    /* The above code is updating the Firebase Realtime Database with the `updates` object. It then
    sets the state of the component by toggling the `isEnabled` boolean value and setting the
    `activateLightTheme` value to the previous state. */
    firebase.database().ref().update(updates);
    this.setState({
      isEnabled: !previous_state,
      activateLightTheme: previous_state,
    });
  }

  render() {
    if (this.state.fontsLoaded) {
      /* `SplashScreen.hideAsync();` is a method from the Expo SplashScreen module that hides the app's
      splash screen. The method is called in the `render()` function of the `Profile` component
      after the custom fonts have been loaded. It prevents the app's splash screen from being
      displayed indefinitely and ensures that the app's UI is displayed to the user. */
      SplashScreen.hideAsync();

      return (
        /* This code is defining a `View` component with a conditional style
        based on the value of
        `this.state.activateLightTheme`.
         If `this.state.activateLightTheme` is true, it applies the
        `styles.containerLight` style, otherwise it applies the `styles.container` style. */
        <View
          style={
            this.state.activateLightTheme
              ? styles.containerLight
              : styles.container
          }
        >
          {/* The above code is written in JavaScript and it defines a component called SafeAreaView with a
   style property called droidSafeArea. This component is typically used in React Native
   applications to ensure that the content is displayed within the safe area of the device screen,
   avoiding any notches or other obstructions. */}
          <SafeAreaView style={styles.droidSafeArea} />

          {/* The above code is rendering a view component that displays the app title and logo for a
         storytelling app. The app title is displayed as "Storytelling App" and the logo is an image
         file located in the assets folder. The style of the app title text is determined by the
         state of the component's "activateLightTheme" property. If the property is true, the text
         is styled with a light theme, otherwise it is styled with a default theme. */}
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text
                style={
                  this.state.activateLightTheme
                    ? styles.appTitleTextLight
                    : styles.appTitleText
                }
              >
                HealthyBites
              </Text>
            </View>
          </View>

          <View style={styles.screenContainer}>
            <View style={styles.profileImageContainer}>
              {/* The above code is rendering an image component in a React Native application. The
              image source is being set dynamically using the `this.state.profile_image` variable,
              which is likely being updated based on user input or data from an API. The `style`
              prop is being used to apply custom styles to the image component, specifically the
              `profileImage` style defined elsewhere in the code. */}
              <Image
                source={{ uri: this.state.profile_image }}
                style={styles.profileImage}
              ></Image>
              {/* The above code is rendering a Text component with the text
              content of the state variable "name". The style of the Text
              component is determined by a ternary operator that checks the
              value of the state variable "activateLightTheme". If it is true,
              the style "nameTextLight" is applied, otherwise the style
              "nameText" is applied. */}
              <Text
                style={
                  this.state.activateLightTheme
                    ? styles.nameTextLight
                    : styles.nameText
                }
              >
                {this.state.name}
              </Text>
            </View>

            <View style={styles.themeContainer}>
              {/* The above code is rendering a Text component with a conditional style based on the
              state of `activateLightTheme`. If `activateLightTheme` is true, it applies the
              `themeTextLight` style, otherwise it applies the `themeText` style. The text inside
              the component provides instructions for toggling between light and dark themes. */}
              <Text
                style={
                  this.state.activateLightTheme
                    ? styles.themeTextLight
                    : styles.themeText
                }
              >
                Toggle to right for DARK Theme. {"\n"}
                Toggle to left for LIGHT Theme.
              </Text>

              {/* `<Switch>` is a component from the `react-native` library that renders a toggle
              switch. */}
              <Switch
                /* The above code is setting the CSS transform property of an element to scale it by a
                factor of 1.3 in both the X and Y directions. */
                style={{ transform: [{ scaleX: 1.7 }, { scaleY: 1.5 }] }}
                /* `trackColor` is a prop for the `Switch` component in React Native that sets the
                color of the track (the background of the switch) when the switch is in the on or
                off position. */
                trackColor={{
                  false: "#767577",
                  true: this.state.activateLightTheme ? "#eee" : "white",
                }}
                /* `thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}` is setting the color of
                the thumb (the circular button that slides along the track of the switch) of the
                `Switch` component based on the value of the `isEnabled` state. If `isEnabled` is
                `true`, the thumb color is set to `#ee8249`, which is a shade of orange. If
                `isEnabled` is `false`, the thumb color is set to `#f4f3f4`, which is a light gray
                color.*/
                thumbColor={this.state.isEnabled ? "#ee8249" : "#f4f3f4"}
                /* `ios_backgroundColor="#3e3e3e"` is setting the background color of the switch
                component on iOS devices. This prop is specific to iOS and is used to set the color
                of the switch's background when it is in the off position. In this case, the color
                is set to a dark gray color (#3e3e3e). */
                ios_backgroundColor="#3e3e3e"
                /* `onValueChange={() => this.toggleSwitch()}` is setting the `onValueChange` prop of
                the `Switch` component to a function that calls the `toggleSwitch` method of the
                `Profile` component when the user toggles the switch. This allows the `toggleSwitch`
                method to be executed whenever the user changes the value of the switch, which in
                turn updates the state of the component and the value of the switch accordingly. */
                onValueChange={() => this.toggleSwitch()}
                /* `value={this.state.isEnabled}` is setting the initial value of the `Switch`
                component based on the value of the `isEnabled` state. If `isEnabled` is `true`, the
                switch will be in the on position, and if `isEnabled` is `false`, the switch will be
                in the off position. When the user toggles the switch, the `onValueChange` function
                is called, which updates the `isEnabled` state and the value of the `Switch`
                component accordingly. */
                value={this.state.isEnabled}
              />
            </View>
            <View style={{ flex: 0.3 }} />
          </View>
          <View style={{ flex: 0.08 }} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: "row",
  },
  appIcon: {
    flex: 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  iconImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: "center",
  },
  appTitleText: {
    color: "white",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  appTitleTextLight: {
    color: "black",
    fontSize: RFValue(28),
    fontFamily: "Bubblegum-Sans",
  },
  screenContainer: {
    flex: 0.85,
  },
  profileImageContainer: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
  },

  nameText: {
    color: "white",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10),
  },
  nameTextLight: {
    color: "black",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginTop: RFValue(10),
  },
  themeContainer: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: RFValue(20),
  },
  themeText: {
    color: "white",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15),
  },
  themeTextLight: {
    color: "black",
    fontSize: RFValue(30),
    fontFamily: "Bubblegum-Sans",
    marginRight: RFValue(15),
  },
});
