import personalYearData from "@/content/data/meanings_personalyear.json";
import pinnacleChallengeData from "@/content/data/meanings_pinnacle_challenge.json";
import type {
  PersonalYearMeaning,
  PinnacleMeaning,
  ChallengeMeaning,
} from "./core";

export const personalYearMeanings =
  personalYearData as unknown as Record<string, PersonalYearMeaning>;

export const pinnacleMeanings = (
  pinnacleChallengeData as { pinnacles: Record<string, PinnacleMeaning> }
).pinnacles;
export const challengeMeanings = (
  pinnacleChallengeData as { challenges: Record<string, ChallengeMeaning> }
).challenges;
