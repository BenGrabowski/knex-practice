const ShoppingListService = require('../src/shopping-list-service')
const knex = require('knex')

describe(`Shopping-List service object`, () => {
    let db
    let testItems = [
        {
            id: 1,
            name: 'Test Item #1', 
            price: 1.23, 
            category: 'Main', 
            checked: false, 
            date_added: new Date()
        },
        {
            id: 2,
            name:'Test Item #2', 
            price: 4.56, 
            category: 'Snack', 
            checked: true, 
            date_added: new Date()
        },
        {
            id: 3,
            name: 'Test Item #3', 
            price: 7.89, 
            category: 'Lunch', 
            checked: false, 
            date_added: new Date()
        },
    ]

    before(() => {
        db = knex({
            client: 'pg',
            connection: process.env.SL_TEST_DB_URL,
        })
    })

    before(() => db('shopping_list').truncate())

    before(() => {
        return db
            .into('shopping_list')
            .insert(testItems)
    })

    after(() => db.destroy())
    
    describe(`getAllItems()`, () => {
        it(`resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(items => {
                    expect(items).to.eql(testItems)
                })
        })
    })

})