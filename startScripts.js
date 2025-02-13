import fs from 'fs'

/* Rename app.css dynamically to avoid CDN cache bug */
const oldFile = 'extensions/busy-buddy-embed/assets/app.css'
const newFile = `extensions/busy-buddy-embed/assets/app-${Date.now()}.css`

fs.rename(oldFile, newFile, (err) => {
  if (err) {
    console.error(`Error renaming /app.css file: ${err.message}`)
  } else {
    console.log(`Successfully renamed /app.css to ${newFile}`)
  }
})