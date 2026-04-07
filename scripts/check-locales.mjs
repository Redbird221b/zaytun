import fs from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const localeDir = path.join(rootDir, 'src', 'locales')
const localeFiles = ['en.json', 'ru.json', 'uz.json']

function flattenKeys(value, parent = '') {
  if (Array.isArray(value)) {
    return value.flatMap((entry, index) => flattenKeys(entry, `${parent}[${index}]`))
  }

  if (value && typeof value === 'object') {
    return Object.entries(value).flatMap(([key, entry]) => {
      const next = parent ? `${parent}.${key}` : key
      return flattenKeys(entry, next)
    })
  }

  return [parent]
}

const localeMaps = Object.fromEntries(
  localeFiles.map((file) => {
    const absolutePath = path.join(localeDir, file)
    const content = fs.readFileSync(absolutePath, 'utf8')
    return [file, JSON.parse(content)]
  }),
)

const baseFile = 'uz.json'
const baseKeys = flattenKeys(localeMaps[baseFile]).sort()
let hasErrors = false

for (const file of localeFiles) {
  const keys = flattenKeys(localeMaps[file]).sort()
  const missing = baseKeys.filter((key) => !keys.includes(key))
  const extra = keys.filter((key) => !baseKeys.includes(key))

  if (missing.length > 0 || extra.length > 0) {
    hasErrors = true
    console.error(`Locale mismatch in ${file}`)
    if (missing.length > 0) {
      console.error(`  Missing keys: ${missing.join(', ')}`)
    }
    if (extra.length > 0) {
      console.error(`  Extra keys: ${extra.join(', ')}`)
    }
  }
}

if (hasErrors) {
  process.exit(1)
}

console.log(`Locale validation passed for ${localeFiles.join(', ')}`)
