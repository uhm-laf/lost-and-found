/**
 * Shared sample data for the M1 pages (Landing, Browse, Item Details, Dashboard).
 * Everyone imports from this file so we all use the same field names.
 * In a later milestone these items will come from the database instead.
 *
 *   import { sampleItems, getItem, timeAgo } from '@/lib/sampleItems';
 */

export type ItemType = 'lost' | 'found';

/** Matches the Active / Resolved labels in the dashboard mockup. */
export type ItemStatus = 'active' | 'resolved';

export type Item = {
  id: number;
  type: ItemType;
  title: string;
  category: string;
  location: string;
  /** When it was posted, as 'YYYY-MM-DDTHH:MM' (Hawaii time). */
  postedAt: string;
  description: string;
  status: ItemStatus;
  /** Email of the person who posted it. */
  owner: string;
  /**
   * Image paths under /public, e.g. '/images/items/wallet.jpg'.
   * Empty for now: drop image files into public/images/items/ and list them here.
   * Pages should show a placeholder when this is empty.
   */
  photos: string[];
};

export const categories = [
  'Wallets & IDs',
  'Electronics',
  'Water Bottles',
  'Bags',
  'Keys',
  'Clothing',
  'Books & Notes',
  'Other',
];

export const locations = [
  'Hamilton Library',
  'Sinclair Library',
  'Campus Center',
  'Holokai Center',
  'POST Building',
  'Holmes Hall',
  'Art Building',
  'Bachman Lawn',
  'Warrior Recreation Center',
  'Other',
];

/** The signed-in user the Dashboard mockup pretends to be. */
export const demoUser = 'john@foo.com';

export const sampleItems: Item[] = [
  {
    id: 1,
    type: 'found',
    title: 'Wallet',
    category: 'Wallets & IDs',
    location: 'Holokai Center',
    postedAt: '2026-11-18T11:30',
    description: 'Black leather wallet found near the Holokai Center. No ID inside.',
    status: 'active',
    owner: 'riki@hawaii.edu',
    photos: [],
  },
  {
    id: 2,
    type: 'lost',
    title: 'AirPods (Gen 3)',
    category: 'Electronics',
    location: 'Hamilton Library',
    postedAt: '2026-11-18T08:45',
    description: 'White AirPods case, lost on the 3rd floor study tables. Small scratch on the lid.',
    status: 'active',
    owner: 'sammie@hawaii.edu',
    photos: [],
  },
  {
    id: 3,
    type: 'found',
    title: 'Water Bottle',
    category: 'Water Bottles',
    location: 'Campus Center',
    postedAt: '2026-11-18T07:15',
    description: 'Green 32 oz Hydro Flask with a Rainbow Warriors sticker, left at the food court.',
    status: 'active',
    owner: 'ethan@hawaii.edu',
    photos: [],
  },
  {
    id: 4,
    type: 'lost',
    title: 'Backpack',
    category: 'Bags',
    location: 'POST Building',
    postedAt: '2026-11-17T13:00',
    description: 'Gray JanSport backpack with a laptop and a TI-84 calculator inside.',
    status: 'active',
    owner: 'john@foo.com',
    photos: [],
  },
  {
    id: 5,
    type: 'lost',
    title: 'Car Keys',
    category: 'Keys',
    location: 'Bachman Lawn',
    postedAt: '2026-11-16T16:20',
    description: 'Toyota key fob and two house keys on a red UH lanyard.',
    status: 'active',
    owner: 'john@foo.com',
    photos: [],
  },
  {
    id: 6,
    type: 'found',
    title: 'UH Hoodie',
    category: 'Clothing',
    location: 'Warrior Recreation Center',
    postedAt: '2026-11-14T18:05',
    description: 'Navy UH hoodie, size M, left on a bench near the lockers.',
    status: 'resolved',
    owner: 'john@foo.com',
    photos: [],
  },
  {
    id: 7,
    type: 'lost',
    title: 'ICS 314 Notebook',
    category: 'Books & Notes',
    location: 'Sinclair Library',
    postedAt: '2026-11-13T10:00',
    description: 'Blue spiral notebook. Name is written inside the front cover.',
    status: 'active',
    owner: 'sammie@hawaii.edu',
    photos: [],
  },
  {
    id: 8,
    type: 'found',
    title: 'TI-84 Calculator',
    category: 'Electronics',
    location: 'Art Building',
    postedAt: '2026-11-12T15:40',
    description: 'Found under a seat in the Art Auditorium after a lecture.',
    status: 'resolved',
    owner: 'riki@hawaii.edu',
    photos: [],
  },
];

/** Find one item by id, or undefined if there is no such item. */
export const getItem = (id: number) => sampleItems.find((item) => item.id === id);

/** Items posted by one user (used by the Dashboard). */
export const getItemsByOwner = (owner: string) => sampleItems.filter((item) => item.owner === owner);

const parse = (postedAt: string) => new Date(`${postedAt}:00-10:00`);

/** e.g. "Nov 18, 2026" */
export const formatDate = (postedAt: string) =>
  parse(postedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'Pacific/Honolulu',
  });

/** e.g. "2 hours ago", "1 day ago". Falls back to the date after a week. */
export const timeAgo = (postedAt: string) => {
  const minutes = Math.floor((Date.now() - parse(postedAt).getTime()) / 60000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} day${days === 1 ? '' : 's'} ago`;
  return formatDate(postedAt);
};
