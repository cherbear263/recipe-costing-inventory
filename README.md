# Nuxt 3 Recipe Costing App

## overview

- nuxt 3, with tailwindcss and supabase db

## checked of todo list

- search ingredients in inventory
- add a recipe
- upload recipe to database
- can calculate the cost of the recipe (though I think I need ot change this system)

## To do

- upload an image (or multiple images?)
- view recipes
- print-friendly view of recipe
- edit recipes
- fillings and other recipes should be added to the inventory - possibly a postgres view to search both inventory and recipes at the same time
- I wonder if I should make the calculate cost exist in a store so that I can access it anywhere?
- count inventory
- shopping list: count orders of each item coming up, to see if inventory is required. Also add to list if any items are below the minimum stock level. It should tell you how much you have, how much you are missing, then you manually choose how much to order.
- you should be able to group shopping lists by supplier

- create front end of website - e-commerce

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```
