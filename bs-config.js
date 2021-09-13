const express = require('express');
const app = express();

const ipfsClient = require('ipfs-http-client');
const fileUpload = require("express-fileupload");

require('dotenv').config();

app.use(fileUpload());

app.post('/upload', async (req, res) => {    
    const projectId = process.env.PROJECT_ID;
    const projectSecret = process.env.PROJECT_SECRET;
    console.log(process.env.PROJECTI_ID);
    console.log(process.env.PROJECTI_SECRET);

    const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64')

    const client = ipfsClient({
        host: 'ipfs.infura.io',
        port: 5001,
        protocol: 'https',
        headers: {
            authorization: auth
        }
    });
    
    if (req.files && req.files.image) {
        const file = req.files.image;
        const filesAdded = await client.add({ path: file.name, content: file.data });
        res.send(filesAdded[0].hash);
    } else {
        return res.status(400).send('Invalid or missing image');
    }
})

module.exports = {
    "server": {
        "baseDir": ["./", "./src", "./project-6/build/contracts"],
        "routes": {
            "/node_modules": "node_modules"
        },
        middleware: {
            1: app,
        },
    },
    port: 3000
};