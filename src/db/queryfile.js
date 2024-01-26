const { QueryFile } = require('pg-promise');
const { join } = require('path');

function queryFile(file) {
    let fullPath = join(__dirname, "sql", file);

    const qf = new QueryFile(fullPath, { minify: true });
    if (qf.error) {
        console.error(qf.error);
    }

    return qf;
}

module.exports = {
    insert: queryFile('insert.sql'),
    select_all: queryFile('select_all.sql'),
    select: queryFile('select.sql'),
    update: queryFile('update.sql'),
    delete: queryFile('delete.sql'),
}