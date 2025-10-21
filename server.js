// server.js

const express = require('express');
const bodyParser = require('body-parser');
const emailjs = require('@emailjs/browser'); // Import EmailJS SDK
const app = express();

// Middleware to handle JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize EmailJS with your public key
emailjs.init('-rQGw1iCaZtgGAkKg');  // Replace with your actual EmailJS public key

// POST route to handle form submissions
app.post('/submit-form', (req, res) => {
    const { name, email, message, animalType, quantity, animalImg } = req.body;

    // Set up the email parameters
    const emailParams = {
        service_id: 'service_2kesr8p',  // Your EmailJS service ID
        template_id: 'template_ziwfw1x',  // Your EmailJS template ID
        user_id: 'YOUR_USER_ID', // Replace with your EmailJS user ID if needed
        template_params: {
            from_name: name,
            from_email: email,
            message: message,
            animal_type: animalType,
            quantity: quantity,
            animal_image: animalImg ? animalImg : 'No image uploaded',
            to_email: 'busalifarmingict@gmail.com', // Your email
        }
    };

    // Log the parameters to ensure correct data is being captured
    console.log({
        from_name: name,
        from_email: email,
        message: message,
        animal_type: animalType,
        quantity: quantity,
        animal_image: animalImg
    });

    // Send the email using EmailJS
    emailjs.send(emailParams.service_id, emailParams.template_id, emailParams.template_params)
        .then((response) => {
            console.log('Success:', response.status, response.text);

            // Redirect to WhatsApp after successful email submission
            res.redirect(`https://wa.me/0113042231?text=Application%20Received%20from%20${encodeURIComponent(name)}%0AEmail:%20${encodeURIComponent(email)}%0AAnimal:%20${encodeURIComponent(animalType)}%0AQuantity:%20${encodeURIComponent(quantity)}%0AImage:%20${encodeURIComponent(animalImg ? animalImg : 'No image uploaded')}`);
        }, (error) => {
            console.error('Error:', error);
            res.status(500).send('An error occurred while sending the email. Please try again later.');
        });
});

// Serve static files (if you want to serve HTML, CSS, JS, etc.)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
