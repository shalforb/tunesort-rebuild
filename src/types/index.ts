export type PlaylistType = {
  id: string | number;
  name: string;
  description: string;
};

export type TrackType = {
  id: string; // local DB id
  playlistId: string;
  spotifyTrackID: string;
  title: string;
  artist: string;
  albumArtworkUrl: string;
  key: string;
  camelotKey: string;
  tempoBpm: number;
  energy: number;
  liveness: number;
  danceability: number;
  happiness: number;
};

export type AppDataProps = {
  playlists: PlaylistType[];
  setPlaylists: React.Dispatch<React.SetStateAction<PlaylistType[]>>;
  tracks: TrackType[];
  setTracks: React.Dispatch<React.SetStateAction<TrackType[]>>;
};
