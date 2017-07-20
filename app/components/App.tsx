/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import {Nav, Navbar, NavItem} from "react-bootstrap";
import {BrowserRouter, Link, Route} from "react-router-dom";
import {ABC} from "./ABC";
import {About} from "./About";
import {Applications} from "./Applications";
import {Auto} from "./Auto";
import {Base64} from "./Base64";
import {Blog} from "./Blog";
import {Charger} from "./Charger";
import {Contact} from "./Contact";
import {DiscountCalculator} from "./DiscountCalculator";
import {Game} from "./Game";
import {Grades} from "./Grades";
import {GrandPrix} from "./GrandPrix";
import {Home} from "./Home";
import {Honda} from "./Honda";
import {Resume} from "./Resume";
import {StockQuote} from "./StockQuote";
import {UrlBuilder} from "./UrlBuilder";
import {Yamaha} from "./Yamaha";

export class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar fixedTop>
                        <Navbar.Header>
                            <Navbar.Brand>@halversondm</Navbar.Brand>
                            <Navbar.Toggle/>
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <NavItem eventKey={1}><Link to="/home">Home</Link></NavItem>
                                <NavItem eventKey={2}><Link to="/apps">Apps</Link></NavItem>
                                <NavItem eventKey={3}><Link to="/auto">Auto</Link></NavItem>
                                <NavItem eventKey={4}><Link to="/blog">Blog</Link></NavItem>
                                <NavItem eventKey={5}><Link to="/resume">Resume</Link></NavItem>
                                <NavItem eventKey={6}><Link to="/contact">Contact</Link></NavItem>
                                <NavItem eventKey={7}><Link to="/about">About</Link></NavItem>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <div className="theme-showcase container">
                        <div>
                            <Route exact={true} path="/" component={Home}/>
                            <Route path="/home" component={Home}/>
                            <Route path="/about" component={About}/>
                            <Route path="/blog" component={Blog}/>
                            <Route path="/resume" component={Resume}/>
                            <Route path="/contact" component={Contact}/>
                            <Route path="/auto" component={Auto}/>
                            <Route path="/honda" component={Honda}/>
                            <Route path="/yamaha" component={Yamaha}/>
                            <Route path="/charger" component={Charger}/>
                            <Route path="/grandprix" component={GrandPrix}/>
                            <Route path="/apps" component={Applications}/>
                            <Route path="/abc" component={ABC}/>
                            <Route path="/base64" component={Base64}/>
                            <Route path="/discountCalculator" component={DiscountCalculator}/>
                            <Route path="/grades" component={Grades}/>
                            <Route path="/game" component={Game}/>
                            <Route path="/stockQuote" component={StockQuote}/>
                            <Route path="/urlBuilder" component={UrlBuilder}/>
                        </div>
                        <hr/>
                        <footer>
                            <p>&copy; 2017 halversondm.com</p>
                        </footer>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
