import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import firebase from "firebase";

/* `import * as SplashScreen from 'expo-splash-screen';` is importing the `expo-splash-screen` library
and assigning it to the variable `SplashScreen`. */
import * as SplashScreen from "expo-splash-screen";
SplashScreen.preventAutoHideAsync();

/* `let customFonts` is declaring a variable that contains an object with a key-value pair. The key is
`"Bubblegum-Sans"` and the value is the path to a custom font file located in the project's assets
folder. This object is used to load the custom font using the `Font.loadAsync()` method from the
`expo-font` library. */
let customFonts = {
  "Bubblegum-Sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};

export default class RecipeCard extends Component {
  /**
   * This is a constructor function that initializes the state of a component in a React application.
   * @param props - props is an object that contains the properties passed down to a component from its
   * parent component. In this case, the constructor is receiving props as a parameter and using it to
   * set the initial state of the component. The props being passed down to this component likely
   * include a story object with a key, value
   */
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,
      activateLightTheme: true,
      story_id: this.props.story.key,
      story_data: this.props.story.value,
      is_liked: false,
      likes: this.props.story.value.likes,
    };
  }

  /* This code block is defining two functions, `componentDidMount()` and `_loadFontsAsync()`, and a
variable `customFonts`. */
  componentDidMount() {
    this._loadFontsAsync();
    this.fetchUser();
  }
  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }
  fetchUser = () => {
    let themefromDB;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        themefromDB = snapshot.val().current_theme;
        this.setState({
          activateLightTheme: themefromDB === "light" ? true : false,
        });
      });
  };

  /* `likeAction` is a function that is called when the user presses the like button on a story card. It
checks the current state of the `is_liked` variable, which determines whether the user has already
liked the story or not. If `is_liked` is true, it decrements the number of likes for the story in
the Firebase database and updates the state of the component to reflect the change in likes and the
fact that the user has unliked the story. If `is_liked` is false, it increments the number of likes
for the story in the Firebase database and updates the state of the component to reflect the change
in likes and the fact that the user has liked the story. */
  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref("posts")
        .child(this.state.story_id)
        .child("likes")
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

  render() {
    let story = this.state.story_data;
    if (this.state.fontsLoaded) {
      SplashScreen.hideAsync();
      let images = {
        image_1: require(),
        image_2: require(),
        image_3: require(),
        image_4: require(),
        image_5: require(),
      };
      return (
        /* `<TouchableOpacity>` is a component from the `react-native` library that provides a
        touchable area that can be used to trigger an action. In this case, it is being used to
        create a touchable area that, when pressed, will navigate the user to the `StoryScreen`
        screen and pass the `story` object as a parameter. The `style` prop is setting the style of
        the touchable area to the `container` style defined in the `styles` object. */
        <TouchableOpacity
          style={styles.container}
          onPress={() =>
            this.props.navigation.navigate("RecipeScreen", {
              story: this.props.story,
            })
          }
        >
          <SafeAreaView style={styles.droidSafeArea} />
          {/* This code block is rendering a view that contains an image, title, author, and description
          of a story. The `style` prop of the view is set conditionally based on the value of the
          `activateLightTheme` state variable. If `activateLightTheme` is true, the
          `cardContainerLight` style is applied, otherwise the `cardContainer` style is applied. The
          image source is determined by the `preview_image` property of the `story` object passed
          down as a prop. The title, author, and description are displayed using `Text` components
          with styles that are also conditionally applied based on the value of
          `activateLightTheme`. */}
          <View
            style={
              this.state.activateLightTheme
                ? styles.cardContainerLight
                : styles.cardContainer
            }
          >
            <Image
              source={images[story.preview_image]}
              style={styles.storyImage}
            ></Image>
            <View style={styles.titleContainer}>
              <View style={styles.titleTextContainer}>
                <Text
                  style={
                    this.state.activateLightTheme
                      ? styles.storyTitleTextLight
                      : styles.storyTitleText
                  }
                >
                  {story.title}
                </Text>
                <Text
                  style={
                    this.state.activateLightTheme
                      ? styles.storyAuthorTextLight
                      : styles.storyAuthorText
                  }
                >
                  {story.author}
                </Text>
                <Text
                  style={
                    this.state.activateLightTheme
                      ? styles.descriptionTextLight
                      : styles.descriptionText
                  }
                >
                  {this.props.story.description}
                </Text>
              </View>
            </View>

            {/* This code block is rendering a view that contains a like button for a story. The `style`
            prop of the view is set to the `actionContainer` style defined in the `styles` object.
            The like button is a `TouchableOpacity` component that, when pressed, calls the
            `likeAction()` function. The style of the like button is conditionally set based on the
            value of the `is_liked` state variable. If `is_liked` is true, the `likeButtonLiked`
            style is applied, otherwise the `likeButtonDisliked` style is applied. The like button
            contains an `Ionicons` component that displays a heart icon, and a `Text` component that
            displays the number of likes for the story. The color of the heart icon and the text is
            conditionally set based on the value of the `activateLightTheme` state variable. */}
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}
              >
                <Ionicons
                  name={"heart"}
                  size={RFValue(30)}
                  color={this.state.activateLightTheme ? "black" : "white"}
                />

                <Text
                  style={
                    this.state.activateLightTheme
                      ? styles.likeTextLight
                      : styles.likeText
                  }
                >
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      );
    }
  }
}

const styles = StyleSheet.create({
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowOpacity: RFValue(0.5),
    shadowRadius: RFValue(5),
    elevation: RFValue(2),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  titleTextContainer: {
    flex: 0.8,
  },
  iconContainer: {
    flex: 0.2,
  },
  storyTitleText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "white",
  },
  storyTitleTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    color: "black",
  },
  storyAuthorText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "white",
  },
  storyAuthorTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(18),
    color: "black",
  },
  descriptionContainer: {
    marginTop: RFValue(5),
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "white",
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(13),
    color: "black",
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButtonLiked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeButtonDisliked: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    borderColor: "#eb3948",
    borderWidth: 2,
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
  likeTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 25,
    marginLeft: 25,
    marginTop: 6,
  },
});
