# E-commerce App

[Live Page](https://store.jayclim.com)

Customizable E-commerce app that relies on Stripe API to safely handle user payment info. App will be deployed onto a secure domain. 

## **Technologies/API's Used:**
* React & Redux libraries
* MERN stack
* MLabs
* Bcrypt
* Passport.js(LocalStrategy & Google OAUTH2.0 X-Supported)
* Stripe
* Lodash
* Dotenv

## **Future Features:**
* Set up mailing service
* Allow multiple images to be uploaded per product listing
* Set up Shopping Cart
* Set up "remember user" feature for checkout
* Edit product feature

## Author: Jay Lim

### Change Log: 

8/25/18:
 * implement html entity conversion for xss
 * 

8/23/18:
 * add ip to logs model

8/21/18:
 * Implemented Mobile Responsiveness
 * Fix refresh error on non-index pages
 * Server logs middleware & DB model set up

8/19/18 & 8/20/18:
 * Product Page
 * Customized Card Components with Links in title
 * Finished react-stripe-elements checkout

8/18/18:
 * Production server ready
 * SSL set up
 * Moving away from react-stripe-checkout due to CSP & lag concerns

8/17/18:
 * Update stock in DB
 * Upgrade ProductCard Component
 * Implemented Checks to prevent selling items not in inventory
 * Update Product redux state
 * Set up supporting API routes & Payment model methods

8/16/18:
 * Implement File Upload using S3
 * Set up API & Front End view for user's listed items
 * Finished Product Registration Form + Modal View

8/15/18:
 * Set up Local Login In/Register
 * Set up Google OAUTH 2.0
 * Store Vendor Request Set up
