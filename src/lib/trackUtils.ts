import { TrackType } from '@/types';

export const getCompatibleCamelotKeys = (camelotKey: string) => {
  const number = parseInt(camelotKey.slice(0, -1)); // number part
  const letter = camelotKey.slice(-1); // 'A' or 'B'

  const lowerNum = number === 1 ? 12 : number - 1;
  const higherNum = number === 12 ? 1 : number + 1;

  return {
    lower: [`${lowerNum}${letter}`],
    same: [`${number}A`, `${number}B`],
    higher: [`${higherNum}${letter}`],
  };
};

export const getCompatibleTracks = (
  tracks: TrackType[],
  targetKeys: string[],
  referenceBpm: number
) => {
  return tracks
    .filter((track) => {
      if (!targetKeys.includes(track.camelotKey)) return false;

      // Check if BPM is within ±10 of reference BPM
      const directMatch = Math.abs(track.tempoBpm - referenceBpm) <= 10;

      // Check if BPM is within ±10 of half the reference BPM (harmonic mixing)
      const halfMatch = Math.abs(track.tempoBpm - referenceBpm / 2) <= 10;

      // Check if BPM is within ±10 of double the reference BPM (harmonic mixing)
      const doubleMatch = Math.abs(track.tempoBpm - referenceBpm * 2) <= 10;

      return directMatch || halfMatch || doubleMatch;
    })
    .sort((a, b) => a.tempoBpm - b.tempoBpm);
};
