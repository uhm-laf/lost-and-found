'use client';

import { useState, DragEvent, ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button, ButtonGroup, Alert, Card } from 'react-bootstrap';
import { categories, locations, ItemType } from '@/lib/sampleItems';

const MAX_BYTES = 5 * 1024 * 1024;

/** Report Item page (issue #7). No database yet, so submit just shows a confirmation. */
const ReportPage = () => {
  const [reportType, setReportType] = useState<ItemType>('lost');
  const [validated, setValidated] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoError, setPhotoError] = useState('');
  const [dragging, setDragging] = useState(false);

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    const good: File[] = [];
    let error = '';
    Array.from(files).forEach((f) => {
      if (!['image/png', 'image/jpeg'].includes(f.type)) error = 'Only PNG or JPG files are allowed.';
      else if (f.size > MAX_BYTES) error = `${f.name} is over 5 MB.`;
      else good.push(f);
    });
    setPhotoError(error);
    setPhotos((prev) => [...prev, ...good]);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }
    setSubmitted(true);
    form.reset();
    setPhotos([]);
    setPhotoError('');
    setValidated(false);
  };

  return (
    <Container className="py-4" style={{ maxWidth: 720 }}>
      <h1 className="text-center mb-4">Report a Lost or Found Item</h1>

      <div className="text-center mb-4">
        <ButtonGroup>
          <Button
            variant={reportType === 'lost' ? 'success' : 'outline-success'}
            onClick={() => setReportType('lost')}
          >
            I Lost an Item
          </Button>
          <Button
            variant={reportType === 'found' ? 'success' : 'outline-success'}
            onClick={() => setReportType('found')}
          >
            I Found an Item
          </Button>
        </ButtonGroup>
      </div>

      {submitted && (
        <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
          Thanks! Your {reportType} item report was submitted.
        </Alert>
      )}

      <Card className="p-4">
        <Form noValidate validated={validated} onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="itemTitle">
            <Form.Label>Item Title</Form.Label>
            <Form.Control required type="text" placeholder="e.g. Green Hydro Flask" />
            <Form.Control.Feedback type="invalid">Please enter an item title.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Select required defaultValue="">
              <option value="" disabled>Select a category</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please choose a category.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="location">
            <Form.Label>Last Seen Location</Form.Label>
            <Form.Select required defaultValue="">
              <option value="" disabled>Select a location</option>
              {locations.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">Please choose a location.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={4}
              placeholder="Color, brand, stickers, anything that helps identify it"
            />
            <Form.Control.Feedback type="invalid">Please add a description.</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Photos</Form.Label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              className={`rounded p-4 text-center ${dragging ? 'bg-light' : ''}`}
              style={{ border: '2px dashed #adb5bd' }}
            >
              <p className="mb-1">Drag and drop photos here</p>
              <p className="text-muted small mb-2">PNG or JPG, up to 5 MB</p>
              <label htmlFor="photoInput" className="btn btn-outline-secondary btn-sm mb-0">
                Browse files
              </label>
              <input
                id="photoInput"
                type="file"
                accept="image/png,image/jpeg"
                multiple
                hidden
                onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
              />
            </div>
            {photoError && <div className="text-danger small mt-2">{photoError}</div>}
            {photos.length > 0 && (
              <ul className="small mt-2 mb-0">
                {photos.map((p) => (
                  <li key={p.name + p.size}>{p.name}</li>
                ))}
              </ul>
            )}
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="success" size="lg">
              Submit Report
            </Button>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default ReportPage;
