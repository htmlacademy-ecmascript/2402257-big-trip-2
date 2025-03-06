import { getRandomInteger } from '../util';

const mockEventPointDestinations = [
  {
    id: 1,
    name: 'amsterdam',
    infoText: 'Nunc fermentum tortor ac porta dapibus',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'consectetur adipiscing elit',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Cras aliquet varius magna',
      },
    ],
  },
  {
    id: 2,
    name: 'israel',
    infoText: 'Aliquam id orci ut lectus varius viverra',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Lorem ipsum dolor sit amet',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'consectetur adipiscing elit',
      },
    ],
  },
  {
    id: 3,
    name: 'geneva',
    infoText: 'Sed blandit, eros vel aliquam faucibus',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Aliquam id orci ut lectus varius viverra.',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'condimentum sed nibh vita',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'consectetur adipiscing elit',
      },
    ],
  },
  {
    id: 4,
    name: 'moscow',
    infoText: 'Nullam nunc ex, convallis sed finibus eget',
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'Aliquam id orci ut lectus varius viverra.',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'condimentum sed nibh vita',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'consectetur adipiscing elit',
      },
      {
        src: `https://loremflickr.com/248/152?random=${getRandomInteger()}`,
        description: 'consectetur adipiscing elit',
      },
    ],
  },
];


export { mockEventPointDestinations };
