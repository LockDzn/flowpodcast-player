/*
  Gambiarra pois a ate onde sei a API do flow não disponibiliza uma forma de pesquisar

  PORRA VEIGUIZ!
*/
import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type EpisodeProps = {
  id: string
  artwork: string
  created_at: string
  description: string 
  duration: string
  mp3: string
  title: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.statusCode = 200
  const { search } = req.query

  if(search) {

    let nextEpisodes = String(new Date())
    let episodes: EpisodeProps[] = []
    do {
      const episodesList = await axios.post('https://flow3r-api-master-2eqj3fl3la-ue.a.run.app/v2/episodes/list', 
        {
          params: {
            filter: "episodes",
            paging: {
              previous: null,
              next: nextEpisodes
            }
          }
        })

      episodes = episodes.concat(episodesList.data.episodes)
      nextEpisodes = episodesList.data.paging.next
    } while (nextEpisodes != "2018-10-02T06:14:05-03:00");

    const episodesFiltered = episodes.filter(ep => 
      String(ep.title)
        .toLocaleLowerCase()
        .includes(String(search)
        .toLocaleLowerCase()
      ) || 
      String(ep.description)
        .toLocaleLowerCase()
        .includes(String(search)
        .toLocaleLowerCase()
      )
    )

    if(episodesFiltered.length > 0) {
      res.json(episodesFiltered)
    }else {
      res.status(404).json({ error: true, message: 'Episode not found'})
    }

  } else {
    res.json({ error: true, message: 'Use the query \'search\'' })
  }

  
}
