const fs = require('fs')
const chalk = require('chalk')

const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    // {
    //     return note.title === title
    // })

    debugger

    if (!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.inverse.green('New note added!'))
    } else {
        console.log(chalk.inverse.blue('Note title taken!'))
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter( (note) => note.title !== title)
    // const notesToKeep = notes.filter( (note) => {
    //     return note.title !== title
    // })

    if (notes.length > notesToKeep.length){
        console.log(chalk.inverse.green('Note removed!'))
        saveNotes(notesToKeep)

    } else {
        console.log(chalk.inverse.red('Note not found'))
    }
}

const listNotes = () => {
    console.log(chalk.inverse('Your notes...'))
    const notes = loadNotes()
    notes.forEach((note) => {
      console.log('Title : ' + note.title + '\n' + 'Body : ' + note.body + '\n')  
    })

}

const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if (note) {
        console.log('Title : ' + chalk.inverse(note.title))
        console.log('Body : ' + chalk.inverse(note.body))
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
   try {
       const dataBuffer = fs.readFileSync('notes.json')
       const dataJSON = dataBuffer.toString()
       return JSON.parse(dataJSON)
   } catch (error) {
       return []
   }
}

module.exports = {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}