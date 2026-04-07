import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const rootDir = process.cwd()
const srcDir = path.join(rootDir, 'src')
const allowedAttributeNames = new Set([
  'animate',
  'aria-live',
  'className',
  'custom',
  'd',
  'drag',
  'dragConstraints',
  'exit',
  'fill',
  'height',
  'href',
  'id',
  'initial',
  'key',
  'lang',
  'layoutId',
  'mode',
  'rel',
  'role',
  'src',
  'stroke',
  'strokeLinecap',
  'strokeLinejoin',
  'strokeWidth',
  'target',
  'transition',
  'tone',
  'type',
  'variant',
  'viewBox',
  'width',
  'x',
  'xmlns',
  'y',
  'rx'
])

const ignoredFiles = new Set([
  path.join(srcDir, 'components', 'ui', 'icons.tsx'),
  path.join(srcDir, 'lib', 'i18n', 'index.tsx'),
])
const findings = []

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name)

    if (entry.isDirectory()) {
      walk(absolutePath)
      continue
    }

    if (entry.isFile() && absolutePath.endsWith('.tsx')) {
      inspectFile(absolutePath)
    }
  }
}

function inspectFile(filePath) {
  if (ignoredFiles.has(filePath)) {
    return
  }

  const sourceText = fs.readFileSync(filePath, 'utf8')
  const sourceFile = ts.createSourceFile(filePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  function visit(node) {
    if (ts.isJsxText(node)) {
      const value = node.getText(sourceFile).replace(/\s+/g, ' ').trim()
      if (value) {
        findings.push(`${filePath}: raw JSX text "${value}"`)
      }
    }

    if (ts.isJsxAttribute(node) && node.initializer && ts.isStringLiteral(node.initializer)) {
      const attributeName = node.name.getText(sourceFile)
      const value = node.initializer.text.trim()

      if (value && !allowedAttributeNames.has(attributeName)) {
        findings.push(`${filePath}: string literal "${value}" in attribute "${attributeName}"`)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
}

walk(srcDir)

if (findings.length > 0) {
  console.error('Potential hardcoded UI strings found:')
  findings.forEach((finding) => console.error(`- ${finding}`))
  process.exit(1)
}

console.log('UI string audit passed with no raw JSX text or string-literal accessibility labels.')
