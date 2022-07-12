export const capitalize = (value:string) => {
    const words = value.split(" ")
    let result = []
    for (const word of words) {
        result.push(word.split("")[0].toUpperCase() + word.split("").slice(1).join(""))
    }
    return result.join(" ")
}