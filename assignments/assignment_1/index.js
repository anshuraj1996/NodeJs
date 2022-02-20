function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const myName = process.argv[process.argv.length-1];
    return myName
}

function getNameFromEnv() {
    // Write your code here
    const myName = process.env.name
    return myName

}

function getNameFromReadLine() {
    // Write your code here

      const readline = require('readline').createInterface({
          input: process.stdin,
          output:process.stdout
      })

      var myName = ""
      readline.question("",name=> {
          myName = name
          readline.close()    
      })
      return myName

}


module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}