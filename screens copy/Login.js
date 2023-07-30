/* The LoginScreen class is a React Native component that allows users to log in to the app using their
email and password, and it uses Firebase for authentication. */
import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";

import firebase from "firebase";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";

/* This code is importing the `SplashScreen` module from the `expo-splash-screen` library and using the
`preventAutoHideAsync()` method to prevent the app's splash screen from automatically hiding. This
is useful for cases where you want to ensure that certain tasks (such as loading fonts or data) are
completed before the splash screen disappears. Once these tasks are completed, the
`SplashScreen.hideAsync()` method can be used to hide the splash screen. */
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

/* `let customFonts` is declaring a variable that contains an object with a key-value pair. The key is
`"Bubblegum-Sans"` and the value is the result of calling the `require()` function to import a font
file located at `"../assets/fonts/BubblegumSans-Regular.ttf"`. This font file is then used in the
`LoginScreen` component to style text elements with the "Bubblegum-Sans" font family. */
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

/* `const appIcon = require("../assets/logo.png");` is importing the image file `logo.png` from the
`assets` folder and assigning it to the variable `appIcon`. This variable is then used in the
`Image` component in the `render` method to display the app icon on the login screen. */
const appIcon = require("../assets/logo.png");

/* This line of code is exporting a default class component called `LoginScreen` that extends the
`Component` class from the `react` library. This component can be imported and used in other parts
of the application. */
export default class LoginScreen extends Component {
  /**
   * This is a constructor function that initializes the state of an object with email, password,
   * fontsLoaded, and userSignedIn properties.
   * @param props - props is an object that contains properties passed down from a parent component to
   * this component. It can include data, functions, and other values that are needed by the component.
   * In this case, the constructor is using props to initialize the state of the component.
   */
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      fontsLoaded: false,
      userSignedIn: false,
    };
  }
  /**
   * This function loads custom fonts asynchronously in JavaScript.
   */
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  /**
   * This is a React component lifecycle method that calls a function to load fonts asynchronously.
   */
  componentDidMount() {
    this._loadFontsAsync();
  }

  /* `signIn` is a method that uses Firebase authentication to sign in a user with their email and
  password. It takes in two parameters, `email` and `password`, and uses them to call the
  `signInWithEmailAndPassword` method from the Firebase `auth()` object. If the sign-in is
  successful, it navigates the user to the "Dashboard" screen using
  `this.props.navigation.replace("Dashboard")`. If there is an error, it displays an alert with the
  error message using `Alert.alert(error.message)`. The method is declared as `async` because the
  `signInWithEmailAndPassword` method returns a promise that resolves with a user credential object
  if the sign-in is successful, or rejects with an error if there is an issue. */
  signIn = async (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.props.navigation.replace("Dashboard");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  render() {
    if (this.state.fontsLoaded) {
      /* `SplashScreen.hideAsync();` is a method call that hides the app's splash screen once the fonts
      have finished loading. The `SplashScreen` module is imported from the `expo-splash-screen`
      library, and the `hideAsync()` method is used to hide the splash screen after the
      `fontsLoaded` state property is set to `true`. This ensures that the splash screen is only
      hidden after all necessary tasks (such as loading fonts or data) have been completed. */
      SplashScreen.hideAsync();
      /* `const { email, password } = this.state;` is destructuring the `email` and `password`
      properties from the `state` object of the `LoginScreen` component. This allows the `email` and
      `password` values to be used directly in the `render` method without having to reference them
      as `this.state.email` and `this.state.password`. This syntax is equivalent to `const email =
      this.state.email; const password = this.state.password;`. */
      const { email, password } = this.state;

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />

          <Text style={styles.appTitleText}>HealthyBites</Text>
         {/* `<Image source={appIcon} style={styles.appIcon} />` is rendering an `Image` component with
          the `source` prop set to the `appIcon` variable, which contains the image file `logo.png`
          imported from the `assets` folder. The `style` prop is setting the style of the image,
          including the width, height, and margin bottom. This code is displaying the app icon on
          the login screen. */}
          <Image source={appIcon} style={styles.appIcon} />

          {/* This code is rendering a text input field for the user to enter their email. The `style`
          prop is setting the style of the text input field, including a margin top of 0 units. The
          `onChangeText` prop is setting a function to be called whenever the text in the input
          field changes, which updates the `email` property in the component's state with the new
          text. The `placeholder` prop is setting the placeholder text to be displayed in the input
          field before the user enters any text. The `placeholderTextColor` prop is setting the
          color of the placeholder text to white. The `autoFocus` prop is setting the input field to
          automatically receive focus when the screen is loaded, so the user can start typing their
      email right away. */}
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({ email: text })}
            placeholder={"Enter Email"}
            placeholderTextColor={"#FFFFFF"}
            autoFocus
          />

          {/* This code is rendering a text input field for the user to enter their password. The
          `style` prop is setting the style of the text input field, including a margin top of 20
          units. The `onChangeText` prop is setting a function to be called whenever the text in the
          input field changes, which updates the `password` property in the component's state with
          the new text. The `placeholder` prop is setting the placeholder text to be displayed in
          the input field before the user enters any text. The `placeholderTextColor` prop is
          setting the color of the placeholder text to white. The `secureTextEntry` prop is setting
    the input field to display the entered text as asterisks or dots for security purposes. */}
          <TextInput
            style={[styles.textinput, { marginTop: 20 }]}
            onChangeText={(text) => this.setState({ password: text })}
            placeholder={"Enter Password"}
            placeholderTextColor={"#FFFFFF"}
            secureTextEntry
          />

          {/* This code is rendering a `TouchableOpacity` component that displays the text "Login" and
          is wrapped in a touchable area. When the user presses on this touchable area, the
          `onPress` prop is triggered, which calls the `signIn` method with the `email` and
          `password` values from the component's state. This allows the user to log in to the app
          using their email and password. The `style` prop is setting the style of the touchable
          area, including a margin top of 20 units. The `Text` component inside the
          `TouchableOpacity` is setting the style of the text to be displayed inside the touchable
          area. */}
          <TouchableOpacity
            style={[styles.button, { marginTop: 20 }]}
            onPress={() => this.signIn(email, password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          {/* This code is rendering a `TouchableOpacity` component that displays the text "New User ?"
          and is wrapped in a touchable area. When the user presses on this touchable area, the
          `onPress` prop is triggered, which navigates the user to the "RegisterScreen" using
          `this.props.navigation.navigate("RegisterScreen")`. This allows the user to navigate to
        the registration screen if they are a new user and need to create an account. */}
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonTextNewUser}>New User ?</Text>
          </TouchableOpacity>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#15193c",
    alignItems: "center",
    justifyContent: "center",
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35),
  },
  appIcon: {
    width: RFValue(200),
    height: RFValue(200),
    resizeMode: "contain",
    marginBottom: RFValue(20),
  },
  appTitleText: {
    color: "white",
    textAlign: "center",
    fontSize: RFValue(40),
    fontFamily: "Bubblegum-Sans",
    marginBottom: RFValue(20),
  },
  textinput: {
    width: RFValue(250),
    height: RFValue(50),
    padding: RFValue(10),
    borderColor: "#FFFFFF",
    borderWidth: RFValue(4),
    borderRadius: RFValue(10),
    fontSize: RFValue(20),
    color: "#FFFFFF",
    backgroundColor: "#15193c",
    fontFamily: "Bubblegum-Sans",
  },
  button: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: RFValue(30),
    backgroundColor: "white",
    marginBottom: RFValue(20),
  },
  buttonText: {
    fontSize: RFValue(24),
    color: "#15193c",
    fontFamily: "Bubblegum-Sans",
  },
  buttonTextNewUser: {
    fontSize: RFValue(12),
    color: "#FFFFFF",
    fontFamily: "Bubblegum-Sans",
    textDecorationLine: "underline",
  },
});
