import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data)
    document.body.insertAdjacentHTML("afterBegin",template)
  }
  prepareData(data) {
    const [firstItem] = data
    const tHeaders = Object.keys(firstItem).map(text => `<th scope=col>${text}</th>`)

    const joinsLists = list => list.join('')

    const tBodyValues = data
      .map(item => Object.values(item))
      .map(item => item.map(value => `<td>${value}</td>`))
      .map(tds => `<tr>${joinsLists(tds)}</tr>`)

    const template = `
    <table class="table-auto">
      <thead>
        <tr> ${joinsLists(tHeaders)}</tr>
      </thead>
      <tbody>
        ${joinsLists(tBodyValues)}
      </tbody>
    </table>
    `
    return template
  }
}
