import * as AuthSession from "expo-auth-session";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { Alert, Platform, StyleSheet, Text, Image, View } from "react-native";
import { Button } from 'react-native-paper';

const auth0ClientId = "";
const authorizationEndpoint = "https://arielweinberger.eu.auth0.com/authorize";

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

export default function Upgrade() {
  const [name, setName] = useState(null);

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: "id_token",
      // retrieve the user's profile
      scopes: ["openid", "profile"],
      extraParams: {
        // ideally, this will be a random value
        nonce: "nonce",
      },
    },
    { authorizationEndpoint }
  );

  // Retrieve the redirect URL, add this to the callback URL list
  // of your Auth0 application.
  console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          "Authentication error",
          result.params.error_description || "something went wrong"
        );
        return;
      }
      if (result.type === "success") {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);
      }
    }
  }, [result]);


  return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWNoaWV2ZW1lbnR8ZW58MHx8MHx8&w=1000&q=80"}}/>
            <Text style={styles.title}>검</Text>
            <Button icon="arrow-up" mode="contained" style={styles.upgrade}>
            강화하기
            </Button>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    fontFamily: "notoSans"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 30,
  },
  image: {
    width: 300, 
    height: 300,
    marginBottom: 10,
    marginTop: 50,
  },
  upgrade: {
    width: 300,
    marginTop: 10
  }
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