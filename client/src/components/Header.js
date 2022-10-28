import React from 'react'
import { Navbar,Nav,Row,Offcanvas,Button,Form} from 'react-bootstrap'
import logo from '../media/logo2.svg';
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <div>
        <Navbar collapseOnSelect expand="sm" key="nav" variant="dark" className="justify-content-end container">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Offcanvas
              id="responsive-navbar-nav"
              aria-labelledby="offcanvasNavbarLabel-expand-nav"
              placement="end"
            >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel-expand-nav">
              {/* <Container>
                <img src={logo} alt="LN ⚡ VPN" id="nav-menu-image"></img> 
                </Container> */}
                </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>      
        <Nav variant="pills" className='me-auto my-2 my-lg-0'>
                <Nav.Item>
                    <LinkContainer to="/">
                      <Nav.Link >🏠&ensp;Home </Nav.Link>
                    </LinkContainer>
            </Nav.Item>
                <Nav.Item>
                    <LinkContainer to="/faq">
                      <Nav.Link>📖&ensp;FAQ </Nav.Link>
                    </LinkContainer>  
                </Nav.Item>
            </Nav >
            <Nav className="ml-auto">
              <Nav.Item>
                    <Button variant="outline-success" className=''>📖&ensp;Login</Button>
                </Nav.Item>
            </Nav>
          </Offcanvas.Body>  
        </Navbar.Offcanvas>
     
        </Navbar>      
          <Row>
        <div id='logo'>
            <a href="/">
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </a>
            </div>
      </Row>
    </div>
  )
}

export default Header
