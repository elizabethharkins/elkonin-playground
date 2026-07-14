// interfaces for cognitive modeling

export interface PhonemeToken {
  id: string;
  sound: string; // e.g., "ch", "a", "t"
  isPlaced: boolean; // tracks if the token has been dragged into a box
  assignedBoxIndex?: number; // tracks exactly which box it landed in
}
