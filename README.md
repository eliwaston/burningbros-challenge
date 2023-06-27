# About the project
This is a coding challenge to demonstrate skills of candidate.

***Requirements***

**Using this [product api](https://dummyjson.com/docs/products) to implement the infinite scrolling list for display list of products.**

1. Each time the user **scrolls to the end of the list, fetch the next 20 products**.
2. **Display the list of products** with relevant information (e.g., name, price, image).
    1. Keep the design as simple as possible. Please note that the **design will not be evaluated.**
3. Implement an **input for searching product name** (using */products/search?q* ). 
Whenever user typing, fetch data and update the product list.

# How to run the project
- Step 1: run `yarn install` or `npm install` to install all necessary packages.
- Step 2: after installing all packages, you can start the project by using `yarn start` or `npm start`.

# How to test the project on browser
***Case 1:*** Show all products with infinite scroll.
- For the first time, the app will get the first 20 products on the list.
- When you scroll to the end of the screen, the next 20 products will be loaded. 
- This scroll action will be loop until getting all products (100 products).

***Case 2:*** Using search box to search products (only one page).
- Input text like `phone` into the search box.
- After 1s, a request is fired and gets a list matched with `phone`.
- When getting the response, in the UI, you can see we have 4 products.

***Case 3:*** Using search box to search products (multiple pages).
- Input text like `s` into the search box.
- After 1s, a request is fired and gets a list matched with `s`.
- Scroll to the end of the screen to get the rest of the products.
- After all, you can see the UI will show 98 products that are matched with `s`.

# Thanks for taking your time to review.
