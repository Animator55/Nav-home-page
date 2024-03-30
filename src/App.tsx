import React from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import PopUp from './components/PopUp';
import getName from './logic/getNameFromURL';
import Dictaphone from './components/Dictaphone';

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
    url: "https://www.amazon.com",
    background: "",
  },
  {
    url: "https://www.twitch.tv",
    background: "",
  },
  {
    url: "https://discord.com",
    background: "#5865F2",
  },
  {
    url: "https://weather.com",
    background: "",
  },
]

export default function App() {
  const [urls, setUrls] = React.useState<links[]>(urlsDef)
  const [popUp, setPopUp] = React.useState(false)

  const SearchInput = ()=>{
    return <div className='input-zone'>
      <form action="http://google.com/search">
        <input id='search-input' name='q' placeholder='Search something or URL'/>
        <input type="hidden" name="sitesearch"/>
      </form>
      <Dictaphone sendText={(text: string)=>{
        let input = document.getElementById("search-input") as HTMLInputElement
        input.value = text
      }}/>
    </div>
  }

  const Recommended = ()=>{
    const clickRec = (e: React.MouseEvent, url: string)=>{
      let div = e.target as HTMLDivElement
      if(div.className === "rec-button") window.location.replace(url)
    }

    const openSpan = (e: React.MouseEvent<HTMLDivElement>)=>{
      let div = e.currentTarget as HTMLDivElement
      let span = div.lastChild as HTMLSpanElement
      span?.classList.toggle("expanded")
    }

    return <div>
      {urls.map((obj, i)=>{
        let filteredName = getName(obj.url)

        return <div 
          className='rec-button' 
          key={"rec-" + i} 
          onClick={(e)=>{clickRec(e, obj.url)}} 
          style={{backgroundColor: obj.background}}
        >
          {filteredName}
          <div onClick={openSpan}>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
            <span className='rec-span'>
              <button onClick={()=>{console.log("edit " + filteredName)}}>Edit</button>
              <button onClick={()=>{console.log("remove " + filteredName)}}>Remove</button>
            </span>
          </div>
        </div>
      })}
      <button onClick={()=>{setPopUp(true)}}><FontAwesomeIcon icon={faPlus}/></button>
    </div>
  }

  // functions

  const addUrl = (url:string, background:string) =>{
    setUrls([...urls, {url: url, background: background}])
    setPopUp(false)
  }

  return <section>
    {popUp && <PopUp confirm={addUrl}/>}
    <SearchInput/>
    <Recommended/>
  </section>
}
