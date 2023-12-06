// Full API return type has not been declared, only properties used
type LastEpisode = {
  runtime: number
}

export type Details = {
  id: number
  title: string
  overview: string
  poster_path: string
  runtime: number
  episode_run_time: number[]
  number_of_episodes: number
  number_of_seasons: number
  name: string
  last_episode_to_air: LastEpisode
  totalShowRunTime: number
  finalRuntime: number
}

// "last_episode_to_air": {
//   "id": 62161,
//   "name": "Felina",
//   "overview": "All bad things must come to an end.",
//   "vote_average": 9.287,
//   "vote_count": 202,
//   "air_date": "2013-09-29",
//   "episode_number": 16,
//   "episode_type": "finale",
//   "production_code": "",
//   "runtime": 56,
//   "season_number": 5,
//   "show_id": 1396,
//   "still_path": "/pA0YwyhvdDXP3BEGL2grrIhq8aM.jpg"
// }
