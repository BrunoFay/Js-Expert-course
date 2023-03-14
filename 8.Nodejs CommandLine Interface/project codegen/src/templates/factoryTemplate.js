import Util from "../util.js"

const serviceNameAnchor = '$$serviceName'
const repositoryNameANchor = '$$repositoryName'

const serviceNameDepAnchor = '$$serviceNameDep'
const repositoryNameDepANchor = '$$repositoryNameDep'
const componentNameAnchor = '$$componentName'

const template = `
  import $$serviceName from '../service/$$serviceNameDep.js'
  import $$repositoryName from '../service/$$repositoryNameDep.js'

  export default class $$componentNameFactory {
    static getInstance() {
      const repository = new $$repositoryName()
      const service = new $$serviceName({ repository })
      return service
    }
  }
`

export function factoryTemplate(componentName, repositoryName, serviceName) {
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLatter(componentName))
    .replaceAll(serviceNameDepAnchor, Util.lowerCaseFirstLatter(serviceName))
    .replaceAll(repositoryNameDepANchor, Util.lowerCaseFirstLatter(repositoryName))
    .replaceAll(serviceNameAnchor, Util.upperCaseFirstLatter(serviceName))
    .replaceAll(repositoryNameANchor, Util.upperCaseFirstLatter(repositoryName))

  return {
    fileName: `${componentName}Factory`,
    template: txtFile
  }
}
