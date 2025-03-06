import { getRandomElement } from '../util';

const mockEventPoint = [
  {
    type: 'taxi',
    name: 'amsterdam',
    startTime: new Date('2025-02-12T13:00'),
    endTime: new Date('2025-02-12T13:10'),
    price: '995',
    isFavorite: true,
    offers: [1, 3, 2],
  },
  {
    type: 'flight',
    name: 'israel',
    startTime: new Date('2025-03-10T10:00'),
    endTime: new Date('2025-03-10T15:00'),
    price: '3210',
    isFavorite: false,
    offers: [1, 2],
  },
  {
    type: 'train',
    name: 'geneva',
    startTime: new Date('2025-04-11T18:00'),
    endTime: new Date('2025-04-11T20:10'),
    price: '431',
    isFavorite: false,
    offers: [2, 4],
  },
  {
    type: 'check-in',
    name: 'moscow',
    startTime: new Date('2025-06-18T11:30'),
    endTime: new Date('2025-06-18T15:50'),
    price: '1067',
    isFavorite: true,
    offers: [],
  },
];

function getRandomEventPoint() {
  return getRandomElement(mockEventPoint);
}

export { getRandomEventPoint };
