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


  const getCardTitle = (title: string) => {
    if(episode.title.includes('#') && episode.title.includes('Extra')) {
      return 'EXTRA - ' + episode.title.split('#')[1].split(' ')[0]
    } else if(episode.title.includes('#') && episode.title.includes('Flow Quarentena Edition')) {
      return 'Quarentena Edition - #' + episode.title.split('#')[1].split(' ')[0]
    } else if(episode.title.includes('#')) {
      return '#' + episode.title.split('#')[1].split(' ')[0]
    } else {
      return episode.title
    }
  }

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
        <p className={styles.episodenum}>{getCardTitle(episode.title)}</p>
        <p className={styles.description}>{episode.description}</p>
      </div>
    </div>
  )
}
  
export default Cards