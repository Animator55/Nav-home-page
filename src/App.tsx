import React from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faGlobe, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import PopUp from './components/PopUp';
import getName from './logic/getNameFromURL';
import Dictaphone from './components/Dictaphone';
import checkIfIsURL from './logic/checkIfIsURL';
import contrastColor from './logic/contrastColor';

type links = {
  url: string
  background: string
}

const urlsDef: links[] = [
  {
    url: "https://www.youtube.com",
    background: "#FF0000",
  },
  {
    url: "https://www.twitch.tv",
    background: "#6441a5",
  },
  {
    url: "https://discord.com",
    background: "#5865F2",
  },
  {
    url: "https://www.amazon.com",
    background: "#febd69",
  },
  {
    url: "https://weather.com",
    background: "#005986",
  },
]

export default function App() {
  const [urls, setUrls] = React.useState<links[]>(urlsDef)
  const [popUp, setPopUp] = React.useState(false)
  const [lang, setLang] = React.useState("en-US")

  const submit = (e: React.FormEvent)=>{
    e.preventDefault()
    let input = document.getElementById("search-input") as HTMLInputElement
    if(!input.value || input.value === "") return
    if(checkIfIsURL(input.value)) {
      window.location.href = "https://"+ input.value
    }
    else {
      const encodedSearchTerm = encodeURIComponent(input.value);
      window.location.href = `https://www.google.com/search?q=${encodedSearchTerm}`;
    }
  }

  const SearchInput = ()=>{
    return <div className='input-zone'>
      <div className='input'>
        <form onSubmit={submit}>
          <div>
            <button className="search-button" style={{pointerEvents: "none"}}><FontAwesomeIcon icon={faMagnifyingGlass}/></button>
            <input id='search-input' name='q' placeholder='Search'/>
            <button className='lang-button' data-lang={lang.split("-")[1]} onClick={()=>{
              setLang(lang === "en-US" ? "es-ES" : "en-US") 
            }}><FontAwesomeIcon icon={faGlobe}/></button>
            <Dictaphone sendText={(text: string)=>{
              let input = document.getElementById("search-input") as HTMLInputElement
              input.value = text
            }} lang={lang}/>
          </div>
        </form>
      </div>
    </div>
  }

  const Recommended = ()=>{
    const display = [
      1,2,1,1,2,1,2
    ]

    const clickRec = (e: React.MouseEvent, url: string)=>{
      let div = e.target as HTMLDivElement
      if(div.className === "rec-button") window.location.href = url
    }

    const openSpan = (e: React.MouseEvent<HTMLButtonElement>)=>{
      let div = e.currentTarget as HTMLButtonElement
      let span = div.nextSibling as HTMLSpanElement
      span?.classList.toggle("expanded")
    }

    let isButton = true
    const AddButton = (index: number)=>{
      isButton = false
      return <div 
        className='rec-button add-rec'
        key={Math.random()} 
        onClick={()=>{setPopUp(true)}} 
        style={{
          height: (display[index])*8+"rem",
        }}
      >
        <FontAwesomeIcon icon={faPlus}/>
      </div>
    }
    const Placeholder = (index: number)=>{
      return <div 
        className='rec-button' 
        key={Math.random()} 
        data-height={`${display[index]}`}
        style={{
          height: (display[index])*8+"rem",
        }}
      >
      </div>
    }

    let jsx: JSX.Element[][] = [
      [], []
    ] 

    let loopIterations = Math.floor(urls.length/7) + 1
    
    for(let j=0; j<loopIterations;j++) {
      for(let i=display.length*j; i < display.length*j+display.length; i++) {
        let obj = urls[i]
        let filteredName: string | undefined = undefined
        if(obj) filteredName = getName(obj.url)

  
        jsx[i-display.length*j < 4 ? 0 : 1].push(obj ? <div 
          className='rec-button' 
          key={Math.random()} 
          onClick={(e)=>{clickRec(e, obj.url)}} 
          data-height={`${display[i-display.length*j]}`}
          style={{
            backgroundColor: obj.background,
            color: contrastColor(obj.background),
            height: (display[i-display.length*j])*8+"rem",
          }}
        >
          <h1>{filteredName}</h1>
          <div className='span-container'>
            <button className='button-open' style={{color: contrastColor(obj.background)}} onClick={openSpan}>
              <FontAwesomeIcon icon={faEllipsisVertical}/>
            </button>
            <span className='rec-span'>
              {/* <button onClick={()=>{console.log("edit " + filteredName)}}>Edit</button> */}
              <button onClick={()=>{removeURL(i)}}>Remove</button>
            </span>
          </div>
        </div>: isButton ? AddButton(i-display.length*j) : Placeholder(i-display.length*j)
        )
      }
    }

    if(isButton) jsx[0].push(AddButton(jsx.length))

    return <div className='recomendation-section'>
      <section>        
        <div>
          {jsx[0]}
        </div>
        <div>
          {jsx[1]}
        </div>
      </section>
    </div>
  }

  // functions

  const addUrl = (url:string, background:string) =>{
    console.log(url, background)
    setUrls([...urls, {url: url, background: background}])
    setPopUp(false)
  }
  const removeURL = (index: number) =>{
    setUrls(urls.filter((el, i)=>{if(i !== index) return el}))
  }

  return <section className='main'>
    {popUp && <PopUp close={()=>{setPopUp(false)}} confirm={addUrl}/>}
    <SearchInput/>
    <Recommended/>
  </section>
}
