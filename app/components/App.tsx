/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Route} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";
import {ABC} from "./ABC";
import {About} from "./About";
import {Applications} from "./Applications";
import {Auto} from "./Auto";
import {Base64} from "./Base64";
import {Blog} from "./Blog";
import {Charger} from "./Charger";
import {Contact} from "./Contact";
import {Corvette} from "./Corvette";
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

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navbar fixed={"top"} bg="primary" expand="lg">
                        <LinkContainer to="/home"><Navbar.Brand>@halversondm</Navbar.Brand></LinkContainer>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav>
                                <LinkContainer to="/home"><Nav.Link>Home</Nav.Link></LinkContainer>
                                <LinkContainer to="/apps"><Nav.Link>Apps</Nav.Link></LinkContainer>
                                <LinkContainer to="/auto"><Nav.Link>Auto</Nav.Link></LinkContainer>
                                <LinkContainer to="/blog"><Nav.Link>Blog</Nav.Link></LinkContainer>
                                <LinkContainer to="/resume"><Nav.Link>Resume</Nav.Link></LinkContainer>
                                <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
                                <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                    <Container>
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
                            <Route path="/corvette" component={Corvette}/>
                        </div>
                        <hr/>
                        <footer>
                            <p>&copy; 2021 halversondm.com</p>
                        </footer>
                    </Container>
                </div>
            </BrowserRouter>
        );
    }
}
