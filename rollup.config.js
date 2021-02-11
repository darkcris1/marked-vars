// import resolve from 'rollup-plugin-node-resolve';
// import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
const libraryName = 'markedVars' // Change with your library's name

const banner = `/*!
 * ${pkg.name}
 * ${pkg.description}
 *
 * @version v${pkg.version}
 * @author ${pkg.author}
 */`

export default (commandLineArgs) => {
  const isProduction = commandLineArgs.environment === 'BUILD:production'

  const configs = [
    // UMD Development
    {
      input: 'src/index.js',
      output: {
        banner,
        name: libraryName,
        file: `dist/${libraryName}.umd.min.js`,
        format: 'umd',
      },
      plugins: [
        resolve(), // teach Rollup how to find external modules
        commonjs(), // so Rollup can convert external modules to an ES module

        isProduction &&
          babel({
            exclude: ['node_modules/**'],
          }),
        isProduction &&
          terser({
            output: {
              comments: /^!/,
            },
          }),
      ],
    },
  ]

  return configs
}
