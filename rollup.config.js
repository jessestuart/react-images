import { minify } from 'uglify-es'
import { uglify } from 'rollup-plugin-uglify'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

const name = 'Images'
const path = 'dist/react-images'
const globals = {
  classnames: 'classNames',
  glam: 'glam',
  'prop-types': 'PropTypes',
  'react-dom': 'ReactDOM',
  'react-input-autosize': 'AutosizeInput',
  'raf-schd': 'rafScheduler',
  'react-view-pager': 'PageView',
  'react-full-screen': 'Fullscreen',
  'react-scrolllock': 'ScrollLock',
  'a11y-focus-store': 'focusStore',
  'react-transition-group': 'Transition',
  react: 'React',
}
import createEnv from 'dotenv'

createEnv.config()
const external = Object.keys(globals)
const babelOptions = prod => {
  let result = {
    // babelrc: false,
    presets: [['@babel/preset-env'], '@babel/preset-react'],
    // presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react'],
    plugins: [],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      // '@babel/plugin-external-helpers',
    ],
  }
  if (prod) {
    // result.plugins.push('transform-react-remove-prop-types')
  }
  return result
}
const injectSecret = () => {
  return replace({
    'process.env.UNSPLASH_API_KEY': JSON.stringify(
      process.env.UNSPLASH_API_KEY
    ),
  })
}

export default [
  {
    input: 'src/index.js',
    output: {
      file: path + '.es.js',
      format: 'es',
    },
    external: external,
    plugins: [babel(babelOptions(false)), injectSecret()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [babel(babelOptions(false)), injectSecret(), resolve()],
  },
  {
    input: 'src/index.umd.js',
    output: {
      name: name,
      file: path + '.min.js',
      format: 'umd',
      globals: globals,
    },
    external: external,
    plugins: [
      babel(babelOptions(true)),
      injectSecret(),
      resolve(),
      uglify({}, minify),
    ],
  },
]
