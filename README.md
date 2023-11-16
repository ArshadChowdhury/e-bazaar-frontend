
# E-bazaar frontend

Frontend of an e-commerce project to add products, search products, add/edit quantity or delete products from cart.

## [Live app link](https://e-bazaar-by-arshad.netlify.app/){:target="_blank"}

# Table of contents

- Project overview
- Tech stack
- Motivation behind this project
- Getting started locally

# Project overview

This is the frontend part of an e-commerce project I've worked on previously. Here you can add new product, find your product by searching, or by navigating to next page of this app, add items to the cart, update the quantity on the cart, delete items from the cart.
The cart and all products are saved in a database using MongoDB so even if you reload the page it'll all be there for you. Made the project fully responsive as well, so it looks great in all devices, have modals and side drawers to add product and see the cart. We're using Nest.js as the backend, you can check that code here - https://github.com/ArshadChowdhury/e-bazaar-backend

### Here's a glimpse of the app -

![image](https://github.com/ArshadChowdhury/e-bazaar-frontend/assets/86738490/d356b8ca-0190-47fd-badd-15b4927ee7cd)

![image](https://github.com/ArshadChowdhury/e-bazaar-frontend/assets/86738490/1563c571-26e9-4351-bf45-2dc33e04eeb9)

![image](https://github.com/ArshadChowdhury/e-bazaar-frontend/assets/86738490/6403112c-b39f-4cbc-b0eb-cb30d375cfde)

# Tech stack - 

Next.js with TypeScript <br>
TailwindCSS <br>
Nest.js with TypeScript (for backend) <br>
MongoDB (for backend) <br>

# Motivation behind this project

I learned coding on my own, I've saw some videos on youtube that made shopping cart, search work on frontend, but I didn't know that in real life applications we should store the cart,search data in backend. I've learned about this in my last job where I saw they're implementing cart, search and pagination in the backend. So I thought to myself yeah it makes perfect sense now it'll be more secure and user can have the data saved as well. I figured I need to build a project with search, pagination and cart which will use backend/database to store the data. From that thinking I've built this project to learn more about searching, paginating and adding/deleting/updating cart items in backend. You can check the backend code right here - https://github.com/ArshadChowdhury/e-bazaar-backend

# Getting started locally - 

First you'll need to clone this project by running

```bash
git clone https://github.com/ArshadChowdhury/e-bazaar-frontend.git
```
then change directory to ```e-bazaar-frontend``` folder then run

```bash
$ npm install
# or 
$ yarn install
```
and then run the development server by running

```bash
npm run dev
# or
yarn dev
```

You'll also need an env to connect to backend contact me on social media for that. 

After adding the env file -

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.



