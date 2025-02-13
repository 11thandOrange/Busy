import fs from 'fs'

const fileName = `app-${Date.now()}.css`
fs.writeFileSync(fileName, 'This is a dynamically created file.')

console.log(`Created /app.css File: ${fileName}`);
