import { Col, Container, Row } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-4 laf-footer text-white">
    <Container>
      <Row className="g-3">
        <Col md={6}>
          <div className="fw-bold">UH Manoa Lost &amp; Found</div>
          <div className="small">
            An ICS 314 project by Riki Sanehira, Sammie Lin, Ethan Kirkham, and Jeremy Molina.
          </div>
        </Col>
        <Col md={6} className="text-md-end small">
          University of Hawaii at Manoa
          <br />
          Honolulu, HI 96822
          <br />
          <a href="https://uhm-laf.github.io" className="link-light">
            Project Home Page
          </a>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;
