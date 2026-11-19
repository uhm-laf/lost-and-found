import { Container } from 'react-bootstrap';

/** Temporary placeholder for pages that haven't been built yet. Delete its import when you build your page. */
const ComingSoon = ({ title, issue }: { title: string; issue: number }) => (
  <main>
    <section className="page-header text-white py-4">
      <Container>
        <h1 className="fw-bold mb-0">{title}</h1>
      </Container>
    </section>
    <Container className="py-5 text-center text-muted">
      <p className="lead">This page is coming soon.</p>
      <p>Being built in issue #{issue}.</p>
    </Container>
  </main>
);

export default ComingSoon;
