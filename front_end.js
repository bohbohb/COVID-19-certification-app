const {MongoClient} = require('mongodb')
const dbName = "covid19"
const collectionName = "covidapp"
const uri = "mongodb+srv://gauss:Gauss1234@cluster0.hlllx.mongodb.net/test?authSource=admin&replicaSet=atlas-bwaz2j-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

// async function listDatabases (client) {

//     const databasesList = await client.db().admin().listDatabases();
//     databasesList.databases.forEach(db => console.log(`- ${db.name}`));
// }


async function insertManyDocs(client, docs) {
    const result = await client.db(dbName).admin().collection(collectionName).insertMany(docs);
    console.log(`${result.insertedCount}`)
}

// async function findOneListingByName(client, nameOfList) {
//     const result = await client.db(dbName).collection(collectionName).findOne({uvci: nameOfList});
//     console.log(result)
// }

async function aggregatePipeline(client, pipeline) {
    const aggCursor = client.db(dbName).collection(collectionName).aggregate(pipeline);
    for await (doc of aggCursor) {
        console.log(doc);
    }
}

// async function findQuery (client, query) {
//     const resultCursor = client.db(dbName).admin().collection(collectionName).find(query);
//     for await (doc of aggCursor) {
//         console.log(doc);
//     }
// }

async function main() {

    const client = new MongoClient(uri);
    try {
        await client.connect();

        // await listDatabases(client);
        // await findOneListingByName(client, "54868-5047");
        const aggr = [{$match:{ vaccination: { $exists: true }}}];
    
        await aggregatePipeline(client, aggr);

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
    
}

main().catch(console.error);