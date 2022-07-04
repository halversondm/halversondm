/**
 * Created by Daniel on 6/26/2016.
 */
import * as React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/about" element={<About/>}/>
                            <Route path="/blog" element={<Blog/>}/>
                            <Route path="/resume" element={<Resume/>}/>
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/auto" element={<Auto/>}/>
                            <Route path="/honda" element={<Honda/>}/>
                            <Route path="/yamaha" element={<Yamaha/>}/>
                            <Route path="/charger" element={<Charger/>}/>
                            <Route path="/grandprix" element={<GrandPrix/>}/>
                            <Route path="/apps" element={<Applications/>}/>
                            <Route path="/abc" element={<ABC/>}/>
                            <Route path="/base64" element={<Base64/>}/>
                            <Route path="/discountCalculator" element={<DiscountCalculator/>}/>
                            <Route path="/grades" element={<Grades/>}/>
                            <Route path="/game" element={<Game/>}/>
                            <Route path="/stockQuote" element={<StockQuote/>}/>
                            <Route path="/urlBuilder" element={<UrlBuilder/>}/>
                            <Route path="/corvette" element={<Corvette/>}/>
                        </Routes>
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
