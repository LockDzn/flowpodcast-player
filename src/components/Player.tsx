import { useEffect, useState } from 'react'

import styles from '../styles/Player.module.css'

type Props = {
    episode: {
        id: string,
        artwork: string,
        created_at: string
        description: string 
        duration: string
        mp3: string
        title: string
        paused: boolean
    }
    audio: HTMLAudioElement
    pauseHandle: Function
    playHandle: Function
}

const Player = ({ episode, audio, playHandle, pauseHandle }: Props) => {

    const [audioPercentage, setAudioPercentage] = useState<number>(0)
    const [audioVolume, setAudioVolume] = useState<number>(10)

    audio.ontimeupdate = () => {
        const currentPercentage = (audio.currentTime / audio.duration) * 100

        setAudioPercentage(currentPercentage)
    }

    audio.onended = () => {
        pauseHandle()
    }

    audio.onplay = () => {
        audio.volume = audioVolume >= 10 ? 1 : Number(`0.${audioVolume}`)
    }

    // audio.onpause = () => {
    //     pauseHandle()
    // }

    const handleChangeAudioPercentage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAudioPercentage(Number(e.target.value))
        setAudioPercentage(Number(e.target.value))
        setAudioPercentage(Number(e.target.value))
        setAudioPercentage(Number(e.target.value))
        audio.currentTime = audio.duration / 100 * audioPercentage
    }

    const handleChangeAudioVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(Number(e.target.value))
        setAudioVolume(Number(e.target.value))
        if(Number(e.target.value) >= 10){
            audio.volume = 1
        }else {
            audio.volume = Number(`0.${e.target.value}`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.information}>
                <img className={styles.artwork} src={episode.artwork} alt=""/>
                <h1>{episode.title.split("-")[0]}</h1>
            </div>

            <div className={styles.playercontrols}>
                {episode.paused ? (
                    <img 
                        className={styles.playerbutton}
                        onClick={() => 
                            playHandle(episode)
                        }
                        src="/player-button.svg" alt="Botão de play"
                    />
                    
                ) : (
                    <img 
                        className={styles.playerbutton}
                        onClick={() => 
                            pauseHandle()
                        }
                        src="/pause-button.svg" alt="Botão de pause"
                    />
                )}

                <div className={styles.bar}>
                    <input 
                        type="range"
                        min="0" 
                        max="100"
                        onChange={handleChangeAudioPercentage}
                        value={audioPercentage}
                    />
                </div>
            </div>

            <div className={styles.audiocontrols}>
                <img src="/audio.svg" alt="Botão de audio"/>
                <input
                    className={styles.volumebar} 
                    type="range"
                    min="0" 
                    max="10"
                    onChange={handleChangeAudioVolume}
                    value={audioVolume}
                />
            </div>
        </div>
    )
}

export default Player