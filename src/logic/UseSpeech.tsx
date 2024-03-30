import React from 'react'

let recognition: any = null
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition()
  recognition.continuous = true
  recognition.lang = "en-US"
}

export default function useSpeech() {
  const [text, setText] = React.useState("")
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    if (!recognition) return

    recognition.onresult = (e: SpeechRecognitionEvent) => {
      console.log(e)
      recognition.stop()
      setActive(false)
      setText(e.results[0][0].transcript)
    }
  }, [])

  const startListening = () => {
    setText("")
    setActive(true)
    recognition.start()
  }

  const stopListening = () => {
    setActive(false)
    recognition.stop()
  }
  return {
    text,
    active,
    startListening,
    stopListening,
    hasRecognitionSupport: !!recognition,
  }
}