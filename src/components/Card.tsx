import styles from '../styles/Card.module.css'

type Props = {
  episode: {
    artwork: string
    title: string
    description: string
  }
  playHandle: Function
  pauseHandle: Function
  selected: boolean
}
  
const Cards = ({ episode, playHandle, pauseHandle, selected }: Props) => {

  return (
    <div className={styles.card}>
      {episode.artwork ? (
        <img className={styles.artwork} src={episode.artwork} alt="Foto do convidado"/>
      ): (
        <img className={styles.artwork} src="https://artworks-flow.s3-sa-east-1.amazonaws.com/AgregadoresPadrao.jpg" alt="Logo do Flow"/>
      )}
      {selected ? (
        <img 
          className={styles.playerbutton}
          onClick={() => pauseHandle()}
          src="/pause-button.svg" alt=""
        />
      ) : (
        <img 
          className={styles.playerbutton} 
          onClick={() => playHandle(episode)}
          src="/player-button.svg" alt=""
        />
      )}
      <div className={styles.footer}>
        {episode.title.includes('#') ? (
          <p className={styles.episodenum}>#{episode.title.split("#")[1]}</p>
        ) : (
          <p className={styles.episodenum}>{episode.title}</p>
        )}
        <p className={styles.description}>{episode.description}</p>
      </div>
    </div>
  )
}
  
export default Cards