const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const builder = new xml2js.Builder();

const app = express();
const PORT = 3000; // or any other port you prefer

app.use(bodyParser.json());

//Read works
app.get('/data', (req, res) => {
    fs.readFile('../sample.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }

        // Parse the XML data into an object
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            // Return the parsed object as JSON
            res.json(result);
        });
    });
});

//create works
app.post('/products', (req, res) => {
    const newProduct = req.body;

    //Check the params
    const requiredFields = ['id', 'language', 'edition', 'title', 'author', 'isbn', 'sku', 'description', 'price', 'currency', 'department', 'modules', 'availability', 'condition', 'image'];
    const missingFields = requiredFields.filter(field => !newProduct.hasOwnProperty(field));

    if (missingFields.length > 0) {
        res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
        return;
    }

    // Read the XML file
    fs.readFile('../sample.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }
        // Parse the XML data
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            // Add the missing attributes to the new product
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

            // Add the new product to the XML data
            result.store.products[0].product.push(product);

            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write the updated XML data to the file
            fs.writeFile('../sample.xml', updatedData, (err) => {
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

//Update works
app.put('/update/:id', (req, res) => {
    const productId = req.params.id;
    const updatedProduct = req.body;

    //Check the params
    const requiredFields = ['id', 'language', 'edition', 'title', 'author', 'isbn', 'sku', 'description', 'price', 'currency', 'department', 'modules', 'availability', 'condition', 'image'];
    const missingFields = requiredFields.filter(field => !updatedProduct.hasOwnProperty(field));

    if (missingFields.length > 0) {
        res.status(400).send(`Missing required fields: ${missingFields.join(', ')}`);
        return;
    }

    // Read the XML file
    fs.readFile('../sample.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }
        // Parse the XML data
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }

            // Find the index of the product to update
            const productIndex = result.store.products[0].product.findIndex(
                (product) => product.$.id === productId
            );
            if (productIndex === -1) {
                res.status(404).send('Product not found');
                return;
            }

            // Update the product data
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

            // Convert the updated XML data back to string
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);

            // Write the updated XML data to the file
            fs.writeFile('../sample.xml', updatedData, (err) => {
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

//Delete Works
app.delete('/delete/:id', (req, res) => {
    const productId = req.params.id;
    // Read the XML file
    fs.readFile('../sample.xml', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Failed to read data');
            return;
        }
        // Parse the XML data
        const xml2js = require('xml2js');
        const parser = new xml2js.Parser();
        parser.parseString(data, (err, result) => {
            if (err) {
                console.error(err);
                res.status(500).send('Failed to parse XML');
                return;
            }



            const productIds = result.store.products[0].product.map((product) => product.$.id);
            console.log('Product IDs:', productIds);



            // Find the product to delete
            const productIndex = result.store.products[0].product.findIndex(
                (product) => product.$.id === productId

            );


            console.log('Product ID:', productId); // Log the product ID


            if (productIndex === -1) {
                res.status(404).send('Product not found');
                return;
            }
            // Remove the product from the XML data
            result.store.products[0].product.splice(productIndex, 1);
            // Convert the updated XML data back to string
            const builder = new xml2js.Builder();
            const updatedData = builder.buildObject(result);
            // Write the updated XML data to the file
            fs.writeFile('../sample.xml', updatedData, (err) => {
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




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});