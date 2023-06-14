import fullingTable from './scripts/goPrice.js'

const table = await fullingTable.fullingDepartment('Prevention', 'Surgery', 'Orthopedics', 'Therapy')
const [prev, surg, ort, ter] = table
const tableList = document.querySelector('#table')

function fullTable(table) {
    for (let i = 0; i < table.length; i++) {
        for (let j = 0; j < table[i].length; j++) {
            const ul = document.createElement('ul')
            ul.classList.add('table__item')
            
            const liName = document.createElement('li')
            liName.classList.add('table__row')
        
            liName.textContent = table[i][j].name

            const liDep = document.createElement('li')
            liDep.classList.add('table__row')
            liDep.textContent = table[i][j].department

            const liCost = document.createElement('li')
            liCost.classList.add('table__row')
            liCost.textContent = table[i][j].cost

            ul.append(liName, liDep, liCost)
            tableList.append(ul)
        }
    }
}

fullTable(table)