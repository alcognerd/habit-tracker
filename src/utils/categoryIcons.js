import { FaRegHeart, FaRegSmile, FaRegStar } from "react-icons/fa";
import { FaGlassWater } from "react-icons/fa6";
import { IoMusicalNotes, IoSunnySharp } from "react-icons/io5";
import { FiMoon } from "react-icons/fi";
import { MdOutlineWorkOutline } from "react-icons/md";
import { AiFillThunderbolt } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { GoGoal } from "react-icons/go";
import { IoIosFitness } from "react-icons/io";

export const categoryIcons = {
  CREATE: IoMusicalNotes,
  FOCUS: AiFillThunderbolt,
  GOALS: GoGoal,
  HYDRATE: FaGlassWater,
  LEARN: IoBookOutline,
  MIND: FiMoon,
  MORNING: IoSunnySharp,
  OTHER: FaRegStar,
  SOCIAL: FaRegSmile,
  WORK: MdOutlineWorkOutline,
  HEALTH: FaRegHeart,
  FITNESS: IoIosFitness,
};

export const categoryColors = {
  CREATE: "violet", // IoMusicalNotes
  FOCUS: "red", // AiFillThunderbolt
  GOALS: "green", // GoGoal
  HYDRATE: "blue", // FaGlassWater
  LEARN: "purple", // IoBookOutline
  MIND: "indigo", // FiMoon
  MORNING: "yellow", // IoSunnySharp
  OTHER: "gray", // FaRegStar
  SOCIAL: "pink", // FaRegSmile
  WORK: "teal", // MdOutlineWorkOutline
  HEALTH: "orange",
  FITNESS: "green", // FaRegHeart
};
