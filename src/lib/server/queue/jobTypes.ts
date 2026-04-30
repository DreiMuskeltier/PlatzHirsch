export const JobTypes = {
  ORT_UPDATED: "ORT_UPDATED",
  NEW_COMMENT: "NEW_COMMENT"
} as const;

export type JobType = (typeof JobTypes)[keyof typeof JobTypes];

// 🔥 NEU: Payload-Typen
export type JobPayloadMap = {
  ORT_UPDATED: { ortId: string };
  NEW_COMMENT: { kommentarId: string; ortId: string };
};