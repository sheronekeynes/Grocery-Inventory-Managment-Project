const queries = require('../db/queries.js')


async function showCategory(req,res){

    const categories = await queries.getAllCategory();
    res.render('Category',{categories})

}

module.exports = {
    showCategory
}

