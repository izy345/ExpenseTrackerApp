import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from './UI/IconButton';
import { store } from './store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

export default function App() {

  const ExpenseOverview = () => {
    return(
      <BottomTab.Navigator
        screenOptions={ ({navigation}) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
          headerTintColor: 'white',
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500},
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerRight: ({size, tintColor}) => {
            return (
              <IconButton icon={'add'} size={size} color={tintColor}
              onPress={ () => navigation.navigate('ManageExpense') }
              />
            );
            },
        })
      }
      >
        <BottomTab.Screen
          name='RecentExpenses'
          component={RecentExpenses}
            options={{
              title: 'Recent Expenses',
              tabBarLabel: 'Recent',
              tabBarIcon: ({ color, size }) => {
                return <Ionicons name='hourglass' size={size} color={color} />;
              },
            }}
          />
        <BottomTab.Screen
          name='AllExpenses'
          component={AllExpenses}
          options={{
            title: 'All Expenses',
            tabBarLabel: 'All Expenses',
            tabBarIcon: ({ color, size }) => {
              return <Ionicons name='calendar' size={size} color={color} />;
            },
          }}
          />
      </BottomTab.Navigator>
    )
  }

  return (
    <>
      <Provider store={store}>
        <StatusBar style="auto" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name='ExpenseOverview'
              component={ExpenseOverview}
              options={{
                headerShown: false
              }}
              />
            <Stack.Screen name='ManageExpense' component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
}
