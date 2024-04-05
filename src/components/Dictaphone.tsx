import React from 'react'
import useSpeech from '../logic/UseSpeech'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

type Props = {sendText: Function, lang: string}

export default function Dictaphone({sendText, lang}: Props) {
  const {
    text, 
    startListening, 
    stopListening, 
    active,
    hasRecognitionSupport
  } = useSpeech(lang)

  React.useEffect(()=>{
    sendText(text)
  }, [text])

  return <div className='dictaphone'>
    {hasRecognitionSupport ? 
        !active ?
            <button onClick={startListening}>
                <FontAwesomeIcon icon={faMicrophone}/>
            </button>
            :
            <button className="recording" onClick={stopListening}>
                <FontAwesomeIcon icon={faMicrophone}/>
            </button>
    :
        <button>
            <FontAwesomeIcon icon={faMicrophoneSlash}/>
        </button>
    }
  </div>
}