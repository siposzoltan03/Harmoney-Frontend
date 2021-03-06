import React from "react";
import "./App.css";
import {ModalVisibilityContextProvider} from "../../contexts/ModalVisibilityContext";
import {TransactionProvider} from "../../contexts/TransactionContext";
import {UserProvider} from "../../contexts/UserContext";
import Content from "../Content/Content";
import "react-notifications-component/dist/theme.css";
import "animate.css";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Dashboard from "../../components/Dashboard/Dashboard";
import Navbar from "../../components/Navbar/Navbar"
import SignInPage from "../../containers/SignInPage";
import SignUpPage from "../../containers/SignUpPage";
import ProfilePage from "../../containers/ProfilePage"


function App() {
    return (
        <Router>
            <UserProvider>
                <TransactionProvider>
                    <Switch>
                        <Route path={`/transactions`}>
                            <TransactionProvider>
                                <ModalVisibilityContextProvider>
                                    <Navbar title="Transactions">
                                        <Content/>
                                    </Navbar>
                                </ModalVisibilityContextProvider>
                            </TransactionProvider>
                        </Route>
                        <Route path={`/user`}>
                            <TransactionProvider>
                                <ModalVisibilityContextProvider>
                                    <Navbar title={"Users"}>
                                        <ProfilePage/>
                                    </Navbar>
                                </ModalVisibilityContextProvider>
                                {/*<UserPage/>*/}
                            </TransactionProvider>
                        </Route>
                        <Route path='/dashboard'>
                            <TransactionProvider>
                                <Navbar title={"Dashboard"}>
                                    <Dashboard/>
                                </Navbar>
                            </TransactionProvider>
                        </Route>
                        <Route path={'/registration'}>
                            <SignUpPage/>
                        </Route>
                        <Route path={'/'}>
                            <SignInPage/>
                        </Route>
                    </Switch>
                </TransactionProvider>
            </UserProvider>
        </Router>
    );
}

export default App;
