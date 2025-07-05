import { CyclePhase, PhaseInfo, PhaseRecommendations } from '../types/cycle';

export const phaseInfoData: Record<CyclePhase, PhaseInfo> = {
  [CyclePhase.MENSTRUAL]: {
    name: CyclePhase.MENSTRUAL,
    displayName: 'Menstrual Phase',
    description: 'Period begins. Hormone levels are at their lowest.',
    durationRange: [3, 7],
    color: '#FDA4AF', // rose-300
  },
  [CyclePhase.FOLLICULAR]: {
    name: CyclePhase.FOLLICULAR,
    displayName: 'Follicular Phase',
    description: 'Estrogen rises as follicles develop in the ovaries.',
    durationRange: [7, 10],
    color: '#C4B5FD', // lavender-300
  },
  [CyclePhase.OVULATORY]: {
    name: CyclePhase.OVULATORY,
    displayName: 'Ovulatory Phase',
    description: 'Egg is released. Energy and mood typically peak.',
    durationRange: [3, 5],
    color: '#A7F3D0', // emerald-200
  },
  [CyclePhase.LUTEAL]: {
    name: CyclePhase.LUTEAL,
    displayName: 'Luteal Phase',
    description: 'Progesterone rises. Body prepares for potential pregnancy.',
    durationRange: [10, 14],
    color: '#FCD34D', // amber-300
  },
};

export const phaseRecommendations: Record<CyclePhase, PhaseRecommendations> = {
  [CyclePhase.MENSTRUAL]: {
    phase: CyclePhase.MENSTRUAL,
    foods: [
      {
        name: 'Iron-Rich Foods',
        description: 'Replenish iron lost during menstruation',
        benefits: ['Prevents anemia', 'Boosts energy levels', 'Supports oxygen transport'],
        imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg'
      },
      {
        name: 'Anti-Inflammatory Foods',
        description: 'Help reduce inflammation and cramping',
        benefits: ['Reduces pain', 'Decreases bloating', 'Supports comfort'],
        imageUrl: 'https://images.pexels.com/photos/1028598/pexels-photo-1028598.jpeg'
      },
      {
        name: 'Magnesium-Rich Foods',
        description: 'Helps relax muscles and reduce cramps',
        benefits: ['Eases muscle tension', 'Improves sleep', 'Reduces pain'],
        imageUrl: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg'
      }
    ],
    exercises: [
      {
        name: 'Gentle Yoga',
        description: 'Slow, restorative movements to ease cramps and tension',
        duration: '15-20 minutes',
        intensity: 'light',
        instructions: [
          'Focus on hip-opening poses',
          'Incorporate deep breathing',
          'Include child\'s pose and gentle twists'
        ]
      },
      {
        name: 'Walking',
        description: 'Light cardio to improve circulation without strain',
        duration: '20-30 minutes',
        intensity: 'light',
        instructions: [
          'Walk at a comfortable pace',
          'Focus on deep breathing',
          'Choose flat terrain'
        ]
      }
    ],
    meditations: [
      {
        name: 'Body Scan Meditation',
        description: 'Release tension and connect with your body',
        duration: '10 minutes',
        instructions: 'Find a comfortable position, close your eyes, and slowly scan your attention from head to toe, noticing any sensations without judgment.'
      }
    ]
  },
  [CyclePhase.FOLLICULAR]: {
    phase: CyclePhase.FOLLICULAR,
    foods: [
      {
        name: 'Fermented Foods',
        description: 'Support gut health and hormone balance',
        benefits: ['Improves digestion', 'Supports detoxification', 'Balances hormones'],
        imageUrl: 'https://images.pexels.com/photos/5323173/pexels-photo-5323173.jpeg'
      },
      {
        name: 'Antioxidant-Rich Foods',
        description: 'Support cellular health and egg quality',
        benefits: ['Reduces oxidative stress', 'Supports fertility', 'Improves skin health'],
        imageUrl: 'https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg'
      }
    ],
    exercises: [
      {
        name: 'Strength Training',
        description: 'Build muscle and boost metabolism',
        duration: '30-45 minutes',
        intensity: 'moderate',
        instructions: [
          'Focus on compound movements',
          'Include both upper and lower body',
          'Use moderate weights with 10-12 repetitions'
        ]
      },
      {
        name: 'HIIT Workouts',
        description: 'Boost energy and metabolism',
        duration: '20 minutes',
        intensity: 'intense',
        instructions: [
          'Alternate between 30 seconds of intense work and 30 seconds of rest',
          'Include both cardio and strength exercises',
          'Modify as needed based on energy levels'
        ]
      }
    ],
    meditations: [
      {
        name: 'Visualization Meditation',
        description: 'Set intentions and visualize growth',
        duration: '15 minutes',
        instructions: 'Close your eyes and visualize your goals. See yourself achieving them with clarity and confidence.'
      }
    ]
  },
  [CyclePhase.OVULATORY]: {
    phase: CyclePhase.OVULATORY,
    foods: [
      {
        name: 'Fiber-Rich Foods',
        description: 'Support estrogen metabolism and detoxification',
        benefits: ['Balances hormones', 'Improves digestion', 'Supports detoxification'],
        imageUrl: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg'
      },
      {
        name: 'Zinc-Rich Foods',
        description: 'Support ovulation and hormone production',
        benefits: ['Supports egg health', 'Balances hormones', 'Boosts immune function'],
        imageUrl: 'https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg'
      }
    ],
    exercises: [
      {
        name: 'Circuit Training',
        description: 'Take advantage of peak energy levels',
        duration: '40-45 minutes',
        intensity: 'intense',
        instructions: [
          'Combine strength and cardio exercises',
          'Move quickly between stations',
          'Include plyometric movements for power'
        ]
      },
      {
        name: 'Dance Workouts',
        description: 'Express energy and boost mood',
        duration: '30 minutes',
        intensity: 'moderate',
        instructions: [
          'Follow along with choreographed routines',
          'Focus on having fun and expressing yourself',
          'Allow yourself to be playful and energetic'
        ]
      }
    ],
    meditations: [
      {
        name: 'Loving-Kindness Meditation',
        description: 'Cultivate compassion and connection',
        duration: '15 minutes',
        instructions: 'Focus on sending love and positive wishes to yourself, loved ones, neutral people, and even those you find difficult.'
      }
    ]
  },
  [CyclePhase.LUTEAL]: {
    phase: CyclePhase.LUTEAL,
    foods: [
      {
        name: 'Complex Carbohydrates',
        description: 'Stabilize blood sugar and mood',
        benefits: ['Reduces cravings', 'Stabilizes mood', 'Provides sustained energy'],
        imageUrl: 'https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg'
      },
      {
        name: 'Calcium-Rich Foods',
        description: 'Help reduce PMS symptoms',
        benefits: ['Reduces mood swings', 'Decreases cramping', 'Supports bone health'],
        imageUrl: 'https://images.pexels.com/photos/373882/pexels-photo-373882.jpeg'
      },
      {
        name: 'B-Vitamin Rich Foods',
        description: 'Support energy and mood',
        benefits: ['Reduces fatigue', 'Supports neurotransmitter production', 'Improves mood'],
        imageUrl: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg'
      }
    ],
    exercises: [
      {
        name: 'Pilates',
        description: 'Focus on core strength and mindful movement',
        duration: '30 minutes',
        intensity: 'moderate',
        instructions: [
          'Focus on controlled, precise movements',
          'Engage your core throughout',
          'Pay attention to proper form and alignment'
        ]
      },
      {
        name: 'Yin Yoga',
        description: 'Deep stretching and relaxation',
        duration: '45 minutes',
        intensity: 'light',
        instructions: [
          'Hold poses for 3-5 minutes each',
          'Focus on deep breathing',
          'Allow yourself to fully relax into each pose'
        ]
      }
    ],
    meditations: [
      {
        name: 'Self-Compassion Meditation',
        description: 'Practice kindness toward yourself during potentially challenging days',
        duration: '10 minutes',
        instructions: 'Place your hands on your heart, acknowledge any difficulties, and offer yourself kind and supportive words.'
      }
    ]
  }
};