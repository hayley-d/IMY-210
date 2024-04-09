const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();
const xmlFormatter = require('xml-formatter');
const convert = require('xml-js');
/*Hayley Dodkins u21528790*/
const app = express();
const PORT = 3000; // or any other port you prefer

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Read all stores works
app.get('/data', (req, res) => {
    fs.readFile('./phase1/sample.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            res.json(result);
        });
    });
});

//create new product works
app.post('/products/:storeId', (req, res) => {
    const storeId = req.params.storeId;
    const filename = `./xmlFiles/${storeId}.xml`;
    const newProduct = req.body;

    //Check the params
    const requiredFields = ['id', 'language', 'edition', 'title', 'author', 'isbn', 'sku', 'description', 'price', 'currency', 'department', 'modules', 'availability', 'condition', 'image'];
    const missingFields = requiredFields.filter(field => !newProduct.hasOwnProperty(field));

    if (missingFields.length > 0) {
        res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
        return;
    }

    // Read the XML file
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            //Create new product
            const product = {
                '$': {
                    id: newProduct.id,
                    language: newProduct.language,
                    edition: newProduct.edition
                },
                title: newProduct.title,
                author: newProduct.author,
                isbn: newProduct.isbn,
                sku: newProduct.sku,
                description: newProduct.description,
                price: {
                    '_': newProduct.price,
                    '$': { currency: newProduct.currency }
                },
                department: newProduct.department,
                modules: {
                    module: newProduct.modules.map(module => ({
                        '$': { id: module.id, name: module.name }
                    }))
                },
                availability: newProduct.availability,
                condition: newProduct.condition,
                image: newProduct.image
            };

            // add new product
            result.store.products[0].product.push(product);

            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write to the file
            fs.writeFile(filename, updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update data');
                    return;
                }
                res.send('Product created successfully');
            });
        });
    });
});

//Update product works
app.put('/update/:storeId/:productId', (req, res) => {
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    const filename = `./xmlFiles/${storeId}.xml`;
    const updatedProduct = req.body;

    //Check the params
    const requiredFields = ['id', 'language', 'edition', 'title', 'author', 'isbn', 'sku', 'description', 'price', 'currency', 'department', 'modules', 'availability', 'condition', 'image'];
    const missingFields = requiredFields.filter(field => !updatedProduct.hasOwnProperty(field));

    if (missingFields.length > 0) {
        res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
        return;
    }

    // Read the XML file
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            // Find product to update
            const productIndex = result.store.products[0].product.findIndex(
                (product) => product.$.id === productId
            );
            if (productIndex === -1) {
                res.status(404).send('Product not found');
                return;
            }

            // Update the product
            result.store.products[0].product[productIndex] = {
                '$': {
                    id: updatedProduct.id,
                    language: updatedProduct.language,
                    edition: updatedProduct.edition
                },
                title: updatedProduct.title,
                author: updatedProduct.author,
                isbn: updatedProduct.isbn,
                sku: updatedProduct.sku,
                description: updatedProduct.description,
                price: {
                    '_': updatedProduct.price,
                    '$': { currency: updatedProduct.currency }
                },
                department: updatedProduct.department,
                modules: {
                    module: updatedProduct.modules.map(module => ({
                        '$': { id: module.id, name: module.name }
                    }))
                },
                availability: updatedProduct.availability,
                condition: updatedProduct.condition,
                image: updatedProduct.image
            };

            // Convert
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write back to the file
            fs.writeFile(filename, updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update data');
                    return;
                }
                res.send('Product updated successfully');
            });
        });
    });
});

//Delete  product Works
app.delete('/delete/:storeId/:productId', (req, res) => {
    const storeId = req.params.storeId;
    const productId = req.params.productId;
    const filename = `./xmlFiles/${storeId}.xml`;

    // Read the XML file
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            const productIds = result.store.products[0].product.map((product) => product.$.id);

            // Find product
            const productIndex = result.store.products[0].product.findIndex(
                (product) => product.$.id === productId

            );

            if (productIndex === -1) {
                res.status(404).send('Product not found');
                return;
            }

            // Remove product
            result.store.products[0].product.splice(productIndex, 1);

            //convert
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write the updated data to the xml file.
            fs.writeFile(filename, updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update data');
                    return;
                }
                res.send('Product deleted successfully');
            });
        });
    });
});

//Get the User by username works
app.get('/user/:username', (req, res) => {
    const username = req.params.username;

    // Read the XML file
    fs.readFile('./xmlFiles/users.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            console.log(result); // Log the parsed XML result


            // Find user
            const user = result.users.user.find(
                (user) => user.username[0] === username
            );

            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            // Build response object
            const userObject = {
                id: user.id[0],
                username: user.username[0],
                password: user.password[0],
                role: user.role[0],

            };

            res.send(userObject);


        });
    });
});

//Get the User by userID works
app.get('/userID/:userID', (req, res) => {
    const userID = req.params.userID;

    // Read the XML file
    fs.readFile('./xmlFiles/users.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            console.log(result); // Log the parsed XML result


            // Find user
            const user = result.users.user.find(
                (user) => user.id[0] === userID
            );

            if (!user) {
                res.status(404).send('User not found');
                return;
            }

            // Build response object
            const userObject = {
                id: user.id[0],
                username: user.username[0],
                password: user.password[0],
                role: user.role[0],
            };

            res.send(userObject);


        });
    });
});

//creates a new store and works
app.post('/create',(req,res) =>{
    const storeData = req.body;

    console.log(storeData);

    // Convert JSON to XML using xml-js
    let xml = convert.js2xml(storeData, { compact: true, ignoreComment: true });

    // Manually construct the XML content
     xml = `<?xml version="1.0" encoding="UTF-8" ?>\n${xml}`;

    // Format XML with proper indentation
    const formattedXml = xmlFormatter(xml);

    // Extract the userId from the storeData
    const userId = storeData.store.information.owner['_attributes'].userId;

    // Construct the filename based on userId
    const filename = `./xmlFiles/${userId}.xml`;

    fs.writeFile(filename, formattedXml, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error writing XML file');
        } else {
            console.log('XML file created successfully');
            res.status(200).send('XML file created successfully');
        }
    });

    //now add to the directory
    // Read the contents of the stores.xml file
    fs.readFile('./xmlFiles/stores.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Parse the XML content to JavaScript object
        const storesObject = convert.xml2js(data, {compact: true});

        // Define the new store entry
        const newStoreEntry = {

                id: {_text: storeData.store.information['_attributes'].id},
                name: {_text: storeData.store.information.name['_text']}

        };

        console.dir(storesObject);
        console.log(newStoreEntry);

        // Add the new store entry to the stores object
        storesObject.stores.store.push (newStoreEntry);

        // Convert the updated JavaScript object back to XML
        const updatedXml = convert.js2xml(storesObject, {compact: true});

        // Format XML with proper indentation
        const formattedUpdate = xmlFormatter(updatedXml);

        // Write the updated XML content back to the stores.xml file
        fs.writeFile('./xmlFiles/stores.xml', formattedUpdate, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log('New store entry added to stores.xml');
        });
    });
});

//Fetch store
app.get('/store/:storeId', (req,res) =>{
    const storeId = req.params.storeId;
    const filename = `./xmlFiles/${storeId}.xml`;

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            console.dir( result.store);
            res.json(result);
        });
    });
});

//Update product works
app.put('/update/:storeId', (req, res) => {
    const storeId = req.params.storeId;
    const filename = `./xmlFiles/${storeId}.xml`;
    const updatedStore = req.body;


    // Read the XML file
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            result = updatedStore;

            // Convert
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write back to the file
            fs.writeFile(filename, updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update data');
                    return;
                }
                res.send('Product updated successfully');
            });
        });
    });
});

//Register User
app.post('/register', (req, res) => {
    const newUser = req.body;

    // Read the XML file
    fs.readFile('./xmlFiles/users.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            // Add the new user to the users array
            result.users.user.push(newUser);

            // Convert the updated data back to XML
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write back to the file
            fs.writeFile('./xmlFiles/users.xml', updatedData, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Failed to update data');
                    return;
                }
                res.send('User registered successfully');
            });
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

