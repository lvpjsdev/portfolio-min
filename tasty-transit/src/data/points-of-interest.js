// tasty-transit/src/data/points-of-interest.js
export const pointsOfInterest = [
  {
    id: 'index',
    x: 0.5,        // Center of panorama
    y: 0.4,
    zoom: 1.0,
    bonus: false,
    label: 'Main Gate'
  },
  {
    id: 'about',
    x: 0.2,
    y: 0.3,
    zoom: 1.5,
    bonus: false,
    label: 'Tower'
  },
  {
    id: 'contact',
    x: 0.8,
    y: 0.5,
    zoom: 1.5,
    bonus: false,
    label: 'Courtyard'
  },
  {
    id: 'experience',
    x: 0.3,
    y: 0.6,
    zoom: 1.8,
    bonus: false,
    label: 'Great Hall'
  },
  {
    id: 'projects',
    x: 0.7,
    y: 0.35,
    zoom: 1.6,
    bonus: false,
    label: 'Barracks'
  },
  {
    id: 'skills',
    x: 0.5,
    y: 0.25,
    zoom: 2.0,
    bonus: false,
    label: 'Turret'
  },
  // Bonus points
  {
    id: 'secret-well',
    x: 0.15,
    y: 0.7,
    zoom: 2.5,
    bonus: true,
    label: 'Ancient Well'
  },
  {
    id: 'secret-garden',
    x: 0.85,
    y: 0.65,
    zoom: 2.0,
    bonus: true,
    label: 'Hidden Garden'
  }
];
