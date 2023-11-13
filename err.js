const fs = require('fs').promises;
const axios = require('axios');

// Replace with the path to your image file
const imagePath = 'climate.jpg';

async function runInference() {
    try {
        // Read the image file as binary data
        const imageBuffer = await fs.readFile(imagePath);

        // Construct the headers
        const headers = {
            'Content-Type': 'application/json',
        };

        // Construct the payload
        const payload = {
            instances: [
                {
                    name: 'image',
                    shape: [1, 224, 224, 3],
                    datatype: 'BYTES',
                    data: imageBuffer.toString('base64'), // Convert to base64
                },
            ],
        };

        // Send the request to OVMS model server using axios
        const response = await axios.post(
            'https://waverx-vision-ovms-climatewavers-dev.apps.sandbox-m2.ll9k.p1.openshiftapps.com/v2/models/waverx-vision/versions/1/infer',
            payload,
            {
                headers,
            }
        );

        // Print the response
        console.log(response.status);
        console.log(response.data);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

// Run the function
runInference();
