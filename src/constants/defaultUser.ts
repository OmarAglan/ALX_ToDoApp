import { EmojiStyle } from "emoji-picker-react";
import type { User } from "../types/user";
import { systemInfo } from "../utils";

/**
 * Represents a default user object.
 */
export const defaultUser: User = {
  name: null,
  createdAt: new Date(),
  profilePicture: null,
  emojisStyle:
    systemInfo.os === "iOS" || systemInfo.os === "macOS" ? EmojiStyle.NATIVE : EmojiStyle.APPLE,
  tasks: [],
  theme: "system",
  darkmode: "auto",
  settings: {
    enableCategories: true,
    doneToBottom: false,
    enableGlow: true,
    simpleEmojiPicker: false,
    enableReadAloud: "speechSynthesis" in window,
    voice: "Google UK English Male",
    appBadge: false,
    voiceVolume: 0.6,
  },

  categories: [
    { 
      id: "857f0db6-43b2-43eb-8143-ec4e26472516", 
      name: "Life Goals", 
      emoji: "1f3af", 
      color: "#1fff44" 
    },
    { 
      id: "0292cba5-f6e2-41c4-b5a7-c59a0aaecfe3", 
      name: "Career Growth", 
      emoji: "1f4bc", 
      color: "#248eff" 
    },
    {
      id: "a47a4af1-d720-41eb-9121-d3728605a62b",
      name: "Self Growth",
      emoji: "1f331",
      color: "#e843fe",
    },
    {
      id: "393068a9-9db7-4dfa-a00f-cd359f8024e8",
      name: "Wellness Journey",
      emoji: "26f9",
      color: "#ffdf3d",
    },
    {
      id: "afa0fdb4-f668-4d5a-9ad0-4e22d2b8e841",
      name: "Learning Path",
      emoji: "1f4ca",
      color: "#ff8e24",
    },
  ],
  colorList: [
    "#FF69B4", "#FF1493", "#FF00FF", "#9400D3",
    "#4B0082", "#0000FF", "#00BFFF", "#00CED1",
    "#20B2AA", "#98FB98", "#32CD32", "#FFD700",
    "#FFA500", "#FF6347", "#DC143C", "#C71585",
    "#DB7093", "#FF00FF", "#DA70D6", "#DDA0DD",
    "#EE82EE", "#FF69B4", "#FFB6C1", "#FFC0CB",
    "#F08080", "#CD5C5C", "#DC143C", "#B22222",
    "#8B0000", "#800000", "#BC8F8F", "#F4A460"
  ],
};
