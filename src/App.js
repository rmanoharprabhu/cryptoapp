import React from 'react'
import { Layout, Typography, Space } from 'antd';
import { Link, Switch, Route } from "react-router-dom";

import { Navbar, Homepages, Exchanges, Cryptocurriences, Cryptodetails, News } from './components';
import './App.css';


//import NavBar from './components/Navbar';


const App = () => {
    return (
        <div className="app">
            <div className="navbar">
                <Navbar/>
            </div>
            <div className="main">
                <Layout>
                    <div className="routes">
                        <Switch>
                            <Route exact path="/">
                                <Homepages />
                            </Route>
                            <Route exact path="/exchanges">
                                <Exchanges />
                            </Route>
                            <Route exact path="/cryptoCurriences">
                                <Cryptocurriences />
                            </Route>
                            <Route exact path="/crypto/:coinid">
                                <Cryptodetails />
                            </Route>
                            <Route exact path="/news">
                                <News />
                            </Route>
                        </Switch>
                    </div>
                </Layout>
            
                <div className="footer" >
                    <Typography.Title level={5} style={{color: 'white'}}>
                        Crypto App &nbsp;
                        All rights reversed <br/>
                        <Space>
                            <Link to="/">Home</Link>
                            <Link to="/exchanges">Exchanges</Link>
                            <Link to="/news">News</Link>
                        </Space>
                    </Typography.Title>
                </div>
            </div>
        </div>
    )
}

export default App
