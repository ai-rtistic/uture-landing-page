import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = process.cwd()
const outputPath = resolve(root, 'dist/index.html')
const serverEntry = resolve(root, '.prerender/entry-server.js')
const placeholder = '<div id="root"></div>'

const [{ render }, html] = await Promise.all([
  import(serverEntry),
  readFile(outputPath, 'utf8'),
])

if (!html.includes(placeholder)) {
  throw new Error(`Prerender placeholder not found in ${outputPath}`)
}

const rendered = html.replace(placeholder, `<div id="root">${render()}</div>`)
await writeFile(outputPath, rendered)
await rm(resolve(root, '.prerender'), { recursive: true, force: true })
