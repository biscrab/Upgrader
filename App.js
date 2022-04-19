import { useEffect, useState } from "react";
import { Platform, StyleSheet, ScrollView} from "react-native";
import * as Font from 'expo-font';
import { DefaultTheme, Provider as PaperProvider, Appbar, Dialog, Portal, List, Title, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Upgrade } from "./components";

const useProxy = Platform.select({ web: false, default: true });

export default function App() {

  useEffect(async()=>{
    await Font.loadAsync({
      "notoSans" : require("./assets/fonts/NotoSansKR-Bold.otf")
    });
  },[])

  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ffc107',
      accent: 'yellow',
    },
  };

  const [visible, setVisible] = useState(false);

  const Stack = createNativeStackNavigator();

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider theme={theme}>
      <Dialog visible={visible} onDismiss={() => setVisible(false)} style={styles.menu}>
        <Dialog.ScrollArea>
          <ScrollView contentContainerStyle={{paddingHorizontal: 24}}>
            <List.Item title="강화"/>
            <List.Item title="제작"/>
            <List.Item title="마켓"/>
          </ScrollView>
        </Dialog.ScrollArea>
      </Dialog>
      <Appbar.Header style={styles.header}>
          <Appbar.Action icon="menu" onPress={() => setVisible(true)} />
          <Appbar.Content title="무기 키우기" />
      </Appbar.Header>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="upgrade">
            <Stack.Screen name="upgrade" component={Upgrade} />
          </Stack.Navigator>
        </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    color: "white"
  },
  menu: {
    top: 0,
    left: -25,
    height: "100%",
    width: "50%",
  },
});

/*
      {name ? (
        <>
          <Text style={styles.title}>You are logged in, {name}!</Text>
          <Button title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
*/