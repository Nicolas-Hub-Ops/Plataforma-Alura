const fetch = require('node-fetch')

function reandlerErr(err) {
    throw new Error(err.message);
}

async function validateStatus(links) {
    try {
        const arrStatus = await Promise
            .all(links
             .map(async url => {
            const res = await fetch(url)
            return res.status;
        })) 
        return arrStatus;
    }
    catch(err) {
        reandlerErr(err);
    }

}

function generatorArr(links) {
    return links
        .map(objLink => Object
            .values(objLink).join());
}


async function validateURLs(links) {
        const linkAll = generatorArr(links);
        const statusLink = await validateStatus(linkAll);
        // spread operator
        const results = links.map((object, id) => ({
            ...object, 
            status: statusLink[id]
        }))

        return results;
    }


module.exports = validateURLs; 