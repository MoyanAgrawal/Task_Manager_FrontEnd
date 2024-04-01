import { CircleUserRound } from 'lucide-react';
import React from 'react'
import "../assets/css/Hero.css"; 

import { Navbar,Container } from 'react-bootstrap';

function NavBar() {
  return (
    <div>
      <Navbar className="header">
        <Container>
          <Navbar.Brand href="#home">
            <h1>Task Board</h1>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <h1>
                <CircleUserRound size={32} />
              </h1>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar