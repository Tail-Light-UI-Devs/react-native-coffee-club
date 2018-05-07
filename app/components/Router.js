import React from 'react';
import { Scene, Router, Stack } from 'react-native-router-flux';
import HomeView from './HomeView';
import Login from './Login';
import Logo from './Logo';
import EditCoffee from './EditCoffee';
import NewCoffee from './NewCoffee';
import BallrView from './BallrView';

const RouterComponent = () => {
    return(
        <Router sceneStyle={{ }}>
            <Stack key="root">
                <Scene
                    key="homeView"
                    component={HomeView}
                    title="Coffee Club Home Screen"
                    initial />
                <Scene
                    key="newCoffeeView"
                    component={NewCoffee}
                    title="Add a new coffee" />
                <Scene
                    key="editView"
                    component={EditCoffee}
                    title="Edit or delete a coffee" />
                {/*<Scene*/}
                    {/*key="coffeeBallrView"*/}
                    {/*component={BallrView}*/}
                    {/*title="Behold the Coffees" />*/}
                <Scene
                    key="login"
                    component={Login}
                    title="Coffee Club Login" />
                <Scene
                    key="logo"
                    component={Logo}
                    title="Coffee Club Logo" />
            </Stack>
        </Router>
    );
};

export default RouterComponent;

