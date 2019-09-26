require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

function getSearch(searchTerm) {
    knexInstance
        .select('name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

getSearch('burger')

function paginate(pageNumber) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (pageNumber -1)
    knexInstance
        .select('id','name', 'price')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginate(2)

function itemsAfter(daysAgo) {
    knexInstance
        .select('id', 'name', 'price', 'date_added')
        .from('shopping_list')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
        )
        .then(result => {
            console.log(result)
        })
}

itemsAfter(8)

function totalCost() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('COST PER CATEGORY')
            console.log(result)
        })
}

totalCost()