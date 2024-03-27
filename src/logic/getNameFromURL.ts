
export default function getName(url: string) {
    let regex = /https?:\/\/(www\.)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)/;
    let bool = url.match(regex)
    if (!bool) return
  
    return bool[2]
  }