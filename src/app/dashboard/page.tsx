
'use client';

import { useState } from 'react';
import Image from 'next/image';

// sample posts for the dashboard until the database is connected
const samplePosts = [
  {
    id: 1,
    name: 'Wallet',
    type: 'Lost',
    location: 'Library',
    date: 'Oct 30, 2026',
    status: 'Active',
    image: '/images/items/wallet.jpg',
  },
  {
    id: 2,
    name: 'Water Bottle',
    type: 'Found',
    location: 'Campus Center',
    date: 'Oct 28, 2026',
    status: 'Resolved',
    image: '/images/items/waterbottle.jpg',
  },
  {
    id: 3,
    name: 'Backpack',
    type: 'Lost',
    location: 'POST Building',
    date: 'Oct 25, 2026',
    status: 'Active',
    image: '/images/items/backpack.jpg',
  },
];

// sample saved items for the saved matches tab
const sampleSaved = [
  {
    id: 4,
    name: 'AirPods',
    location: 'Hamilton Library',
    image: '/images/items/airpod.jpg',
  },
  {
    id: 5,
    name: 'Keys',
    location: 'Campus Center',
    image: '/images/items/keys.jpg',
  },
];

const DashboardPage = () => {
  // keeps track of the selected tab
  const [activeTab, setActiveTab] = useState('My Posts');

  // lets the user remove a post from the screen
  const [posts, setPosts] = useState(samplePosts);

  // sample notifications for now
  const notifications = [
    'Someone may have found an item matching your wallet.',
    'Your water bottle report was marked as resolved.',
  ];

  // removes a post from the temporary list
  const removePost = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  return (
    <main
      style={{
        backgroundColor: '#f5f7f5',
        minHeight: '100vh',
        padding: '40px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        {/* dashboard title */}
        <h1
          style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#024731',
            marginBottom: '8px',
          }}
        >
          My Dashboard
        </h1>

        <p style={{ color: '#666', marginBottom: '25px' }}>
          Manage your lost and found items here.
        </p>

        {/* dashboard tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            borderBottom: '2px solid #ddd',
            paddingBottom: '15px',
            marginBottom: '25px',
          }}
        >
          {['My Posts', 'Saved Matches', 'Notifications', 'Settings'].map(
            (tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  border:
                    activeTab === tab
                      ? '1px solid #024731'
                      : '1px solid #ddd',
                  backgroundColor:
                    activeTab === tab ? '#024731' : '#f5f5f5',
                  color: activeTab === tab ? 'white' : '#333',
                  fontWeight: activeTab === tab ? 'bold' : 'normal',
                }}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* my posts section */}
        {activeTab === 'My Posts' && (
          <section>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px',
                marginBottom: '20px',
              }}
            >
              <h2 style={{ fontSize: '24px', margin: 0 }}>My Posts</h2>

              {/* links to the report item page */}
              <a
                href="/report"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#024731',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '6px',
                }}
              >
                + New Post
              </a>
            </div>

            {/* displays the user's posts */}
            {posts.length === 0 ? (
              <p>You have no posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    border: '1px solid #ddd',
                    borderRadius: '8px',
                    padding: '15px',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* item picture */}
                  <div
                    style={{
                      width: '75px',
                      height: '75px',
                      position: 'relative',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      backgroundColor: '#e8eeea',
                      flexShrink: 0,
                    }}
                  >
                    <Image
                      src={post.image}
                      alt={post.name}
                      fill
                      sizes="75px"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>

                  {/* item information */}
                  <div style={{ flex: 1, minWidth: '150px' }}>
                    <h3
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '5px',
                      }}
                    >
                      {post.type}: {post.name}
                    </h3>

                    <p
                      style={{
                        color: '#666',
                        fontSize: '14px',
                        margin: 0,
                      }}
                    >
                      📍 {post.location} - {post.date}
                    </p>
                  </div>

                  {/* active or resolved label */}
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      backgroundColor:
                        post.status === 'Active' ? '#dff3e5' : '#eeeeee',
                      color:
                        post.status === 'Active' ? '#176339' : '#555',
                      fontSize: '13px',
                      fontWeight: 'bold',
                    }}
                  >
                    {post.status}
                  </span>

                  {/* removes the item from the screen */}
                  <button
                    type="button"
                    onClick={() => removePost(post.id)}
                    style={{
                      backgroundColor: 'white',
                      color: '#b3261e',
                      border: '1px solid #ddd',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </section>
        )}

        {/* saved matches section */}
        {activeTab === 'Saved Matches' && (
          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              Saved Matches
            </h2>

            <p style={{ color: '#666' }}>
              These are items you saved while browsing.
            </p>

            {sampleSaved.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '12px',
                }}
              >
                {/* saved item picture */}
                <div
                  style={{
                    width: '70px',
                    height: '70px',
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#e8eeea',
                    flexShrink: 0,
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="70px"
                    style={{ objectFit: 'cover' }}
                  />
                </div>

                {/* saved item information */}
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '5px' }}>
                    {item.name}
                  </h3>

                  <p style={{ color: '#666', margin: 0 }}>
                    📍 {item.location}
                  </p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* notifications section */}
        {activeTab === 'Notifications' && (
          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              Notifications
            </h2>

            {notifications.map((message) => (
              <div
                key={message}
                style={{
                  border: '1px solid #ddd',
                  padding: '15px',
                  borderRadius: '8px',
                  marginBottom: '12px',
                  backgroundColor: '#f8faf8',
                }}
              >
                🔔 {message}
              </div>
            ))}
          </section>
        )}

        {/* settings section */}
        {activeTab === 'Settings' && (
          <section>
            <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>
              Settings
            </h2>

            <p>
              Account settings will be available in a future update.
            </p>

            {/* temporary user information */}
            <div
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '20px',
              }}
            >
              <p>
                <strong>Name:</strong> UH Mānoa Student
              </p>

              <p>
                <strong>Email:</strong> student@hawaii.edu
              </p>

              <p style={{ color: '#666', marginBottom: 0 }}>
                This is example account information.
              </p>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default DashboardPage;
