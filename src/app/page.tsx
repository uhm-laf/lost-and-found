
'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Badge,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';
import {
  categories,
  locations,
  sampleItems,
  timeAgo,
} from '@/lib/sampleItems';

/** Browse Lost & Found Items page - Issue #6. */
const BrowsePage = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [category, setCategory] = useState('all');
  const [location, setLocation] = useState('all');
  const [sort, setSort] = useState('newest');

  const filteredItems = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return sampleItems
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(keyword) ||
          item.description.toLowerCase().includes(keyword) ||
          item.category.toLowerCase().includes(keyword) ||
          item.location.toLowerCase().includes(keyword);

        return (
          matchesSearch &&
          (type === 'all' || item.type === type) &&
          (category === 'all' || item.category === category) &&
          (location === 'all' || item.location === location)
        );
      })
      .sort((a, b) =>
        sort === 'newest'
          ? b.postedAt.localeCompare(a.postedAt)
          : a.postedAt.localeCompare(b.postedAt),
      );
  }, [search, type, category, location, sort]);

  const placeholderIcons: Record<string, string> = {
    'Wallets & IDs': '👛',
    Electronics: '🎧',
    'Water Bottles': '🥤',
    Bags: '🎒',
    Keys: '🔑',
    Clothing: '👕',
    'Books & Notes': '📚',
    Other: '📦',
  };

  return (
    <main style={{ backgroundColor: '#f8faf9', minHeight: '100vh' }}>
      <Container className="py-5">
        <h1 className="fw-bold mb-4" style={{ color: '#205c40' }}>
          Browse Lost &amp; Found Items
        </h1>

        {/* Search and Report Button */}
        <Row className="g-3 align-items-center mb-4">
          <Col md={9}>
            <Form.Control
              type="search"
              placeholder="🔍 Search by keyword (e.g., wallet, backpack...)"
              aria-label="Search items"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="lg"
            />
          </Col>

          <Col md={3}>
            <Link
              href="/report"
              className="btn btn-success btn-lg w-100"
            >
              + Report an Item
            </Link>
          </Col>
        </Row>

        {/* Filters */}
        <Row className="g-3 mb-4">
          <Col xs={6} md={3}>
            <Form.Select
              aria-label="Filter by type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="all">Type: All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </Form.Select>
          </Col>

          <Col xs={6} md={3}>
            <Form.Select
              aria-label="Filter by category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">Category: All</option>
              {categories.map((itemCategory) => (
                <option key={itemCategory} value={itemCategory}>
                  {itemCategory}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={6} md={3}>
            <Form.Select
              aria-label="Filter by location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            >
              <option value="all">Location: All</option>
              {locations.map((itemLocation) => (
                <option key={itemLocation} value={itemLocation}>
                  {itemLocation}
                </option>
              ))}
            </Form.Select>
          </Col>

          <Col xs={6} md={3}>
            <Form.Select
              aria-label="Sort items"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
            </Form.Select>
          </Col>
        </Row>

        {/* Item Results */}
        <p className="text-muted mb-3">
          Showing {filteredItems.length} item(s)
        </p>

        <Row className="g-4">
          {filteredItems.map((item) => (
            <Col key={item.id} xs={12} sm={6} lg={3}>
              <Link
                href={`/items/${item.id}`}
                className="text-decoration-none text-dark d-block h-100"
                aria-label={`View ${item.title}`}
              >
                <Card className="h-100 shadow-sm border-0">
                  <div
                    className="d-flex align-items-center justify-content-center overflow-hidden"
                    style={{
                      height: '180px',
                      backgroundColor: '#e8f1eb',
                      position: 'relative',
                    }}
                  >
                    {item.photos.length > 0 ? (
                      <Image
                        src={item.photos[0]}
                        alt={item.title}
                        fill
                        sizes="(max-width: 576px) 100vw, (max-width: 992px) 50vw, 25vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <span style={{ fontSize: '70px' }}>
                        {placeholderIcons[item.category] || '📦'}
                      </span>
                    )}
                  </div>

                  <Card.Body>
                    <Badge
                      bg={item.type === 'found' ? 'success' : 'warning'}
                      text={item.type === 'found' ? undefined : 'dark'}
                      className="mb-2"
                    >
                      {item.type === 'found' ? 'Found' : 'Lost'}
                    </Badge>

                    <Card.Title className="fw-bold mb-2">
                      {item.title}
                    </Card.Title>

                    <Card.Text className="text-muted small mb-1">
                      📍 {item.location}
                    </Card.Text>

                    <Card.Text className="text-muted small mb-0">
                      🕒 {timeAgo(item.postedAt)}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>

        {filteredItems.length === 0 && (
          <div className="text-center py-5">
            <h4>No items found</h4>
            <p className="text-muted">
              Try changing your search or filters.
            </p>
          </div>
        )}
      </Container>
    </main>
  );
};

export default BrowsePage;

