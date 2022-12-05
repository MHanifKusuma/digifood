# Final Project - Restaurant App

Name: M Hanif Kusuma

Final Project Theme : Restaurant Project Name : Digifood

## Page in my Program

- Login Page
- Register Page

### Page that User can Access, including :

- Home
- Menu
- Menu Detail
- Carts
- Orders
- Profile
- User Coupons

### Page that Admin can Access, including :

- Dashboard
- CRUD Menu
- CRUD Coupons

## I completed all Technical Requirements Frontend, including :

- different role for admin and user
- using REACT Typescript
- separate client for the users and the admin.
- using state management (Redux)
- using styled component for major component
- reusable component
- frontend comunicates with backend via REST API
- authentication features for pages based on logged in user
- Mobile Responsive

## I completed all Features, includes :

### Admin Side

#### Dashboard

- Show transaction total and have filter features by date (7 days last, last month, etc..)
- Data management Orders
- Displays a list of orders received from customers
- Can display the status of delivery orders (In progress, in transit, received) and update the status of delivery orders.

#### Menu data management

- CRUD function (Create, Read, Update, Delete) for food menu (Name, Description, Price, etc..)

#### Coupon data management

- Displays all available coupons and can delete and create coupons.

### User Side

#### Register

- Adjust the data requested in the new user registration form with the required data in the database.
- Sign In
- User Profile

#### Profile Page:

- Change user data (Name, Contact)
- Change, select or delete user photos
- Display data on coupon codes owned

#### Menu Page:

- Display all available menus with several filter features:
  - Search menus by name
  - Sort menu by price
  - Filter menu by categoryx

#### Menu Detail Page:

- Choose several menu options:
- Adding menu to cart with selected options

#### Order Cart

- Displays all food menus that have been ordered
- Edit menu quantity ordered
- Remove order from cart

#### Payment and Checkout System

- Display summary of the selected menu
- Can remove one menu
- Show payment option options, can use existing coupon code
- Create order and send it to admin side

#### Order History List

- Display order history and able to filter and search history data
- Displays all order history from users and can perform several filters:
  - Search by menu name
  - Filter by category
  - Sort history by order date
