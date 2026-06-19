export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Live Collaboration', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

export const problemCards = [
  {
    title: 'Ideas buried in chat',
    description:
      'Important places and plans get lost between random messages and links.',
    imageKey: 'problemChat',
  },
  {
    title: 'No clear shared plan',
    description:
      'Everyone talks about the trip, but no one sees the full itinerary in one place.',
    imageKey: 'problemPlan',
  },
  {
    title: 'Too many tools',
    description:
      'You bounce between messages, notes, maps, and saved posts just to plan one trip.',
    imageKey: 'problemTools',
  },
  {
    title: 'Group decisions get confusing',
    description:
      "It's hard to track who joined, what changed, and who is handling what.",
    imageKey: 'problemGroup',
  },
]

export const featureCards = [
  {
    title: 'Shared itinerary planning',
    description:
      'Keep your full trip plan in one place that everyone can follow.',
    imageKey: 'featureGraphicItinerary',
    layout: 'graphic-top',
  },
  {
    title: 'Trip planning, actually live',
    description:
      'See your group add ideas, react to changes, assign roles, and shape the itinerary together in real time',
    mobileDescription: [
      'See your group add ideas, react to changes, assign roles,',
      'and shape the itinerary together in real time',
    ],
    imageKey: 'featureGraphicLive',
    layout: 'text-top',
    mobileLayout: 'graphic-top',
  },
  {
    title: 'AI trip generation',
    description:
      'Start faster with an itinerary that gives your group a real foundation.',
    imageKey: 'featureGraphicAi',
    layout: 'text-top-overlay',
    mobileLayout: 'graphic-top',
  },
  {
    title: 'Vibe and activity matching',
    description:
      'Shape the trip around what your group actually wants to do.',
    imageKey: 'featureGraphicVibe',
    layout: 'graphic-top-compact',
  },
]

export const bookFeatures = [
  'Flight stays and activities all in one place',
  'Auto synced with your itenary',
  'No switching between multiple apps',
]

export const bookDeals = [
  {
    title: 'Bay View Boutique Hotel',
    description: 'Special weekend rates for Trubbi members. 20% off bookings.',
    location: 'Outer Sunset, SF',
    imageKey: 'bookHotel',
  },
  {
    title: 'Golden Gate Getaways',
    description: 'Fly first class for less! Save 15% on all flights.',
    location: 'Exclusive for Trubbi members',
    imageKey: 'bookFlight',
    showLocationIcon: false,
  },
  {
    title: 'AquaGlide Jet Skis',
    description: 'Save 15% on jet ski rentals with code SPLASH15.',
    location: 'Lake Havasu, AZ',
    imageKey: 'bookActivity',
  },
]

export const howItWorksSteps = [
  {
    step: 'STEP 01',
    title: 'Choose destination and dates',
    description: "Start with where you're going and when you're traveling.",
    imageKey: 'stepDestination',
  },
  {
    step: 'STEP 02',
    title: 'Invite friends and assign roles',
    description: 'Add your group and decide who can manage what.',
    imageKey: 'stepInvite',
  },
  {
    step: 'STEP 03',
    title: 'Pick the vibe and activities',
    description: 'Choose the kind of trip you want and what you want to do.',
    imageKey: 'stepVibe',
  },
  {
    step: 'STEP 04',
    title: 'Generate and edit the itinerary',
    description: 'Get a trip plan you can update together day by day.',
    imageKey: 'stepItinerary',
  },
]

export const pricingPlans = {
  monthly: [
    {
      label: 'Free',
      price: '$0',
      period: '/Lifetime',
      name: 'Explorer',
      features: [
        'Create a trip',
        'Add destination and dates',
        'Invite friends',
        'Build a basic itinerary',
      ],
      variant: 'outline',
      headerColor: 'bg-brand-secondary',
    },
    {
      label: 'Popular',
      price: '$20',
      period: '/Month',
      name: 'Voyager',
      features: [
        'Everything in Free',
        'Early access to Trubbi',
        'Reserve your username',
        'Get live collaboration first',
      ],
      variant: 'primary',
      headerColor: 'bg-brand-primary',
    },
    {
      label: 'Recommended',
      price: '$40',
      period: '/Month',
      name: 'Director',
      features: [
        'Everything in Early Access',
        'Advanced roles and permissions',
        'Better shared planning tools',
        'More control for group trips',
      ],
      variant: 'outline',
      headerColor: 'bg-brand-secondary',
    },
  ],
  yearly: [
    {
      label: 'Free',
      price: '$0',
      period: '/Lifetime',
      name: 'Explorer',
      features: [
        'Create a trip',
        'Add destination and dates',
        'Invite friends',
        'Build a basic itinerary',
      ],
      variant: 'outline',
      headerColor: 'bg-brand-secondary',
    },
    {
      label: 'Popular',
      price: '$16',
      period: '/Month',
      name: 'Voyager',
      features: [
        'Everything in Free',
        'Early access to Trubbi',
        'Reserve your username',
        'Get live collaboration first',
      ],
      variant: 'primary',
      headerColor: 'bg-brand-primary',
    },
    {
      label: 'Recommended',
      price: '$32',
      period: '/Month',
      name: 'Director',
      features: [
        'Everything in Early Access',
        'Advanced roles and permissions',
        'Better shared planning tools',
        'More control for group trips',
      ],
      variant: 'outline',
      headerColor: 'bg-brand-secondary',
    },
  ],
}

export const faqItems = [
  {
    question: 'Is Trubbi for solo trips or group trips?',
    answer:
      'Both! Whether you’re traveling solo or planning with friends and family, Trubbi creates a personalized itinerary tailored to your trip. For group travel, everyone can add their interests and preferences, allowing the AI to generate an itinerary that reflects the group’s shared interests while balancing what each traveler wants to experience. Combined with live collaboration, everyone can plan together and stay on the same page from start to finish.',
  },
  {
    question: 'Can I invite my friends?',
    answer:
      'Absolutely! Planning trips with other people is what Trubbi is built for. Invite friends, family, or anyone traveling with you to collaborate on the same itinerary, making it easy for everyone to stay organized and involved throughout the planning process.',
  },
  {
    question: 'Can different people manage different parts of the trip?',
    answer:
      'Yes. Multiple people can collaborate on the same itinerary in real time with live collaboration. You can also assign permission-based roles that determine what each person is allowed to do, such as editing the itinerary, inviting or removing travelers, and managing other collaboration settings. This gives you full control over who can make changes while keeping trip planning organized.',
  },
  {
    question: 'Can I edit the generated itinerary?',
    answer:
      'Yes! Your AI-generated itinerary is simply a starting point for building your perfect trip. It recommends destinations, restaurants, attractions, and activities based on your travel preferences, budget, travel style, and reason for traveling. From there, you have complete freedom to edit, rearrange, remove, or add anything until your itinerary is exactly how you want it.',
  },
  {
    question: 'Is the app available yet?',
    answer:
      'Not yet. Trubbi is currently in its final stages of testing to ensure the best possible experience before launch. We’ll be available soon—join the waitlist to be among the first to know when we launch.',
  },
]

export const footerLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Live Collaboration', href: '#how-it-works' },
  { label: 'FAQs', href: '#faqs' },
]

/** Paste any social URL — label + icon are detected automatically */
export const footerSocialLinks = [
  'https://www.instagram.com/trubbiai',
  'https://www.tiktok.com/@trubbi.ai',
  'https://www.youtube.com/@trubbi',
]
