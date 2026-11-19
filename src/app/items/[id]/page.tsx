'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Container, Row, Col, Badge, Button } from 'react-bootstrap';
import { getItem, timeAgo } from '@/lib/sampleItems';

/** Item Details page (issue #8). Looks the item up by the id in the URL. */
const ItemDetailsPage = () => {
  const params = useParams<{ id: string }>();
  const item = getItem(Number(params.id));
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!item) {
    return (
      <Container className="py-5 text-center">
        <h1>Item Not Found</h1>
        <p className="text-muted">We couldn&apos;t find an item with that ID. It may have been removed.</p>
        <Link href="/browse" className="btn btn-success">
          Back to Browse
        </Link>
      </Container>
    );
  }

  const { photos } = item;

  return (
    <Container className="py-4">
      <Link href="/browse" className="d-inline-block mb-3">
        &larr; Back to Browse
      </Link>

      <Row className="g-4">
        <Col md={6}>
          {photos.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photos[photoIndex]}
              alt={item.title}
              className="img-fluid rounded w-100"
              style={{ objectFit: 'cover', maxHeight: 450 }}
            />
          ) : (
            <div
              className="bg-light border rounded d-flex align-items-center justify-content-center"
              style={{ height: 350 }}
            >
              <span className="text-muted">No photo yet</span>
            </div>
          )}
          {photos.length > 1 && (
            <div className="d-flex justify-content-center gap-2 mt-3">
              {photos.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  aria-label={`Show photo ${i + 1}`}
                  onClick={() => setPhotoIndex(i)}
                  className={`rounded-circle border-0 p-0 ${i === photoIndex ? 'bg-success' : 'bg-secondary opacity-50'}`}
                  style={{ width: 12, height: 12 }}
                />
              ))}
            </div>
          )}
        </Col>

        <Col md={6}>
          <Badge bg={item.type === 'lost' ? 'danger' : 'success'} className="mb-2">
            {item.type === 'lost' ? 'Lost' : 'Found'}
          </Badge>
          <h1 className="mb-3">{item.title}</h1>
          <p className="mb-1">
            <strong>Location:</strong> {item.location}
          </p>
          <p className="mb-3 text-muted">
            <strong>Posted:</strong> {timeAgo(item.postedAt)}
          </p>
          <h5>Description</h5>
          <p>{item.description}</p>
          <Button variant="success" size="lg">
            Contact Finder
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemDetailsPage;