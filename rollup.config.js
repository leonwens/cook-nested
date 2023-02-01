import babel from 'rollup-plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
export default {
  input: './demo/index.ts',
  output: {
    file: './lib/cook-nest.js',
    name: 'cookNest',
    format: 'umd',
    sourcemap: true
  },
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript')
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve()
  ]
};
