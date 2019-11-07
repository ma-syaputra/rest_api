function convertAny(input){
    const removeSpecial =  input.replace(/[^\w\s]/gi,"")
    return removeSpecial
}

function trimWord(input){
return input.trim()
}



module.exports = {
    convertAny:convertAny,
    trimWord:trimWord

}