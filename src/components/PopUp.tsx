import React, { FormEvent } from "react"
import checkIfIsURL from "../logic/checkIfIsURL"

type Props = {confirm: Function, close: Function}

export default function PopUp ({confirm, close}: Props){
    const [error, setError] = React.useState("")

    const handler = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let input = e.currentTarget[0] as HTMLInputElement
        let url = input.value
        if(!checkIfIsURL(url)) return setError("Invalid URL")

        if(url.search("https://") === -1) url = "https://"+ url

        let input2 = input.nextSibling as HTMLInputElement
        let background = input2.value

        confirm(url, background)
    }

    return <section className='back-pop' onClick={(e)=>{
      let target = e.target as HTMLDivElement
      if(target.className === "back-pop") close()
    }}>
      <form onSubmit={handler} className='pop'>
        <h3>New Shortcut</h3>
        <div>{error}</div>
        <input name='url' placeholder="https://"/>
        <input name="color" type='color'/>
        <button type='submit'>Confirm</button>
      </form>
    </section>
  }
  