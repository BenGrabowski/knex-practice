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

    afterEach(() => db('shopping_list').truncate())

    after(() => db.destroy())
    
    context(`Given 'shopping_list' has data`, () => {
        beforeEach(() => {
            return db
                .into('shopping_list')
                .insert(testItems)
        })
        
        it(`getAllItems() resolves all items from 'shopping_list' table`, () => {
            return ShoppingListService.getAllItems(db)
                .then(items => {
                    expect(items).to.eql(testItems)
                })
        })

        it(`getById() resolves an item by id from 'shopping_list' table`, () => {
            const thirdId = 3
            const thirdTestItem = testItems[thirdId -1]
            return ShoppingListService.getById(db, thirdId)
                .then(item => {
                    expect(item).to.eql({
                        id: thirdId,
                        name: thirdTestItem.name,
                        price: thirdTestItem.price,
                        category: thirdTestItem.category,
                        checked: thirdTestItem.checked,
                        date_added: thirdTestItem.date_added
                    })
                })
        })

        it(`deleteItem() removes an item by id from 'shopping_list' table`, () => {
            const itemId = 3
            return ShoppingListService.deleteItem(db, itemId)
                .then(() => ShoppingListService.getAllItems(db))
                .then(allItems => {
                    const expected = testItems.filter(item => item.id !== itemId)
                    expect(allItems).to.eql(expected)
                })
        })

        it(`updateItem() updates an item from 'shopping_list' table`, () => {
            const idOfItemToUpdate = 3
            const newItemData = {
                name: 'updated name',
                category: 'Snack',
            }
            return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
                .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
                .then(item => {
                    expect(item).to.eql({
                        id: idOfItemToUpdate,
                        ...newItemData,
                    })
                })
        })
    })

    context(`Given 'shopping_list' has no data`, () => {
        it(`getAllItems() resolves an empty array`, () => {
            return ShoppingListService.getAllItems(db)
                .then(items => {
                    expect(items).to.eql([])
                })
        })

        it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
            const newItem = {
                name: 'Test new name',
                price: 1.23,
                category: 'Lunch',
                checked: false,
                date_added: new Date()
            }
            return ShoppingListService.insertItem(db, newItem)
                .then(items => {
                    expect(items).to.eql({
                        id: 1,
                        name: newItem.name,
                        category: newItem.category,
                        checked: newItem.checked,
                        date_added: newItem.date_added
                    })
                })
        })
    })
})