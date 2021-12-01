const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://ottavio:password_123@cluster0.hlllx.mongodb.net/test";
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const dbName = "covid19";
const collectionName = "covidapp";
const dropdownCollectionName = "covidapp_dropdown";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/api/covidapp/person', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({}).project({"person.name": 1, "person.surname": 1, "_id": 0}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            let person = []
            for (let i = 0; i < documents.length; i++) {
                person.push(documents[i].person.surname + " " + documents[i].person.name);
            }
            res.send(person);
        });
    });
});

app.get('/api/covidapp/vaccination', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({"vaccination.date_of_vaccination": { $gt: new Date('2021-01-01'), $lt: new Date('2021-08-01') }}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.post('/api/covidapp/vaccination', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);

        let today = new Date();
        let nextYear = new Date(today);
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        const document = {
            "uvci": "41:CH:AURSALT9A013724LM92Q6G9F4K1M0P4LK6",
            "generated_on": today,
            "valid_until": nextYear,
            "person": {
                "name": req.body.lastname,
                "surname": req.body.firstname,
                "birthday": new Date(req.body.birthdate),
                "birthplace": req.body.birthplace,
                "phone_number": req.body.phonenumber,
                "email": req.body.email,
                "emergency_contact": {
                    "name": req.body.ecLastname,
                    "surname": req.body.ecFirstname,
                    "phone_number": req.body.ecPhonenumber
                }
            },
            "vaccination": [
                {
                    "dose": req.body.dose,
                    "date_of_vaccination": new Date(req.body.vaccinationDate),
                    "place": req.body.vaccinationPlace,
                    "country": "Switzerland",
                    "agent": "COVID-19",
                    "type": "SARS-CoV-2-mRNA vaccine",
                    "manufacturer": req.body.manufacturer,
                    "location": {
                        "type": "Point",
                        "coordinates": [
                            46.00578028858427,
                            8.955204232179256
                        ]
                    }
                }
            ],
            "issuer": "BAG",
            "information": "https://www.bag.admin.ch/bag/de/home.html"
        }
        collection.insertOne(document, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(document);
        });
    });
});

app.put('/api/covidapp/vaccination', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);

        const filter = {"person.name": req.body.lastname, "person.surname": req.body.firstname}
        const document = {$push: { "vaccination": {
                        "dose": req.body.dose,
                        "date_of_vaccination": new Date(req.body.vaccinationDate),
                        "place": req.body.vaccinationPlace,
                        "country": "Switzerland",
                        "agent": "COVID-19",
                        "type": "SARS-CoV-2-mRNA vaccine",
                        "manufacturer": req.body.manufacturer,
                        "location": {
                            "type": "Point",
                            "coordinates": [
                                46.00578028858427,
                                8.955204232179256
                            ]
                        }
                    }}}
        collection.findOneAndUpdate(filter, document, {returnDocument: "after"}, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(result.value);
        });
    });
});

app.post('/api/covidapp/test', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);

        let today = new Date();
        let afterTomorrow = new Date(today);
        afterTomorrow.setDate(afterTomorrow.getDate() + 2);
        const document = {
            "uvci": "41:CH:AURSALT9A013724LM92Q6G9F4K1M0P4LK6",
            "generated_on": today,
            "valid_until": afterTomorrow,
            "person": {
                "name": req.body.lastname,
                "surname": req.body.firstname,
                "birthday": new Date(req.body.birthdate),
                "birthplace": req.body.birthplace,
                "phone_number": req.body.phonenumber,
                "email": req.body.email,
                "emergency_contact": {
                    "name": req.body.ecLastname,
                    "surname": req.body.ecFirstname,
                    "phone_number": req.body.ecPhonenumber
                }
            },
            "test": {
                "date_of_test": new Date(req.body.testDate),
                "place": req.body.testPlace,
                "country": "Switzerland",
                "type": "Antigenic",
                "result": req.body.testResult,
                "location": {
                    "type": "Point",
                    "coordinates": [46.00667453299541, 8.966104729563854]
                }
            },
            "issuer": "BAG",
            "information": "https://www.bag.admin.ch/bag/de/home.html"
        }
        collection.insertOne(document, (error, result) => {
            if (error) {
                throw error;
            }
            res.send(document);
        });
    });
});

app.get('/api/covidapp/type', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({"vaccination.manufacturer": "Moderna"}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.get('/api/covidapp/manufacturers', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.distinct("vaccination.manufacturer", function (error, documents) {
            if (error) {
                throw error;
            }
            res.send(documents)
        });
    });
});

app.get('/api/covidapp/positivetest', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({"test.result": true}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.get('/api/covidapp/testtype', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.distinct("test.type", function (error, documents) {
            if (error) {
                throw error;
            }
            res.send(documents)
        });
    });
});

app.get('/api/covidapp/lugano', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(collectionName);
        collection.find({ "vaccination.place": {$in :["Farmacia Sun Store Lugano Peri",
        "Farmacia Coop Vitality Viganello", "Farmacia Coop Vitality Canobbio",
        "Amavita Lugano", "Farmacia Male", "Farmacia delle Semine",
        "Farmacia Amavita Centro Breggia"]}}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.get('/api/covidapp/dropdown/places', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(dropdownCollectionName);
        collection.find({}).project({"place": 1, "_id": 0}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.get('/api/covidapp/dropdown/manufacturers', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(dropdownCollectionName);
        collection.find({}).project({"manufacturer": 1, "_id": 0}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.get('/api/covidapp/dropdown/dose', (req, res) => {
    client.connect(err => {
        const collection = client.db(dbName).collection(dropdownCollectionName);
        collection.find({}).project({"dose": 1, "_id": 0}).toArray((error, documents) => {
            if (error) {
                throw error;
            }
            res.send(documents);
        });
    });
});

app.listen(8080);
