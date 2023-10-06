import type { Descendant } from "slate";

export type GuideContent = Descendant;

export type GuideRequest = {
  title: string;
  content: GuideContent[];
  services: number[];
  attachment: File[];
};
