export default function checkIfIsURL (value: string) {
    let regex = /^(?:https?:\/\/)?(?:www\.)?[\w-]+\.[a-z]{2,}(?:\/\S*)?$/

    console.log(regex.test(value))
    return regex.test(value)
}