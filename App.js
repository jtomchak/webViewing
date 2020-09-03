import 'react-native-gesture-handler';

import * as React from 'react';
import {View, Text, Button, ActivityIndicator, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {WebView} from 'react-native-webview';

function HomeScreen({navigation}) {
  const links = [
    {title: 'ThisDot', link: 'https://thisdot.co'},
    {
      title: 'RN Dev Setup',
      link: 'https://reactnative.dev/docs/environment-setup',
    },
  ];
  const searchHTML = require('./assets/search.html');
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      {links.map(({title, link}) => (
        <Button
          key={link}
          title={title}
          onPress={() => navigation.navigate('Deets', {title, link})}
        />
      ))}
      <Button
        title="Local Files"
        onPress={() =>
          navigation.navigate('LocalHTML', {
            title: 'Local',
            location: searchHTML,
          })
        }
      />
    </View>
  );
}

function LoadingIndicatorView() {
  return (
    <ActivityIndicator
      color="#009b88"
      size="large"
      style={styles.ActivityIndicatorStyle}
    />
  );
}

function DetailsScreen({route, navigation}) {
  const {title, link} = route.params;
  return (
    <WebView
      source={{uri: link}}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
}
function LocalWebViewScreen({route, navigation}) {
  const {title, location} = route.params;
  return (
    <WebView
      source={location}
      renderLoading={LoadingIndicatorView}
      startInLoadingState={true}
    />
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Overview'}}
        />
        <Stack.Screen name="Deets" component={DetailsScreen} />
        <Stack.Screen name="LocalHTML" component={LocalWebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
