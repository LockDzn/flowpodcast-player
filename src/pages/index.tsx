import { FormEvent, ReactEventHandler, useEffect, useState } from 'react'
import axios from 'axios'

import styles from '../styles/Home.module.css'

import Card from '../components/Card'
import Player from '../components/Player'
import Layout from '../components/Layout'
import Loading from '../components/Loading'

type EpisodeProps = {
  id: string
  artwork: string
  created_at: string
  description: string 
  duration: string
  mp3: string
  title: string
}

type SelectedEpisodeProps = {
  id: string
  artwork: string
  created_at: string
  description: string 
  duration: string
  mp3: string
  title: string
  paused: boolean
}

export default function Home() {

  const [episodes, setEpisodes] = useState<EpisodeProps[]>([])
  const [nextEpisodes, setNextEpisodes] = useState<string>()

  const [selectedEpisode, setSelectedEpisode] = useState<SelectedEpisodeProps>()
  const [podcastAudio, setPodcastAudio] = useState<HTMLAudioElement>()

  const [searchingEpisode, setSearchingEpisode] = useState<boolean>(false)
  const [search, setSearch] = useState<string>('')

  useEffect(() => {
    loadEpisodes()
  }, [])
    
  const playAudio = (episode: EpisodeProps) => {

    if (episode.id == selectedEpisode?.id) {
      podcastAudio?.play()

      setSelectedEpisode({
        id: episode.id,
        artwork: episode.artwork,
        created_at: episode.created_at,
        description: episode.description ,
        duration: episode.duration,
        mp3: episode.mp3,
        title: episode.title,
        paused: false
      })
    } else {
      podcastAudio?.pause()

      const audio = new Audio(episode.mp3)

      setPodcastAudio(audio)
      setSelectedEpisode({
        id: episode.id,
        artwork: episode.artwork,
        created_at: episode.created_at,
        description: episode.description ,
        duration: episode.duration,
        mp3: episode.mp3,
        title: episode.title,
        paused: false
      })

      audio.play()

      if ('mediaSession' in navigator) {
        // @ts-ignore
        navigator.mediaSession.metadata = new MediaMetadata({
          title: episode.title,
          artist: 'Flow Podcast',
          album: 'Flow Podcast',
          artwork: [{ 
            src: episode.artwork ? 
              episode.artwork : 'https://artworks-flow.s3-sa-east-1.amazonaws.com/AgregadoresPadrao.jpg',
              sizes: '750x750', 
              type: 'image/jpeg'
            }]
        });
  
        // @ts-ignore
        navigator.mediaSession.setActionHandler('seekbackward', () => {
          audio.currentTime = audio.currentTime - 5
          console.log(audio.currentTime)
        });
        // @ts-ignore
        navigator.mediaSession.setActionHandler('seekforward', () => {
          audio.currentTime = audio.currentTime + 10
          console.log(audio.currentTime)
        });
      }

    }
  }

  const pauseAudio = () => {
    const audio = podcastAudio
    if(audio) {

      audio.pause()

      if(selectedEpisode) {
        setSelectedEpisode({
          id: selectedEpisode.id,
          artwork: selectedEpisode.artwork,
          created_at: selectedEpisode.created_at,
          description: selectedEpisode.description ,
          duration: selectedEpisode.duration,
          mp3: selectedEpisode.mp3,
          title: selectedEpisode.title,
          paused: true
        })
      }
    }
  }

  const loadEpisodes = async () => {
    const episodesList = await axios.post('https://flow3r-api-master-2eqj3fl3la-ue.a.run.app/v2/episodes/list', 
      {
        params: {
          filter: "episodes"
        }
      })

    setEpisodes(episodesList.data.episodes)
    setNextEpisodes(episodesList.data.paging.next)
  }

  const loadMoreEpisodes = async () => {
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

    episodesList.data.episodes.map((ep: EpisodeProps) => {
      setEpisodes((old): EpisodeProps[] => [...old, ep])
    })

    setNextEpisodes(episodesList.data.paging.next)
  }

  const loadFilteredEpisodes = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(search == '') return loadEpisodes()

    setSearchingEpisode(true)
    const episodesList = await axios.get(`https://flowpodcast-player-git-feature.lockdzn.vercel.app/api/episodes?search=${search}`)
      .then((response) => {
        setEpisodes(response.data)
        setSearchingEpisode(false)
      }).catch((err) => {
        alert(err.response.data.message)
        setSearchingEpisode(false)
      })
  }

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }
  
  if(episodes.length == 0) {
    return (
      <Loading />
    )
  }

  return (
    <div className={styles.container}>
      <Layout
        title={selectedEpisode && !selectedEpisode.paused ? selectedEpisode.title : 'Flow Podcast - Player'} 
      />

      <a href="https://flowpodcast.com.br/" target="_blank">
        <img className={styles.logo} src="/logo.png" alt="Logo do Flow Podcast"/>
      </a>

      <p className={styles.information}>
        <a href="https://github.com/LockDzn/flowpodcast-player" target="_blank">Github Repo</a>
        <span>|</span>
        <a href="https://twitter.com/nuloki_" target="_blank">Feito por: Ryan Souza</a>
      </p>

      <img className={styles.pwdvercel} height="40" src="/powered-by-vercel.svg" alt="Powered by Vercel"/>

      <form className={styles.formsearch} onSubmit={loadFilteredEpisodes}>
        <input 
          className={styles.inputsearch}
          type="text"
          onChange={handleChangeSearch}
          value={search}
          placeholder="Procurar por episodes"
        />
        <button className={styles.buttonsearch}>
          <img src="/loupe.svg" alt="Lupa"/>
        </button>
      </form>

      <div className={styles.cards}>
        {episodes && !searchingEpisode ? 
          episodes.map((episode: EpisodeProps) => (
            <Card 
              episode={episode} 
              key={episode.id}
              playHandle={() => playAudio(episode)}
              pauseHandle={() => pauseAudio()}
              selected={selectedEpisode?.id == episode.id && !selectedEpisode.paused ? true : false}
            />
        )) :
        (
          <Loading />
        )
        }

      </div>

      {episodes.length >= 8 && !searchingEpisode ? (
        <button onClick={() => loadMoreEpisodes()} className={styles.loadmore}>
          Carregar mais
        </button>
      ): (
        ''
      )}

      {selectedEpisode && podcastAudio ? (
        <Player 
          episode={selectedEpisode} 
          audio={podcastAudio}
          playHandle={playAudio} 
          pauseHandle={pauseAudio} 
        />
      ) : (
        <div></div>
      )}
    </div>
  )
}
