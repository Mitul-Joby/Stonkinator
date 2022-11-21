import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import { SignOutButton } from "../components";

import StockinatorLogoWhite from '../static/StonkinatorLogoWhite.png'
import StockinatorTextWhite from '../static/StonkinatorTextWhite.png'

function HomeNavbar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="black" variant="dark" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <Navbar.Collapse id="responsive-navbar-nav">
            <img
              src={StockinatorLogoWhite}
              width="30"
              height="30"
              className="mx-3 d-inline-block align-top d-none d-lg-block"
              alt="Stonkinator logo"
            />
          </Navbar.Collapse>
          <img src={StockinatorTextWhite} alt="Stonkinator Logo" height="32" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav >
            <Nav.Link href="/search">Search</Nav.Link>
            <Nav.Link href="/predict">Predict</Nav.Link>
            <Nav.Link href="/predictions">Past Predictions</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <div className="d-flex justify-content-around">
              <SignOutButton />
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;