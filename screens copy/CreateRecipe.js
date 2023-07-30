/* The CreateStory class is a React component that allows users to create and submit a new story with
various fields and options. */


import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
  Button,
  Alert
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
/* `import DropDownPicker from "react-native-dropdown-picker";` is importing the `DropDownPicker`
component from the `react-native-dropdown-picker` library. This component is used to create a
dropdown menu with a list of options, and is used in the `CreateStory` component to allow the user
to select a preview image for their story from a list of options. */
import DropDownPicker from "react-native-dropdown-picker";
import firebase from "firebase";

import * as Font from "expo-font";

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class CreateRecipe extends Component {
  /**
   * This is a constructor function that initializes the state of a component in a React application.
   * @param props - props is an object that contains all the properties passed to a component from its
   * parent component. It can include data, functions, and other values that are needed by the
   * component. In the constructor, props are passed as a parameter to the super() method, which is
   * required when defining a constructor in a class. 
   */
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      previewImage: "image_1",
      dropdownHeight: 40,
    };
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this._loadFontsAsync();
  }

  /**
   * The function adds a story to a Firebase database if all required fields are filled, and displays
   * an error message if any field is missing.
   */
  async addStory() {
   /* The above code is checking if four properties (title, description, story, and moral) exist and
   have a truthy value in the current state object. If all four properties have a truthy value, then
   the code inside the if statement will be executed. */
    if (this.state.title && this.state.description && this.state.story && this.state.moral) {
     /* The above code is creating a new Date object and assigning it to the variable "d". This Date
     object represents the current date and time. */
      var d = new Date();

      /* The above code is creating an object called `storyData` with properties such as
      `preview_image`, `title`, `description`, `story`, `moral`, `created_on`, `author_uid`, and
      `likes`. The values of these properties are being assigned from the corresponding state
      variables. The `created_on` property is being assigned the current date and time as a string.
      The `author_uid` property is being assigned the unique identifier of the current user who is
      logged in. The `likes` property is being initialized to 0. */
      let recipeData = {
        preview_image: this.state.previewImage,
        title: this.state.title,
        description: this.state.description,
        recipe: this.state.recipe,
        moral: this.state.moral,
        author: firebase.auth().currentUser.displayName,
        created_on: d.toString(),
        author_uid: firebase.auth().currentUser.uid,
        likes: 0
      }
      console.log(recipeData);

      /* This code is adding a new story to a Firebase database. It first checks if all required fields
      (title, description, story, and moral) have been filled out by the user. If they have, it
      creates a new object called `storyData` with the values of the fields, as well as some
      additional information such as the preview image, author UID, and number of likes. It then
      uses the Firebase Realtime Database API to add this object as a new child node under the
      `/posts` node in the database, with a randomly generated ID as the key. Once the story has
      been added to the database, it sets the `update` state of the parent component to `true` and
      navigates the user back to the Feed screen. */
      await firebase
        .database()
        .ref("/posts/" + (Math.random().toString(36).slice(2)))
        .set(recipeData)
        .then(function (snapshot) {

        })
     /* The above code is written in JavaScript and it is calling a function named `setUpdateToTrue()`
     on a `props` object. The purpose of this function is not clear from the given code snippet. */
      this.props.setUpdateToTrue();
      /* The above code is written in JavaScript and it is using the `navigation` prop to navigate to
      the "Feed" screen in a mobile app. It is likely being used in a React Native application where
      `this.props.navigation.navigate` is a common way to navigate between screens. */
      this.props.navigation.navigate("Feed");

    } else {
      Alert.alert(
        'Error',
        'All fields are required!',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }
  }

  render() {
   /* This code is checking if the custom fonts used in the component have finished loading. If the
   fonts have finished loading, it calls the `hideAsync()` method from the `expo-splash-screen`
   library to hide the splash screen that is displayed when the app is launched. This ensures that
   the splash screen is only displayed for as long as necessary, and is hidden once the app is ready
   to be used. */
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();


      /* The above code is defining an object called `preview_images` with five properties, each
      representing an image file. The images are being imported using the `require` function and
      their file paths are specified using relative paths. */
      let preview_images = {
        image_1: require("../assets copy/gudpapdi.png"),
        image_2: require("../assets copy/pasta.png"),
        image_3: require("../assets copy/milkshake.png"),
        image_4: require("../assets copy/hummus.png"),
        image_5: require("../assets copy/falafel.png"),
      };

      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require("../assets/logo.png")}
                style={styles.iconImage}
              ></Image>
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>New Recipe</Text>
            </View>
          </View>



          <View style={styles.fieldsContainer}>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}
            ></Image>

            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
             { /* `<DropDownPicker>` is a third-party library component used to create a dropdown menu
              with a list of options. In this code, it is being used to allow the user to select a
              preview image for their story from a list of options. The `items` prop specifies the
              list of options, while the `defaultValue` prop sets the default selected option. The
              `open` prop determines whether the dropdown menu is currently open or closed, and the
              `onOpen` and `onClose` props specify functions to be called when the dropdown menu is
              opened or closed, respectively. The `style` prop sets the styling for the dropdown
              menu, while the `textStyle` prop sets the styling for the text of the selected option.
              The `onSelectItem` prop specifies a function to be called when an option is selected,
              which updates the `previewImage` state with the value of the selected option. */}
              <DropDownPicker
                items={[
                  { label: "Image 1", value: "image_1" },
                  { label: "Image 2", value: "image_2" },
                  { label: "Image 3", value: "image_3" },
                  { label: "Image 4", value: "image_4" },
                  { label: "Image 5", value: "image_5" },
                ]}
                defaultValue={this.state.previewImage}
                open={this.state.dropdownHeight == 170 ? true : false}

                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={{
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "white",
                }}
                textStyle={{
                  color: this.state.dropdownHeight == 170 ? "black" : "white",
                  fontFamily: "Bubblegum-Sans",
                }}
                onSelectItem={(item) =>
                  this.setState({previewImage: item.value,})
                }
              />

            </View>


            {/* The `<ScrollView>` component is a built-in component in React Native that allows for
            scrolling through a list of items or content that exceeds the height of the screen. In
            this case, it is being used to wrap a series of `<TextInput>` components and a
            `<Button>` component to create a form for users to input information for a new story.
            The `<TextInput>` components are used to capture the title, description, story, and
            moral of the story, while the `<Button>` component is used to submit the form and add
            the new story to the database. By wrapping these components in a `<ScrollView>`, the
            user can scroll through the form if it exceeds the height of the screen, ensuring that
              all fields are accessible and can be filled out. */}
            <ScrollView>
              <TextInput
                style={styles.inputFont}
                onChangeText={(title) => this.setState({ title })}
                placeholder={"Title"}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(description) => this.setState({ description })}
                placeholder={"Description"}
                multiline={true}
                numberOfLines={4}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
                onChangeText={(recipe) => this.setState({ recipe })}
                placeholder={"Recipe"}
                multiline={true}
                numberOfLines={20}
                placeholderTextColor="white"
              />

              <TextInput
                style={[
                  styles.inputFont,
                  styles.inputFontExtra,
                  styles.inputTextBig,
                ]}
              />

              {/* The above code is rendering a submit button in a React Native application. When the
              button is pressed, it calls the `addStory()` function. The button is styled using the
              `styles.submitButton` style. */}
              <View style={styles.submitButton}>
                <Button
                  onPress={() => this.recipe()}
                  title="Submit"
                  color="#841584"
                />
              </View>


            </ScrollView>
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
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: "93%",
    height: RFValue(250),
    alignSelf: "center",
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: "contain",
  },
  inputFont: {
    height: RFValue(40),
    marginTop: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    fontFamily: "Bubblegum-Sans",
  },
  inputFontExtra: {
    marginTop: RFValue(15),
  },
  inputTextBig: {
    textAlignVertical: "top",
    padding: RFValue(5),
  },
  submitButton: {
    marginTop: RFValue(20),
    alignItems: "center",
    justifyContent: "center"
  }
});
