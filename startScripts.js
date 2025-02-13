import fs from 'fs'
import path from 'path'

/* Rename app.css dynamically to avoid cdn cache bug */
const oldFile = path.join(__dirname, "app.css")
const newFile = path.join(__dirname, `app-${Date.now()}.css`)

fs.rename(oldFile, newFile, (err) => {
  if (err) {
    console.error(`Error renaming /app.css file: ${err.message}`)
  } else {
    console.log(`Renamed /app.css file: ${oldFile} to ${newFile}`)
  }
})