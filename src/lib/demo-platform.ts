export type DemoPerson = {
  id: string
  name: string
  role: string
  bio: string
  interests: string[]
  color: string
}

export type DemoCommunity = {
  id: string
  name: string
  category: string
  description: string
  memberCount: number
  style: "studio" | "reading" | "outdoors" | "garden" | "technology"
  memberIds: string[]
}

export type CommunityPost = {
  id: string
  communityId: string
  authorId: string
  message: string
  createdAt: string
  prompt?: string
  likeCount: number
  likedByMe: boolean
}

export type DemoMessage = {
  id: string
  senderId: string
  text: string
  createdAt: string
}

export type DemoConversation = {
  id: string
  personId: string
  unreadCount: number
  messages: DemoMessage[]
}

export type DemoNotificationType =
  "connection" | "community" | "message" | "platform"

export type DemoNotification = {
  id: string
  type: DemoNotificationType
  actorId?: string
  title: string
  description: string
  createdAt: string
  href: string
  isRead: boolean
}

export type DemoProfile = {
  name: string
  email: string
  bio: string
  interests: string[]
}

export type DemoPreferences = {
  profileVisibility: "public" | "connections"
  connectionEmails: boolean
  communityDigestEmails: boolean
  messageEmails: boolean
  weeklyRecapEmails: boolean
}

export type DemoPlatformState = {
  profile: DemoProfile
  preferences: DemoPreferences
  communities: DemoCommunity[]
  joinedCommunityIds: string[]
  connectedPersonIds: string[]
  receivedRequestIds: string[]
  sentRequestIds: string[]
  posts: CommunityPost[]
  conversations: DemoConversation[]
  notifications: DemoNotification[]
  nextMessageId: number
  nextPostId: number
}

export const demoPeople: DemoPerson[] = [
  {
    id: "samira-patel",
    name: "Samira Patel",
    role: "Illustrator & zine maker",
    bio: "Collecting little stories, drawing in the margins, and always up for a slow coffee.",
    interests: ["Drawing", "Zines", "Independent art"],
    color: "bg-[#f1ddd3] text-[#915b47]",
  },
  {
    id: "jordan-lee",
    name: "Jordan Lee",
    role: "Urban gardener",
    bio: "Turning a tiny city balcony into a home for herbs, tomatoes, and bees.",
    interests: ["Gardening", "Photo walks", "Slow living"],
    color: "bg-[#e2ead7] text-[#526c42]",
  },
  {
    id: "noa-williams",
    name: "Noa Williams",
    role: "Product designer",
    bio: "Design-minded, always reading, and happiest when ideas become useful things.",
    interests: ["Design", "Books", "Creative tools"],
    color: "bg-[#e5e0f5] text-[#5b4a9b]",
  },
  {
    id: "maya-chen",
    name: "Maya Chen",
    role: "Artist & curious person",
    bio: "Making more things before they feel ready. Currently learning to print.",
    interests: ["Printmaking", "Illustration", "Music"],
    color: "bg-[#f1ddd3] text-[#915b47]",
  },
  {
    id: "noah-williams",
    name: "Noah Williams",
    role: "Librarian",
    bio: "Connecting people with books they didn't know they needed.",
    interests: ["Reading", "Local history", "Film"],
    color: "bg-[#e5e0f5] text-[#5b4a9b]",
  },
  {
    id: "avery-brooks",
    name: "Avery Brooks",
    role: "Community cook",
    bio: "Making weeknight dinners feel like a reason to gather.",
    interests: ["Cooking", "Food stories", "Gardening"],
    color: "bg-[#f2e5cc] text-[#876334]",
  },
  {
    id: "eli-navarro",
    name: "Eli Navarro",
    role: "Sound designer",
    bio: "Field recordings, strange instruments, and the good sounds of a city.",
    interests: ["Music", "Sound art", "Technology"],
    color: "bg-[#dce9ec] text-[#416b75]",
  },
  {
    id: "camila-rocha",
    name: "Camila Rocha",
    role: "Outdoor educator",
    bio: "Helping people feel at home outside, one small trail at a time.",
    interests: ["Hiking", "Nature", "Photography"],
    color: "bg-[#e2ead7] text-[#526c42]",
  },
]

export const demoCommunities: DemoCommunity[] = [
  {
    id: "open-studio",
    name: "The Open Studio",
    category: "Art & making",
    description:
      "A welcoming corner for sketches, experiments, and works in progress.",
    memberCount: 824,
    style: "studio",
    memberIds: ["maya-chen", "samira-patel", "noa-williams"],
  },
  {
    id: "margin-notes",
    name: "The Margin Notes",
    category: "Books & ideas",
    description: "Good reads, thoughtful notes, and conversations that linger.",
    memberCount: 1420,
    style: "reading",
    memberIds: ["noah-williams", "noa-williams", "maya-chen"],
  },
  {
    id: "field-notes",
    name: "Weekend Field Notes",
    category: "Outdoors & slow living",
    description: "Small discoveries and stories from the paths we take.",
    memberCount: 638,
    style: "outdoors",
    memberIds: ["camila-rocha", "jordan-lee", "avery-brooks"],
  },
  {
    id: "tiny-gardeners",
    name: "Tiny Gardeners Club",
    category: "Outdoors & slow living",
    description:
      "Share the wins, the bugs, and the tomatoes that almost made it.",
    memberCount: 512,
    style: "garden",
    memberIds: ["jordan-lee", "avery-brooks", "camila-rocha"],
  },
  {
    id: "slow-tech",
    name: "Slow Tech Society",
    category: "Technology & design",
    description:
      "A thoughtful space for making technology more human and more useful.",
    memberCount: 967,
    style: "technology",
    memberIds: ["eli-navarro", "noa-williams", "maya-chen"],
  },
]

export const demoInterests = [
  "Art & making",
  "Books & ideas",
  "Outdoors & slow living",
  "Technology & design",
  "Cooking",
  "Music",
]

export const initialDemoPlatformState: DemoPlatformState = {
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    bio: "Curious about people, places, and the ideas that bring us together.",
    interests: ["Design", "Community", "Photo walks"],
  },
  preferences: {
    profileVisibility: "public",
    connectionEmails: true,
    communityDigestEmails: true,
    messageEmails: false,
    weeklyRecapEmails: false,
  },
  communities: demoCommunities,
  joinedCommunityIds: ["open-studio", "margin-notes"],
  connectedPersonIds: ["jordan-lee", "maya-chen"],
  receivedRequestIds: ["samira-patel"],
  sentRequestIds: ["noa-williams"],
  posts: [
    {
      id: "post-open-studio-prompt",
      communityId: "open-studio",
      authorId: "maya-chen",
      prompt: "A little creative prompt for the week",
      message:
        "I’m trying to make more things before I feel ready. What’s a small project you’ve been meaning to start?",
      createdAt: "2 hours ago",
      likeCount: 12,
      likedByMe: false,
    },
    {
      id: "post-margin-notes-recommendation",
      communityId: "margin-notes",
      authorId: "noah-williams",
      message:
        "What’s a book you still find yourself recommending, even years after reading it?",
      createdAt: "Yesterday",
      likeCount: 8,
      likedByMe: false,
    },
    {
      id: "post-field-notes-walk",
      communityId: "field-notes",
      authorId: "camila-rocha",
      message:
        "Found a quiet path beside the river this weekend. What nearby place helps you reset?",
      createdAt: "Monday",
      likeCount: 6,
      likedByMe: false,
    },
  ],
  conversations: [
    {
      id: "conversation-jordan",
      personId: "jordan-lee",
      unreadCount: 1,
      messages: [
        {
          id: "message-jordan-1",
          senderId: "jordan-lee",
          text: "The basil finally made it through the heatwave!",
          createdAt: "Yesterday",
        },
        {
          id: "message-jordan-2",
          senderId: "alex",
          text: "That deserves a tiny balcony celebration.",
          createdAt: "Yesterday",
        },
        {
          id: "message-jordan-3",
          senderId: "jordan-lee",
          text: "Absolutely. I’ll share a photo in Tiny Gardeners.",
          createdAt: "9:42 AM",
        },
      ],
    },
    {
      id: "conversation-maya",
      personId: "maya-chen",
      unreadCount: 0,
      messages: [
        {
          id: "message-maya-1",
          senderId: "alex",
          text: "How is the new print coming along?",
          createdAt: "Tuesday",
        },
        {
          id: "message-maya-2",
          senderId: "maya-chen",
          text: "Slowly, but I’m learning to enjoy the in-between.",
          createdAt: "Tuesday",
        },
      ],
    },
  ],
  notifications: [
    {
      id: "notification-request-samira",
      type: "connection",
      actorId: "samira-patel",
      title: "Samira would like to connect",
      description: "You both enjoy independent art and making things.",
      createdAt: "12 minutes ago",
      href: "/connections",
      isRead: false,
    },
    {
      id: "notification-message-jordan",
      type: "message",
      actorId: "jordan-lee",
      title: "Jordan sent you a message",
      description: "“I’ll share a photo in Tiny Gardeners.”",
      createdAt: "1 hour ago",
      href: "/messages?person=jordan-lee",
      isRead: false,
    },
    {
      id: "notification-post-open-studio",
      type: "community",
      actorId: "maya-chen",
      title: "A new conversation in The Open Studio",
      description: "Maya shared this week’s creative prompt.",
      createdAt: "2 hours ago",
      href: "/communities/open-studio",
      isRead: true,
    },
    {
      id: "notification-welcome",
      type: "platform",
      title: "Welcome to your ConnectHub space",
      description: "Explore a community or meet someone new today.",
      createdAt: "Yesterday",
      href: "/explore",
      isRead: true,
    },
  ],
  nextMessageId: 1,
  nextPostId: 1,
}
