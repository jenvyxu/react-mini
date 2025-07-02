import { getBaseRollupPlugins, getPakacgeJson, resolvePkgPath } from "./utils";
import generatePackageJson from "rollup-plugin-generate-package-json";


const { name, module } = getPakacgeJson('react')
const pkgPath = resolvePkgPath(name)
const pkgDistPath = resolvePkgPath(name, true)

export default [
  // react
  {
    input: `${pkgPath}/${module}`,
    output: {
      file: `${pkgDistPath}/index.js`,
      format: 'umd',
      name: 'react'
    },
    plugins: [
      ...getBaseRollupPlugins(),
      generatePackageJson({
        inputFolder: pkgPath,
        outputFolder: pkgDistPath,
        baseContents: ({ name, description, version }) => ({
          name,
          description,
          version,
          main: 'index.js',
        })
      })
    ]
  },
  // jsx-runtime
  {
    input: `${pkgPath}/src/jsx.ts`,
    output: [{
      file: `${pkgDistPath}/jsx-runtime.js`,
      format: 'umd',
      name: 'jsx-runtime.js'
    },
    {
      file: `${pkgDistPath}/jsx-dev-runtime.js`,
      format: 'umd',
      name: 'jsx-dev-runtime.js'
    }],
    plugins: [
      ...getBaseRollupPlugins()
    ]
  }
]