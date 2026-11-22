// Local data source for Nova Movement Studio.
// Each class is a recurring session type; `sessions` are the specific bookable
// time slots (FR03: at least 10 records, each with a stable id).

function hoursFromNow(hours) {
  return new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
}

function daysFromNow(days, hour) {
  const d = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
}

export const CATEGORIES = [
  'Yoga',
  'HIIT',
  'Strength',
  'Cycling',
  'Dance',
  'Boxing',
  'Recovery',
  'Pilates',
];

export const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

// Rank used by the eligibility rule (src/rules/eligibilityRule.js)
export const LEVEL_RANK = { Beginner: 1, Intermediate: 2, Advanced: 3 };

export const CLASSES = [
  {
    id: 'sunrise-power-yoga',
    name: 'Sunrise Power Yoga',
    category: 'Yoga',
    level: 'Beginner',
    instructor: 'Amna Raza',
    durationMinutes: 60,
    price: 1200,
    location: 'Studio A · F-7 Markaz, Islamabad',
    image: '/classes/yoga-sunrise.svg',
    tagline: 'A grounding, breath-led flow to start the day with intention.',
    description:
      'A beginner-friendly sequence combining sun salutations, standing postures, and a long savasana. No prior yoga experience needed.',
    equipment: ['Yoga mat provided', 'Comfortable stretch clothing'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: hoursFromNow(1), capacity: 12, booked: 9 },
      { id: 's2', startsAt: daysFromNow(1, 7), capacity: 12, booked: 4 },
      { id: 's3', startsAt: daysFromNow(3, 7), capacity: 12, booked: 0 },
    ],
  },
  {
    id: 'vinyasa-flow',
    name: 'Vinyasa Flow',
    category: 'Yoga',
    level: 'Intermediate',
    instructor: 'Amna Raza',
    durationMinutes: 60,
    price: 1300,
    location: 'Studio A · F-7 Markaz, Islamabad',
    image: '/classes/yoga-vinyasa.svg',
    tagline: 'Dynamic, breath-synced movement for an established practice.',
    description:
      'A faster-paced vinyasa sequence linking breath to movement, including arm balances and deeper backbends. Best suited to students already comfortable with basic postures.',
    equipment: ['Yoga mat provided', 'Grip socks recommended'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(0, 19), capacity: 10, booked: 10 },
      { id: 's2', startsAt: daysFromNow(2, 18), capacity: 10, booked: 6 },
      { id: 's3', startsAt: daysFromNow(5, 18), capacity: 10, booked: 2 },
    ],
  },
  {
    id: 'hiit-circuit-blast',
    name: 'HIIT Circuit Blast',
    category: 'HIIT',
    level: 'Intermediate',
    instructor: 'Bilal Khan',
    durationMinutes: 45,
    price: 1500,
    location: 'Studio B · F-7 Markaz, Islamabad',
    image: '/classes/hiit-circuit.svg',
    tagline: 'Full-body interval stations to build conditioning fast.',
    description:
      'Eight rotating stations of bodyweight and kettlebell intervals, 40 seconds on / 20 seconds off. Scalable for most fitness levels with coaching cues throughout.',
    equipment: ['Kettlebells provided', 'Training shoes required'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: hoursFromNow(3), capacity: 16, booked: 11 },
      { id: 's2', startsAt: daysFromNow(1, 18), capacity: 16, booked: 16 },
      { id: 's3', startsAt: daysFromNow(4, 18), capacity: 16, booked: 3 },
    ],
  },
  {
    id: 'advanced-hiit-shred',
    name: 'Advanced HIIT Shred',
    category: 'HIIT',
    level: 'Advanced',
    instructor: 'Bilal Khan',
    durationMinutes: 45,
    price: 1600,
    location: 'Studio B · F-7 Markaz, Islamabad',
    image: '/classes/hiit-advanced.svg',
    tagline: 'Unscaled intervals for experienced athletes.',
    description:
      'The full-intensity version of our signature circuit: heavier loads, plyometrics, and shorter rest. Built for members who already train HIIT regularly.',
    equipment: ['Kettlebells & plyo boxes provided', 'Training shoes required'],
    requiresExperience: true,
    sessions: [
      { id: 's1', startsAt: daysFromNow(1, 6) /* early AM */, capacity: 12, booked: 5 },
      { id: 's2', startsAt: daysFromNow(3, 6), capacity: 12, booked: 12 },
      { id: 's3', startsAt: daysFromNow(6, 6), capacity: 12, booked: 2 },
    ],
  },
  {
    id: 'strength-foundations',
    name: 'Strength Foundations',
    category: 'Strength',
    level: 'Beginner',
    instructor: 'Hassan Ali',
    durationMinutes: 50,
    price: 1400,
    location: 'Studio C · F-7 Markaz, Islamabad',
    image: '/classes/strength-foundations.svg',
    tagline: 'Learn the big lifts with coached, small-group attention.',
    description:
      'Squat, hinge, push, and pull patterns taught with barbells and dumbbells at light loads. Ideal first strength class with a capped group size for individual coaching.',
    equipment: ['Barbells & dumbbells provided', 'Closed-toe shoes required'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(0, 17), capacity: 6, booked: 4 },
      { id: 's2', startsAt: daysFromNow(2, 17), capacity: 6, booked: 6 },
      { id: 's3', startsAt: daysFromNow(4, 17), capacity: 6, booked: 1 },
    ],
  },
  {
    id: 'olympic-lifting-lab',
    name: 'Olympic Lifting Lab',
    category: 'Strength',
    level: 'Advanced',
    instructor: 'Hassan Ali',
    durationMinutes: 60,
    price: 1900,
    location: 'Studio C · F-7 Markaz, Islamabad',
    image: '/classes/strength-olympic.svg',
    tagline: 'Technical clean, jerk, and snatch work for lifters.',
    description:
      'Technical coaching on the Olympic lifts with video feedback. Requires existing comfort under a loaded barbell.',
    equipment: ['Olympic platforms & bumper plates provided'],
    requiresExperience: true,
    sessions: [
      { id: 's1', startsAt: daysFromNow(1, 19), capacity: 8, booked: 3 },
      { id: 's2', startsAt: daysFromNow(4, 19), capacity: 8, booked: 8 },
      { id: 's3', startsAt: daysFromNow(7, 19), capacity: 8, booked: 0 },
    ],
  },
  {
    id: 'spin-ride-45',
    name: 'Spin Ride 45',
    category: 'Cycling',
    level: 'Intermediate',
    instructor: 'Zara Iqbal',
    durationMinutes: 45,
    price: 1500,
    location: 'Cycle Studio · F-7 Markaz, Islamabad',
    image: '/classes/cycling-spin.svg',
    tagline: 'Rhythm-based indoor ride with climbs and sprints.',
    description:
      'A 45-minute ride mixing seated climbs and standing sprints, set to a curated playlist. Resistance is self-adjusted, so riders of most levels can keep pace.',
    equipment: ['Bikes & cleats-compatible pedals provided'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: hoursFromNow(2), capacity: 20, booked: 18 },
      { id: 's2', startsAt: daysFromNow(2, 7), capacity: 20, booked: 20 },
      { id: 's3', startsAt: daysFromNow(5, 7), capacity: 20, booked: 7 },
    ],
  },
  {
    id: 'endurance-cycling',
    name: 'Endurance Cycling',
    category: 'Cycling',
    level: 'Advanced',
    instructor: 'Zara Iqbal',
    durationMinutes: 60,
    price: 1700,
    location: 'Cycle Studio · F-7 Markaz, Islamabad',
    image: '/classes/cycling-endurance.svg',
    tagline: 'A longer, high-output ride for conditioned riders.',
    description:
      'A sustained 60-minute effort at higher average resistance, aimed at riders already comfortable with 45-minute classes.',
    equipment: ['Bikes & cleats-compatible pedals provided'],
    requiresExperience: true,
    sessions: [
      { id: 's1', startsAt: daysFromNow(2, 6), capacity: 16, booked: 9 },
      { id: 's2', startsAt: daysFromNow(5, 6), capacity: 16, booked: 16 },
      { id: 's3', startsAt: daysFromNow(8, 6), capacity: 16, booked: 1 },
    ],
  },
  {
    id: 'zumba-dance-party',
    name: 'Zumba Dance Party',
    category: 'Dance',
    level: 'Beginner',
    instructor: 'Mehak Noor',
    durationMinutes: 50,
    price: 1100,
    location: 'Studio A · F-7 Markaz, Islamabad',
    image: '/classes/dance-zumba.svg',
    tagline: 'High-energy dance cardio, no steps memorised in advance.',
    description:
      'Latin and pop-inspired dance cardio with easy-to-follow choreography. A social, low-pressure way to get a cardio session in.',
    equipment: ['None — just comfortable shoes'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(0, 20), capacity: 18, booked: 10 },
      { id: 's2', startsAt: daysFromNow(3, 20), capacity: 18, booked: 2 },
      { id: 's3', startsAt: daysFromNow(6, 20), capacity: 18, booked: 0 },
    ],
  },
  {
    id: 'boxing-fundamentals',
    name: 'Boxing Fundamentals',
    category: 'Boxing',
    level: 'Beginner',
    instructor: 'Daniyal Farooq',
    durationMinutes: 55,
    price: 1500,
    location: 'Studio B · F-7 Markaz, Islamabad',
    image: '/classes/boxing-fundamentals.svg',
    tagline: 'Stance, footwork, and combinations on the pads.',
    description:
      'An introduction to boxing technique — stance, guard, jab-cross combinations — on pads with a partner or bag. Gloves provided.',
    equipment: ['Gloves & hand wraps provided'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(1, 17), capacity: 14, booked: 7 },
      { id: 's2', startsAt: daysFromNow(3, 17), capacity: 14, booked: 14 },
      { id: 's3', startsAt: daysFromNow(6, 17), capacity: 14, booked: 1 },
    ],
  },
  {
    id: 'boxing-conditioning',
    name: 'Boxing Conditioning',
    category: 'Boxing',
    level: 'Intermediate',
    instructor: 'Daniyal Farooq',
    durationMinutes: 55,
    price: 1600,
    location: 'Studio B · F-7 Markaz, Islamabad',
    image: '/classes/boxing-conditioning.svg',
    tagline: 'Combination-heavy rounds for returning boxers.',
    description:
      'Longer combinations and conditioning rounds for students who already know basic boxing technique.',
    equipment: ['Gloves & hand wraps provided'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(2, 19), capacity: 14, booked: 6 },
      { id: 's2', startsAt: daysFromNow(4, 19), capacity: 14, booked: 3 },
      { id: 's3', startsAt: daysFromNow(7, 19), capacity: 14, booked: 0 },
    ],
  },
  {
    id: 'mobility-recovery-flow',
    name: 'Mobility & Recovery Flow',
    category: 'Recovery',
    level: 'Beginner',
    instructor: 'Amna Raza',
    durationMinutes: 40,
    price: 1000,
    location: 'Studio A · F-7 Markaz, Islamabad',
    image: '/classes/recovery-flow.svg',
    tagline: 'Slow mobility work and guided stretching.',
    description:
      'A low-intensity class using foam rollers and guided mobility drills, designed to be taken alongside harder training days.',
    equipment: ['Foam rollers & bands provided'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: daysFromNow(0, 21), capacity: 14, booked: 3 },
      { id: 's2', startsAt: daysFromNow(2, 21), capacity: 14, booked: 0 },
      { id: 's3', startsAt: daysFromNow(5, 21), capacity: 14, booked: 0 },
    ],
  },
  {
    id: 'reformer-pilates',
    name: 'Reformer Pilates',
    category: 'Pilates',
    level: 'Intermediate',
    instructor: 'Mehak Noor',
    durationMinutes: 50,
    price: 1800,
    location: 'Studio C · F-7 Markaz, Islamabad',
    image: '/classes/pilates-reformer.svg',
    tagline: 'Controlled, low-impact strength work on the reformer.',
    description:
      'Reformer-based Pilates focused on core control, alignment, and low-impact strength. Small class size due to limited equipment.',
    equipment: ['Reformer machines provided'],
    requiresExperience: false,
    sessions: [
      { id: 's1', startsAt: hoursFromNow(1.5), capacity: 5, booked: 5 },
      { id: 's2', startsAt: daysFromNow(2, 8), capacity: 5, booked: 2 },
      { id: 's3', startsAt: daysFromNow(4, 8), capacity: 5, booked: 0 },
    ],
  },
];

export function getClassById(id) {
  return CLASSES.find((c) => c.id === id);
}
