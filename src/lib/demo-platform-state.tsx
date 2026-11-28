"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from "react"
import {
  initialDemoPlatformState,
  type DemoPlatformState,
  type DemoPreferences,
  type DemoProfile,
} from "./demo-platform"

type PlatformAction =
  | { type: "connection/request"; personId: string }
  | { type: "connection/accept"; personId: string }
  | { type: "connection/decline"; personId: string }
  | { type: "connection/cancel"; personId: string }
  | { type: "connection/remove"; personId: string }
  | { type: "community/join"; communityId: string }
  | { type: "community/leave"; communityId: string }
  | {
      type: "post/create"
      communityId: string
      message: string
      createdAt: string
    }
  | { type: "post/like"; postId: string }
  | { type: "social/like"; postId: string }
  | { type: "social/save"; postId: string }
  | { type: "social/comment"; postId: string }
  | {
      type: "social/create"
      message: string
      createdAt: string
      imageUrls: string[]
    }
  | {
      type: "message/send"
      conversationId: string
      text: string
      createdAt: string
    }
  | { type: "message/read"; conversationId: string }
  | { type: "notification/read"; notificationId: string }
  | { type: "notification/read-all" }
  | { type: "notification/dismiss"; notificationId: string }
  | { type: "profile/update"; profile: Partial<DemoProfile> }
  | { type: "preferences/update"; preferences: Partial<DemoPreferences> }

function platformReducer(
  state: DemoPlatformState,
  action: PlatformAction,
): DemoPlatformState {
  switch (action.type) {
    case "connection/request":
      if (
        state.connectedPersonIds.includes(action.personId) ||
        state.sentRequestIds.includes(action.personId) ||
        state.receivedRequestIds.includes(action.personId)
      ) {
        return state
      }
      return {
        ...state,
        sentRequestIds: [...state.sentRequestIds, action.personId],
      }
    case "connection/accept":
      if (!state.receivedRequestIds.includes(action.personId)) return state
      return {
        ...state,
        receivedRequestIds: state.receivedRequestIds.filter(
          (id) => id !== action.personId,
        ),
        connectedPersonIds: state.connectedPersonIds.includes(action.personId)
          ? state.connectedPersonIds
          : [...state.connectedPersonIds, action.personId],
        notifications: state.notifications.map((notification) =>
          notification.actorId === action.personId &&
          notification.type === "connection"
            ? { ...notification, isRead: true }
            : notification,
        ),
      }
    case "connection/decline":
      return {
        ...state,
        receivedRequestIds: state.receivedRequestIds.filter(
          (id) => id !== action.personId,
        ),
        notifications: state.notifications.map((notification) =>
          notification.actorId === action.personId &&
          notification.type === "connection"
            ? { ...notification, isRead: true }
            : notification,
        ),
      }
    case "connection/cancel":
      return {
        ...state,
        sentRequestIds: state.sentRequestIds.filter(
          (id) => id !== action.personId,
        ),
      }
    case "connection/remove":
      return {
        ...state,
        connectedPersonIds: state.connectedPersonIds.filter(
          (id) => id !== action.personId,
        ),
      }
    case "community/join":
      if (state.joinedCommunityIds.includes(action.communityId)) return state
      return {
        ...state,
        joinedCommunityIds: [...state.joinedCommunityIds, action.communityId],
        communities: state.communities.map((community) =>
          community.id === action.communityId
            ? { ...community, memberCount: community.memberCount + 1 }
            : community,
        ),
      }
    case "community/leave":
      if (!state.joinedCommunityIds.includes(action.communityId)) return state
      return {
        ...state,
        joinedCommunityIds: state.joinedCommunityIds.filter(
          (id) => id !== action.communityId,
        ),
        communities: state.communities.map((community) =>
          community.id === action.communityId
            ? {
                ...community,
                memberCount: Math.max(0, community.memberCount - 1),
              }
            : community,
        ),
      }
    case "post/create": {
      const message = action.message.trim()
      if (!message || !state.joinedCommunityIds.includes(action.communityId)) {
        return state
      }
      return {
        ...state,
        nextPostId: state.nextPostId + 1,
        posts: [
          {
            id: `demo-post-${state.nextPostId}`,
            communityId: action.communityId,
            authorId: "alex",
            message,
            createdAt: action.createdAt,
            likeCount: 0,
            likedByMe: false,
          },
          ...state.posts,
        ],
      }
    }
    case "post/like":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.postId
            ? {
                ...post,
                likedByMe: !post.likedByMe,
                likeCount: Math.max(
                  0,
                  post.likeCount + (post.likedByMe ? -1 : 1),
                ),
              }
            : post,
        ),
      }
    case "social/like":
      return {
        ...state,
        socialPosts: state.socialPosts.map((post) =>
          post.id === action.postId
            ? {
                ...post,
                likedByMe: !post.likedByMe,
                likeCount: Math.max(
                  0,
                  post.likeCount + (post.likedByMe ? -1 : 1),
                ),
              }
            : post,
        ),
      }
    case "social/save":
      return {
        ...state,
        socialPosts: state.socialPosts.map((post) =>
          post.id === action.postId
            ? { ...post, savedByMe: !post.savedByMe }
            : post,
        ),
      }
    case "social/comment":
      return {
        ...state,
        socialPosts: state.socialPosts.map((post) =>
          post.id === action.postId
            ? { ...post, commentCount: post.commentCount + 1 }
            : post,
        ),
      }
    case "social/create": {
      const message = action.message.trim()
      if (!message && action.imageUrls.length === 0) return state
      return {
        ...state,
        socialPosts: [
          {
            id: `social-post-${state.nextPostId}`,
            authorId: "alex",
            message,
            createdAt: action.createdAt,
            kind:
              action.imageUrls.length > 1
                ? "multi"
                : action.imageUrls.length === 1
                  ? "photo"
                  : "text",
            imageUrls: action.imageUrls,
            likeCount: 0,
            likedByMe: false,
            savedByMe: false,
            commentCount: 0,
            location: "Shared locally",
          },
          ...state.socialPosts,
        ],
        nextPostId: state.nextPostId + 1,
      }
    }
    case "message/send": {
      const text = action.text.trim()
      if (!text) return state
      return {
        ...state,
        nextMessageId: state.nextMessageId + 1,
        conversations: state.conversations.map((conversation) =>
          conversation.id === action.conversationId
            ? {
                ...conversation,
                unreadCount: 0,
                messages: [
                  ...conversation.messages,
                  {
                    id: `demo-message-${state.nextMessageId}`,
                    senderId: "alex",
                    text,
                    createdAt: action.createdAt,
                  },
                ],
              }
            : conversation,
        ),
      }
    }
    case "message/read":
      return {
        ...state,
        conversations: state.conversations.map((conversation) =>
          conversation.id === action.conversationId
            ? { ...conversation, unreadCount: 0 }
            : conversation,
        ),
        notifications: state.notifications.map((notification) =>
          notification.type === "message" &&
          notification.actorId ===
            state.conversations.find(
              (conversation) => conversation.id === action.conversationId,
            )?.personId
            ? { ...notification, isRead: true }
            : notification,
        ),
      }
    case "notification/read":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.notificationId
            ? { ...notification, isRead: true }
            : notification,
        ),
      }
    case "notification/read-all":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      }
    case "notification/dismiss":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.notificationId,
        ),
      }
    case "profile/update":
      return {
        ...state,
        profile: { ...state.profile, ...action.profile },
      }
    case "preferences/update":
      return {
        ...state,
        preferences: { ...state.preferences, ...action.preferences },
      }
  }
}

type DemoPlatformActions = {
  requestConnection: (personId: string) => void
  acceptConnection: (personId: string) => void
  declineConnection: (personId: string) => void
  cancelConnectionRequest: (personId: string) => void
  removeConnection: (personId: string) => void
  joinCommunity: (communityId: string) => void
  leaveCommunity: (communityId: string) => void
  createPost: (communityId: string, message: string) => void
  togglePostLike: (postId: string) => void
  toggleSocialPostLike: (postId: string) => void
  toggleSocialPostSave: (postId: string) => void
  addSocialPostComment: (postId: string) => void
  createSocialPost: (message: string, imageUrls: string[]) => void
  sendMessage: (conversationId: string, text: string) => void
  markConversationRead: (conversationId: string) => void
  markNotificationRead: (notificationId: string) => void
  markAllNotificationsRead: () => void
  dismissNotification: (notificationId: string) => void
  updateProfile: (profile: Partial<DemoProfile>) => void
  updatePreferences: (preferences: Partial<DemoPreferences>) => void
}

type DemoPlatformContextValue = {
  state: DemoPlatformState
  actions: DemoPlatformActions
}

const DemoPlatformContext = createContext<DemoPlatformContextValue | null>(null)

function currentTimeLabel() {
  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date())
}

export function DemoPlatformProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    platformReducer,
    initialDemoPlatformState,
  )

  const requestConnection = useCallback(
    (personId: string) => dispatch({ type: "connection/request", personId }),
    [],
  )
  const acceptConnection = useCallback(
    (personId: string) => dispatch({ type: "connection/accept", personId }),
    [],
  )
  const declineConnection = useCallback(
    (personId: string) => dispatch({ type: "connection/decline", personId }),
    [],
  )
  const cancelConnectionRequest = useCallback(
    (personId: string) => dispatch({ type: "connection/cancel", personId }),
    [],
  )
  const removeConnection = useCallback(
    (personId: string) => dispatch({ type: "connection/remove", personId }),
    [],
  )
  const joinCommunity = useCallback(
    (communityId: string) => dispatch({ type: "community/join", communityId }),
    [],
  )
  const leaveCommunity = useCallback(
    (communityId: string) => dispatch({ type: "community/leave", communityId }),
    [],
  )
  const createPost = useCallback(
    (communityId: string, message: string) =>
      dispatch({
        type: "post/create",
        communityId,
        message,
        createdAt: currentTimeLabel(),
      }),
    [],
  )
  const togglePostLike = useCallback(
    (postId: string) => dispatch({ type: "post/like", postId }),
    [],
  )
  const toggleSocialPostLike = useCallback(
    (postId: string) => dispatch({ type: "social/like", postId }),
    [],
  )
  const toggleSocialPostSave = useCallback(
    (postId: string) => dispatch({ type: "social/save", postId }),
    [],
  )
  const addSocialPostComment = useCallback(
    (postId: string) => dispatch({ type: "social/comment", postId }),
    [],
  )
  const createSocialPost = useCallback(
    (message: string, imageUrls: string[]) =>
      dispatch({
        type: "social/create",
        message,
        createdAt: currentTimeLabel(),
        imageUrls,
      }),
    [],
  )
  const sendMessage = useCallback(
    (conversationId: string, text: string) =>
      dispatch({
        type: "message/send",
        conversationId,
        text,
        createdAt: currentTimeLabel(),
      }),
    [],
  )
  const markConversationRead = useCallback(
    (conversationId: string) =>
      dispatch({ type: "message/read", conversationId }),
    [],
  )
  const markNotificationRead = useCallback(
    (notificationId: string) =>
      dispatch({ type: "notification/read", notificationId }),
    [],
  )
  const markAllNotificationsRead = useCallback(
    () => dispatch({ type: "notification/read-all" }),
    [],
  )
  const dismissNotification = useCallback(
    (notificationId: string) =>
      dispatch({ type: "notification/dismiss", notificationId }),
    [],
  )
  const updateProfile = useCallback(
    (profile: Partial<DemoProfile>) =>
      dispatch({ type: "profile/update", profile }),
    [],
  )
  const updatePreferences = useCallback(
    (preferences: Partial<DemoPreferences>) =>
      dispatch({ type: "preferences/update", preferences }),
    [],
  )

  const actions = useMemo(
    () => ({
      requestConnection,
      acceptConnection,
      declineConnection,
      cancelConnectionRequest,
      removeConnection,
      joinCommunity,
      leaveCommunity,
      createPost,
      togglePostLike,
      toggleSocialPostLike,
      toggleSocialPostSave,
      addSocialPostComment,
      createSocialPost,
      sendMessage,
      markConversationRead,
      markNotificationRead,
      markAllNotificationsRead,
      dismissNotification,
      updateProfile,
      updatePreferences,
    }),
    [
      requestConnection,
      acceptConnection,
      declineConnection,
      cancelConnectionRequest,
      removeConnection,
      joinCommunity,
      leaveCommunity,
      createPost,
      togglePostLike,
      toggleSocialPostLike,
      toggleSocialPostSave,
      addSocialPostComment,
      createSocialPost,
      sendMessage,
      markConversationRead,
      markNotificationRead,
      markAllNotificationsRead,
      dismissNotification,
      updateProfile,
      updatePreferences,
    ],
  )

  const value = useMemo(() => ({ state, actions }), [state, actions])

  return (
    <DemoPlatformContext.Provider value={value}>
      {children}
    </DemoPlatformContext.Provider>
  )
}

export function useDemoPlatform() {
  const context = useContext(DemoPlatformContext)
  if (!context) {
    throw new Error(
      "useDemoPlatform must be used within a DemoPlatformProvider",
    )
  }
  return context
}

export function getConnectionStatus(
  state: DemoPlatformState,
  personId: string,
) {
  if (state.connectedPersonIds.includes(personId)) return "connected" as const
  if (state.receivedRequestIds.includes(personId)) return "received" as const
  if (state.sentRequestIds.includes(personId)) return "sent" as const
  return "suggested" as const
}
