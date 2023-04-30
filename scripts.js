function checkTable(table, biggest) {
    table.forEach(item => {
        if (item.id > biggest) {
            biggest = item.id;
            if (Array.isArray(item.replies)) {
                biggest = checkTable(item.replies, biggest);
            }
        }
    });
    return biggest;
}

document.getElementById('get-data').addEventListener('click', ())

export function findBiggerId(jsonDB) {
    return (checkTable(jsonDB.comments, 1));
}