# Welcome!

Create catalogs so your clients can order:

1. You load our web app and create your catalog, where you can set the different items you sell with the prices and description.
2. Set the url you want your catalog to be in: https://our-web-url/shop/your-shop-url
3. Set the phone number where you want WhatsApp messages to reach.
4. After you publish, send the url to your clients.
5. When a client makes an order you will get a message from them directly on your WhatsApp number

# Dev guide:

This repo has /backend folder and a /frontend folder where each project is stored

# Pre Requisites:
1. nvm: This is a tool that helps you install different versions of node.

# Backend guide:

The backend is coded in Node and uses Express to configure the different endpoints

1. cd /backend
2. nvm use // This will automatically set nvm's node version to the one set in the /backend/.nvmrc file
3. npm install
4. npm start

The backend by default uses in-memory data storage so you don't need anything else to try on your local
If you want to connect to a database or configure things, create a .env file at /backend/.env and use the /backend/.env.example file as a guide to know which fields you can configure

# Frontend guide

The frontend is coded in Vue

1. cd /frontend
2. nvm use
3. npm install
4. npm run dev

To configure things go to /frontend/lib/environment.ts
