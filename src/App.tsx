import React, { FormEvent } from 'react'
import './App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import PopUp from './components/PopUp';
import getName from './logic/getNameFromURL';

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
    const submit = (e: FormEvent)=>{
      e.preventDefault()

      console.log(e)
    }

    return <form className='input-zone' onSubmit={submit}>
      <input placeholder='Search something or URL'/>
    </form>
  }

  const Recommended = ()=>{
    const openSpan = (e: React.MouseEvent<HTMLButtonElement>)=>{
      let button = e.currentTarget as HTMLButtonElement
      let span = button.lastChild as HTMLSpanElement
      span?.classList.toggle("expanded")
    }


    return <div>
      {urls.map((obj, i)=>{
        let filteredName = getName(obj.url)

        return <button key={"rec-" + i} onClick={()=>{console.log(obj.url)}} style={{backgroundColor: obj.background}}>
          {filteredName}
          <button onClick={openSpan}>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
            <span className='rec-span'>
              <button onClick={()=>{console.log("edit " + filteredName)}}>Edit</button>
              <button onClick={()=>{console.log("remove " + filteredName)}}>Remove</button>
            </span>
          </button>
        </button>
      })}
      <button onClick={()=>{setPopUp(true)}}><FontAwesomeIcon icon={faPlus}/></button>
    </div>
  }

  // 
  const addUrl = (url:string, background:string) =>{
    setUrls([...urls, {url: url, background: background}])
    setPopUp(false)
  }

  return <section>
    {popUp && <PopUp confirm={addUrl}/>}
    <SearchInput/>
    <Recommended/>
    <a href="https://google.com">dfasfs</a>
  </section>
}
