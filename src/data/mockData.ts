import { Video, Channel, Comment } from '../types';

export const mockChannels: Channel[] = [
  {
    id: '1',
    name: 'Al Jazeera English',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 15200000,
    verified: true,
    description: 'Breaking news, world affairs and in-depth analysis',
    bannerImage: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200&h=300&fit=crop',
    videoCount: 2145
  },
  {
    id: '2',
    name: 'BBC World News',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 8500000,
    verified: true,
    description: 'International news and current affairs',
    videoCount: 1289
  },
  {
    id: '3',
    name: 'CNN International',
    avatar: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 12300000,
    verified: true,
    description: 'Breaking news and global perspectives',
    videoCount: 1834
  },
  {
    id: '4',
    name: 'Reuters',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 4500000,
    verified: true,
    description: 'Global news agency coverage',
    videoCount: 967
  },
  {
    id: '5',
    name: 'France 24 English',
    avatar: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 3890000,
    verified: true,
    description: 'International news from France',
    videoCount: 1156
  },
  {
    id: '6',
    name: 'DW News',
    avatar: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 2670000,
    verified: true,
    description: 'German international broadcaster',
    videoCount: 898
  },
  {
    id: '7',
    name: 'Sky News',
    avatar: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    subscribers: 6500000,
    verified: true,
    description: 'Breaking news and analysis',
    videoCount: 1203
  }
];

export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'LIVE: Breaking News Coverage - Middle East Crisis Updates',
    description: 'Live coverage of the latest developments in the Middle East crisis with expert analysis and on-ground reporting from our correspondents.',
    thumbnail: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: 'LIVE',
    views: 2400000,
    uploadDate: '2024-01-15',
    channel: mockChannels[0],
    likes: 45000,
    dislikes: 1200,
    tags: ['breaking news', 'middle east', 'live', 'crisis']
  },
  {
    id: '2',
    title: 'Climate Summit 2024: World Leaders Gather for Emergency Talks',
    description: 'World leaders convene for urgent climate discussions as global temperatures reach record highs. Live coverage and analysis.',
    thumbnail: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '45:32',
    views: 1890000,
    uploadDate: '2024-01-14',
    channel: mockChannels[0],
    likes: 78000,
    dislikes: 2100,
    tags: ['climate', 'summit', 'environment', 'politics']
  },
  {
    id: '3',
    title: 'Global Economic Outlook: Markets React to Central Bank Decisions',
    description: 'Analysis of global market movements following major central bank policy announcements and their impact on emerging economies.',
    thumbnail: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '28:15',
    views: 1560000,
    uploadDate: '2024-01-13',
    channel: mockChannels[1],
    likes: 62000,
    dislikes: 1800,
    tags: ['economy', 'markets', 'finance', 'analysis']
  },
  {
    id: '4',
    title: 'Ukraine War: Latest Developments and International Response',
    description: 'Comprehensive coverage of the ongoing conflict in Ukraine with updates from the frontlines and diplomatic efforts.',
    thumbnail: 'https://images.pexels.com/photos/8828598/pexels-photo-8828598.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '52:18',
    views: 3200000,
    uploadDate: '2024-01-12',
    channel: mockChannels[2],
    likes: 89000,
    dislikes: 3200,
    tags: ['ukraine', 'war', 'conflict', 'international']
  },
  {
    id: '5',
    title: 'Tech Giants Under Scrutiny: AI Regulation Debate Intensifies',
    description: 'Investigation into major technology companies and the growing calls for artificial intelligence regulation worldwide.',
    thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '35:42',
    views: 1800000,
    uploadDate: '2024-01-11',
    channel: mockChannels[0],
    likes: 56000,
    dislikes: 1500,
    tags: ['technology', 'ai', 'regulation', 'investigation']
  },
  {
    id: '6',
    title: 'Humanitarian Crisis in Gaza: UN Emergency Session',
    description: 'Live coverage from the United Nations emergency session addressing the humanitarian situation in Gaza.',
    thumbnail: 'https://images.pexels.com/photos/8828598/pexels-photo-8828598.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '1:15:22',
    views: 4200000,
    uploadDate: '2024-01-10',
    channel: mockChannels[0],
    likes: 125000,
    dislikes: 8900,
    tags: ['gaza', 'humanitarian', 'un', 'crisis']
  },
  {
    id: '7',
    title: 'Election 2024: Key Battleground States Analysis',
    description: 'In-depth analysis of crucial swing states that could determine the outcome of the upcoming presidential election.',
    thumbnail: 'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '42:33',
    views: 2100000,
    uploadDate: '2024-01-09',
    channel: mockChannels[2],
    likes: 78000,
    dislikes: 4200,
    tags: ['election', 'politics', 'analysis', 'democracy']
  },
  {
    id: '8',
    title: 'Exclusive: Inside the Refugee Crisis at European Borders',
    description: 'Exclusive reporting from European border crossings documenting the ongoing refugee crisis and humanitarian response.',
    thumbnail: 'https://images.pexels.com/photos/8828598/pexels-photo-8828598.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '38:45',
    views: 1200000,
    uploadDate: '2024-01-08',
    channel: mockChannels[0],
    likes: 45000,
    dislikes: 2100,
    tags: ['refugees', 'europe', 'crisis', 'exclusive']
  },
  {
    id: '9',
    title: 'COVID-19 Pandemic: Three Years Later - Global Health Assessment',
    description: 'Comprehensive review of the global response to COVID-19 three years after the pandemic began, lessons learned and future preparedness.',
    thumbnail: 'https://images.pexels.com/photos/3992933/pexels-photo-3992933.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '29:56',
    views: 980000,
    uploadDate: '2024-01-07',
    channel: mockChannels[1],
    likes: 32000,
    dislikes: 1200,
    tags: ['covid', 'pandemic', 'health', 'global']
  },
  {
    id: '10',
    title: 'Space Race 2024: Private Companies vs Government Programs',
    description: 'Analysis of the new space race between private aerospace companies and traditional government space programs.',
    thumbnail: 'https://images.pexels.com/photos/586063/pexels-photo-586063.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '44:33',
    views: 1450000,
    uploadDate: '2024-01-06',
    channel: mockChannels[3],
    likes: 67000,
    dislikes: 1800,
    tags: ['space', 'technology', 'private sector', 'government']
  },
  {
    id: '11',
    title: 'Water Crisis: Millions Face Severe Shortages Worldwide',
    description: 'Investigation into the global water crisis affecting millions of people worldwide and potential solutions being implemented.',
    thumbnail: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '36:28',
    views: 1340000,
    uploadDate: '2024-01-05',
    channel: mockChannels[0],
    likes: 54000,
    dislikes: 1100,
    tags: ['water', 'crisis', 'environment', 'investigation']
  },
  {
    id: '12',
    title: 'Cybersecurity Alert: Major Data Breaches Rock Financial Sector',
    description: 'Breaking coverage of significant cybersecurity breaches affecting major financial institutions and their global impact.',
    thumbnail: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=640&h=360&fit=crop',
    duration: '31:15',
    views: 2200000,
    uploadDate: '2024-01-04',
    channel: mockChannels[2],
    likes: 89000,
    dislikes: 2300,
    tags: ['cybersecurity', 'finance', 'data breach', 'technology']
  }
];

export const mockComments: Comment[] = [
  {
    id: '1',
    author: 'NewsWatcher2024',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    content: 'Excellent coverage as always. Al Jazeera provides the most comprehensive international news.',
    timestamp: '2 hours ago',
    likes: 234,
    replies: [
      {
        id: '1-1',
        author: 'GlobalViewer',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
        content: 'Agreed! Their Middle East coverage is unmatched.',
        timestamp: '1 hour ago',
        likes: 45
      }
    ]
  },
  {
    id: '2',
    author: 'PoliticsFollower',
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    content: 'This analysis really helped me understand the complex situation. Thank you for the detailed reporting.',
    timestamp: '4 hours ago',
    likes: 156
  },
  {
    id: '3',
    author: 'InternationalStudent',
    avatar: 'https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop',
    content: 'Using this for my international relations research. Great source of information.',
    timestamp: '6 hours ago',
    likes: 89
  }
];