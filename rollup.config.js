import terser from '@rollup/plugin-terser'
import { readFileSync, writeFileSync, copyFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

const currentYear = new Date().getFullYear()
const buildDate = new Date().toISOString().replace('T', ' ').substring(0, 16)

const banner = ` // ----------------------------------------------------------------------------
 // ${pkg.description}
 // v${pkg.version} - Built ${buildDate}
 // Licensed under the MIT license.
 // http://buzz.jaysalvat.com/
 // ----------------------------------------------------------------------------
 // Copyright (C) 2010-${currentYear} Jay Salvat
 // http://jaysalvat.com/
 // ----------------------------------------------------------------------------
`

// Generate metadata files
const metadata = {
  date: buildDate + ':00',
  version: pkg.version
}

writeFileSync('dist/metadata.json', JSON.stringify(metadata, null, 2))
writeFileSync('dist/metadata.js', `__metadata(${JSON.stringify(metadata, null, 2)})`)

// Copy TypeScript definitions
copyFileSync('src/buzz.d.ts', 'dist/buzz.d.ts')

export default [
  // UMD build (unminified)
  {
    input: 'src/buzz.js',
    output: {
      file: 'dist/buzz.js',
      format: 'umd',
      name: 'buzz',
      banner: banner
    }
  },
  // UMD build (minified)
  {
    input: 'src/buzz.js',
    output: {
      file: 'dist/buzz.min.js',
      format: 'umd',
      name: 'buzz',
      banner: banner.split('\n').map(line => line.trim()).join('\n'),
      sourcemap: true
    },
    plugins: [
      terser({
        format: {
          comments: /^!/
        }
      })
    ]
  },
  // ES Module build
  {
    input: 'src/buzz.js',
    output: {
      file: 'dist/buzz.esm.js',
      format: 'es',
      banner: banner
    }
  }
]
