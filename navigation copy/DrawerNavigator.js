/* The class DrawerNavigator creates a drawer navigator with screens for home, profile, and logout, and
a custom sidebar menu. */
import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from "firebase";

/* `import CustomSidebarMenu from "../navigation/CustomSidebarMenu";` is importing a custom sidebar menu
component from the file located at "../navigation/CustomSidebarMenu.js". This component is then used as
the `drawerContent` prop in the `DrawerNavigator` component, which renders the custom sidebar menu
in the drawer navigator. */
import CustomSidebarMenu from "./CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  /**
   * This is a constructor function that sets the initial state of a boolean variable "activateLightTheme" to
   * true.
   * @param props - "props" is an object that contains all the properties passed to the component.
   * These properties can be accessed using "this.props" inside the component. In the constructor,
   * "props" is passed as a parameter to the "super" method, which is required when defining a
   * constructor in a React component
   */
  constructor(props) {
    super(props);
    this.state = {
      activateLightTheme: true,
      isUpdated: false,
    };
  }

  /**
   * This function sets the state of a component based on the current theme of the user retrieved from a
   * Firebase database.
   */
  componentDidMount() {
    let themeFromDb;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        themeFromDb = snapshot.val().current_theme;
      });
    this.setState({
      activateLightTheme: themeFromDb === "light" ? true : false,
    });
  }

  render() {
    let props = this.props;
    /* The `return` statement is returning a `DrawerNavigator` component with three screens: "MyHome",
    "Profile", and "Logout". The `drawerContent` prop is set to a custom sidebar menu component
    called `CustomSidebarMenu`. The `screenOptions` prop is an object that sets various options for
    the screens, such as hiding the header, setting the active and inactive tintColor for the drawer
    items, and setting the vertical margin for the items. Each `Drawer.Screen` component specifies
    the name of the screen, the component to render for that screen, and any additional options for
    that screen. */
    return (
      /* The `<Drawer.Navigator>` component is creating a drawer navigator with screens for home,
      profile, and logout, and a custom sidebar menu. The `drawerContent` prop is setting the custom
      sidebar menu component called `CustomSidebarMenu` to be rendered in the drawer navigator when
      the user opens it.  */
      <Drawer.Navigator
        /* `drawerContentOptions` is a prop passed to the `DrawerNavigator` component that sets various
        options for the custom sidebar menu component. */
        drawerContentOptions={{
          activeTintColor: "red",
          inactiveTintColor: this.state.light_theme ? "blue" : "white",
          itemStyle: { marginVertical: 5 },
        }}
        /* `drawerContent={props => <CustomSidebarMenu {...props} />}` is setting the `drawerContent`
       prop of the `DrawerNavigator` component to a custom sidebar menu component called
       `CustomSidebarMenu`. This means that when the user opens the drawer navigator, the custom
       sidebar menu component will be rendered in the drawer. The `props` object is passed as a
       parameter to the arrow function, and the spread operator (`...props`) is used to pass all the
       properties of the `props` object as props to the `CustomSidebarMenu` component. This allows
       the `CustomSidebarMenu` component to access any properties passed to the `DrawerNavigator`
       component. */
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
        /* `useLegacyImplementation` is a prop passed to the `DrawerNavigator` component that enables the
        legacy implementation of the drawer navigator. This is used when the new implementation of the
        drawer navigator is causing issues or conflicts with other components in the app. It is not
        recommended to use this prop unless necessary, as the legacy implementation may not have all the
        features and optimizations of the new implementation. */
        useLegacyImplementation
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen
          name="MyHome"
          component={StackNavigator}
          /* `options={{ unmountOnBlur: true }}` is a prop that is passed to each `Drawer.Screen`
          component in the `DrawerNavigator`. It specifies that when the user navigates away from
          the screen, the screen should be unmounted from the DOM to free up memory. This can be
          useful for screens that have a lot of data or complex components that take up a lot of
          resources. By unmounting the screen when it is not in use, the app can run more
          efficiently and avoid performance issues. */
          options={{ unmountOnBlur: true }}
        />
       { /* This code is creating a screen for the drawer navigator with the name "Profile" and the
        component to render for that screen is the `Profile` component. The `options` prop is
        setting the `unmountOnBlur` option to `true`, which means that when the user navigates away
        from the screen, the screen should be unmounted from the DOM to free up memory. This can be
        useful for screens that have a lot of data or complex components that take up a lot of
        resources. By unmounting the screen when it is not in use, the app can run more efficiently
        and avoid performance issues. */}
        <Drawer.Screen
          name="Profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        {/* This code is creating a screen for the drawer navigator with the name "Logout" and the
        component to render for that screen is the `Logout` component. The `options` prop is setting
        the `unmountOnBlur` option to `true`, which means that when the user navigates away from the
        screen, the screen should be unmounted from the DOM to free up memory. This can be useful
        for screens that have a lot of data or complex components that take up a lot of resources.
        By unmounting the screen when it is not in use, the app can run more efficiently and avoid
        performance issues. */}
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
