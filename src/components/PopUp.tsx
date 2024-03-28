import React, { FormEvent } from "react"

type Props = {confirm: Function}

export default function PopUp ({confirm}: Props){
    const [error, setError] = React.useState("")

    const handler = (e: FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        let input = e.currentTarget[0] as HTMLInputElement
        let url = input.value
        console.log(url.search("."))
        if(url.search(".") === -1) return setError("Invalid URL")

        if(url.search("https://") === -1) url = "https://"+ url

        let input2 = input.nextSibling as HTMLInputElement
        let background = input2.value

        confirm(url, background)
    }

    return <section className='back-pop'>
      <form onSubmit={handler} className='pop'>
        <h3>New Shortcut</h3>
        <div>{error}</div>
        <input name='url' placeholder="https://"/>
        <input name="color" type='color'/>
        <button type='submit'>Confirm</button>
      </form>
    </section>
  }
  