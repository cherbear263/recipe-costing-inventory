# Nuxt 3 Recipe Costing App

## overview

- nuxt 3, with tailwindcss and supabase db

## To do List

- [x] add a recipe
- [x] search and add ingredients
- [x] upload recipe to database
- [x] format directions to have subheadings if the content on the new line starts with '#'
- [x] upload an image (or multiple images?)
- [x] view recipes
- [] print-friendly view of recipe
- [] edit recipes
- [] enter a purchase invoice (should update inventory with new price/unit)
- [] fillings and other recipes should be added to the inventory - possibly a postgres view to search both inventory and recipes at the same time
- [] I wonder if I should make the calculate cost exist in a store so that I can access it anywhere?
- [] count inventory
- [] shopping list: count orders of each item coming up, to see if inventory is required. Also add to list if any items are below the minimum stock level. It should tell you how much you have, how much you are missing, then you manually choose how much to order.
- [] you should be able to group shopping lists by supplier

- [] create front end of website - e-commerce

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
