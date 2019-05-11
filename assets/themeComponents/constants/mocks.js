const categories = [
  {
    id: 'plants',
    name: 'Plants',
    tags: ['badges', 'missions'],
    count: 147,
    image: require('../../../assets/icons/temeIcons/plants.png')
  },
  {
    id: 'seeds',
    name: 'Seeds',
    tags: ['badges', 'missions'],
    count: 16,
    image: require('../../../assets/icons/temeIcons/seeds.png')
  },
  {
    id: 'flowers',
    name: 'Flowers',
    tags: ['badges', 'missions'],
    count: 68,
    image: require('../../../assets/icons/temeIcons/flowers.png')
  },
  {
    id: 'sprayers',
    name: 'Sprayers',
    tags: ['badges', 'powers'],
    count: 17,
    image: require('../../../assets/icons/temeIcons/sprayers.png')
  },
  {
    id: 'pots',
    name: 'Pots',
    tags: ['badges', 'powers'],
    count: 47,
    image: require('../../../assets/icons/temeIcons/pots.png')
  },
  {
    id: 'fertilizers',
    name: 'fertilizers',
    tags: ['badges', 'powers'],
    count: 47,
    image: require('../../../assets/icons/temeIcons/fertilizers.png')
  },
];

const products = [
  {
    id: 1, 
    name: '16 Best Plants That Thrive In Your Bedroom',
    description: 'Bedrooms deserve to be decorated with lush greenery just like every other room in the house – but it can be tricky to find a plant that thrives here. Low light, high humidity and warm temperatures mean only certain houseplants will flourish.',
    tags: ['Interior', '27 m²', 'Ideas'],
    images: [
      require('../../../assets/images/temeImages/plants_1.png'),
      require('../../../assets/images/temeImages/plants_2.png'),
      require('../../../assets/images/temeImages/plants_3.png'),
      // showing only 3 images, show +6 for the rest
      require('../../../assets/images/temeImages/plants_1.png'),
      require('../../../assets/images/temeImages/plants_2.png'),
      require('../../../assets/images/temeImages/plants_3.png'),
      require('../../../assets/images/temeImages/plants_1.png'),
      require('../../../assets/images/temeImages/plants_2.png'),
      require('../../../assets/images/temeImages/plants_3.png'),
    ]
  }
];

const explore = [
  // images
  require('../../../assets/images/temeImages/explore_1.png'),
  require('../../../assets/images/temeImages/explore_2.png'),
  require('../../../assets/images/temeImages/explore_3.png'),
  require('../../../assets/images/temeImages/explore_4.png'),
  require('../../../assets/images/temeImages/explore_5.png'),
  require('../../../assets/images/temeImages/explore_6.png'),
];

const profile = {
  username: 'react-ui-kit',
  location: 'Europe',
  email: 'contact@react-ui-kit.com',
  avatar: require('../../../assets/images/temeImages/avatar.png'),
  budget: 1000,
  monthly_cap: 5000,
  notifications: true,
  newsletter: false,
};

export {
  categories,
  explore,
  products,
  profile,
}