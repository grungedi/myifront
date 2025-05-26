import { ConversationType, MessageType } from '../types';

export const sampleConversations: ConversationType[] = [
  {
    id: '1',
    title: 'Explaining quantum computing',
    created_at: '2023-06-15T10:30:00Z',
    messages: [
      {
        id: 'msg_1_1',
        content: 'Can you explain quantum computing in simple terms?',
        role: 'user',
        timestamp: '2023-06-15T10:30:00Z',
      },
      {
        id: 'msg_1_2',
        content: 'Quantum computing uses quantum bits or "qubits" that can exist in multiple states simultaneously, unlike classical bits which are either 0 or 1. This property, called superposition, along with entanglement (where qubits become connected and the state of one instantly affects the other), allows quantum computers to perform certain calculations much faster than traditional computers. Instead of processing tasks sequentially, quantum computers can explore multiple possibilities at once, making them potentially revolutionary for solving complex problems like drug discovery, optimization, and cryptography.',
        role: 'assistant',
        timestamp: '2023-06-15T10:30:30Z',
      },
      {
        id: 'msg_1_3',
        content: 'Thanks! How are qubits physically created?',
        role: 'user',
        timestamp: '2023-06-15T10:31:00Z',
      },
      {
        id: 'msg_1_4',
        content: 'Qubits can be physically implemented in several ways:\n\n1. Superconducting circuits: The most common approach used by companies like IBM and Google, where electric current can flow in two directions simultaneously at extremely cold temperatures (near absolute zero).\n\n2. Trapped ions: Individual atoms are suspended in electromagnetic fields, and their electron states represent qubits.\n\n3. Photonic qubits: Using properties of light particles (photons) like polarization to store quantum information.\n\n4. Topological qubits: Microsoft is researching these, which use exotic quasiparticles that are theoretically more stable.\n\nEach approach has advantages and challenges regarding stability, error rates, and scalability. Keeping qubits in their quantum state (preventing "decoherence") is one of the biggest challenges in quantum computing.',
        role: 'assistant',
        timestamp: '2023-06-15T10:31:30Z',
      },
    ],
  },
  {
    id: '2',
    title: 'Creative writing tips',
    created_at: '2023-06-16T14:20:00Z',
    messages: [
      {
        id: 'msg_2_1',
        content: 'Can you give me some tips for creative writing?',
        role: 'user',
        timestamp: '2023-06-16T14:20:00Z',
      },
      {
        id: 'msg_2_2',
        content: 'Here are some effective creative writing tips:\n\n1. Read widely and often - expose yourself to different styles and genres\n\n2. Write regularly - establish a consistent practice\n\n3. Show, don\'t tell - use sensory details to immerse readers\n\n4. Develop compelling characters with depth and flaws\n\n5. Create conflict - it\'s the engine of any good story\n\n6. Edit ruthlessly - be willing to "kill your darlings"\n\n7. Find your unique voice - authenticity resonates with readers\n\n8. Use specific, concrete language rather than generalizations\n\n9. Understand story structure - even when breaking conventions\n\n10. Seek feedback from trusted readers\n\nWould you like me to elaborate on any of these points?',
        role: 'assistant',
        timestamp: '2023-06-16T14:20:30Z',
      },
    ],
  },
  {
    id: '3',
    title: 'Planning a trip to Japan',
    created_at: '2023-06-17T09:15:00Z',
    messages: [
      {
        id: 'msg_3_1',
        content: 'I\'m planning a 10-day trip to Japan. What itinerary would you recommend?',
        role: 'user',
        timestamp: '2023-06-17T09:15:00Z',
      },
      {
        id: 'msg_3_2',
        content: 'Here\'s a balanced 10-day Japan itinerary:\n\nDays 1-3: Tokyo\n- Day 1: Explore Shinjuku, Shibuya, and the Metropolitan Government Building for city views\n- Day 2: Visit Asakusa (Senso-ji Temple), Ueno Park, and Akihabara\n- Day 3: Day trip to Kamakura or Nikko for temples and nature\n\nDays 4-5: Hakone/Mt. Fuji area\n- Scenic railway, lake cruise, hot springs (onsen), and hopefully Mt. Fuji views\n\nDays 6-9: Kyoto and surrounding areas\n- Day 6-7: Kyoto\'s highlights (Fushimi Inari Shrine, Arashiyama Bamboo Grove, Kinkaku-ji, Gion district)\n- Day 8: Day trip to Nara (Great Buddha, deer park)\n- Day 9: Day trip to Osaka (castle, Dotonbori food district) or Himeji Castle\n\nDay 10: Return to Tokyo for departure\n\nTravel tip: Get a 7-day Japan Rail Pass for the long-distance trains. Best seasons are spring (cherry blossoms) and fall (autumn colors), but they\'re also the busiest.\n\nWould you like more specific recommendations for any of these locations?',
        role: 'assistant',
        timestamp: '2023-06-17T09:15:45Z',
      },
    ],
  },
];

export const getSampleMessages = (conversationId: string): MessageType[] => {
  const conversation = sampleConversations.find(conv => conv.id === conversationId);
  return conversation ? conversation.messages : [];
};