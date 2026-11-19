import Link from 'next/link';
import { Col, Container, Row } from 'react-bootstrap';

/** UH Manoa Lost & Found Landing Page. */
const Home = () => (
  <main>
    {/* Hero Section */}
    <Container
      id="landing-page"
      fluid
      className="text-center text-white d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: '500px',
        backgroundImage:
          "linear-gradient(rgba(0, 60, 30, 0.8), rgba(0, 60, 30, 0.8)), url('/uh-manoa.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '60px 20px',
      }}
    >
      <h1 className="display-3 fw-bold mb-4">
        UH Mānoa Lost &amp; Found
      </h1>

      <p className="fs-4 mb-4">
        A centralized place to report, find, and recover lost items on campus.
      </p>

      <div className="d-flex gap-3 flex-wrap justify-content-center">
        <Link
          href="/browse"
          className="btn btn-light btn-lg"
        >
          Browse Items
        </Link>

        <Link
          href="/report"
          className="btn btn-success btn-lg"
        >
          + Report an Item
        </Link>
      </div>
    </Container>

    {/* Features Section */}
    <Container className="py-5">
      <h2 className="text-center fw-bold mb-5">
        How It Works
      </h2>

      <Row className="g-4 text-center">
        <Col md={4}>
          <div className="p-4 bg-light rounded shadow-sm h-100">
            <div className="display-4 mb-3">🔎</div>
            <h3>Find Items</h3>
            <p>
              Browse lost and found items across the UH Mānoa campus.
            </p>
          </div>
        </Col>

        <Col md={4}>
          <div className="p-4 bg-light rounded shadow-sm h-100">
            <div className="display-4 mb-3">📋</div>
            <h3>Report Items</h3>
            <p>
              Quickly report an item you have lost or found.
            </p>
          </div>
        </Col>

        <Col md={4}>
          <div className="p-4 bg-light rounded shadow-sm h-100">
            <div className="display-4 mb-3">🔔</div>
            <h3>Get Notified</h3>
            <p>
              Receive updates when potential matches are found.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;

