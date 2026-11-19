'use client';

import { useSession } from 'next-auth/react'; // v5 compatible
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, BoxSeamFill, Lock, PersonCircle } from 'react-bootstrap-icons';

/** Site header shown on every page. Matches the header in the M1 mockup. */
const NavBar: React.FC = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();
  if (status === 'loading') return null;
  const currentUser = session?.user?.email;
  return (
    <Navbar expand="lg" variant="dark" className="laf-navbar">
      <Container>
        <Navbar.Brand href="/" className="fw-bold d-flex align-items-center">
          <BoxSeamFill className="me-2" size={24} />
          UH Manoa Lost &amp; Found
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link id="home-nav" href="/" active={pathName === '/'}>
              Home
            </Nav.Link>
            <Nav.Link id="browse-nav" href="/browse" active={pathName === '/browse'}>
              Browse
            </Nav.Link>
            <Nav.Link id="report-nav" href="/report" active={pathName === '/report'}>
              Report
            </Nav.Link>
            <Nav.Link id="dashboard-nav" href="/dashboard" active={pathName === '/dashboard'}>
              Dashboard
            </Nav.Link>
            {session ? (
              <NavDropdown
                id="login-dropdown"
                align="end"
                className="ms-lg-2"
                title={
                  <>
                    <PersonCircle size={22} className="me-1" />
                    {currentUser}
                  </>
                }
              >
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight className="me-2" />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock className="me-2" />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <a id="login-button" href="/auth/signin" className="btn btn-outline-light btn-sm ms-lg-3 px-3">
                Login
              </a>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
