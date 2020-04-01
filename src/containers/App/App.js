import React from "react";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import "./App.css";
import SideBar from "../../components/Navbar/Navbar";
import TopBar from "react-bootstrap/Nav";
import {ModalVisibilityContextProvider} from "../../contexts/ModalVisibilityContext";
import ModalContainer from "../ModalContainer/ModalContainer";
import Footer from "../../components/Footer/Footer";
import {TransactionProvider} from "../../contexts/TransactionContext";
import {UserProvider} from "../../contexts/UserContext";
import User from "../../components/User/User";
import Content from "../Content/Content";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import "animate.css";


function App() {
    return (
        <Router>
            <TransactionProvider>
            <UserProvider>
            <ModalVisibilityContextProvider>
                <div className="App">
                    <ReactNotification/>
                    <TopBar className="justify-content-center ml-32">
                        <h1 id="topBar-title">Harmoney</h1>
                        <User/>
                    </TopBar>
                    <SideBar/>
                    <Content/>
                    <ModalContainer/>
                    <Footer className="ml-32"/>
                </div>
            </ModalVisibilityContextProvider>
            </UserProvider>
            </TransactionProvider>
            <Route exact path="/confirmation">

            </Route>
        </Router>
    );
}

export default App;
