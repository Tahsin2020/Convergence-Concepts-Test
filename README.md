# Convergence-Concepts-Test
This is a repository for the front and back end tasks given to me by Convergence Concepts.

## FE (front end) exercise:

Platform: React

Language/framework: React (https://reactjs.org/)

Requirements: Create a simple web app that accomplishes the following:

When the app starts, fetch /photos JSON data from the http://jsonplaceholder.typicode.com website

Create a horizontally scrollable list of photos that represent the data you fetched. Each photo should have the “title” text written diagonally across the photo, have rounded corners, a border, and should have a drop shadow.  This should scroll smoothly.

The photos that are downloaded must be cached so that if the app is terminated, the next session should not have to download previously downloaded images again.

Add a button to the screen below the scrollable photo list. Tapping this button will reorder the list in completely random order. Use a recursive function to reorder the list.

## What I learned from the FE (front end) exercise:

I learned that CSS is difficult, but there are many solutions to the same problem. Like to put text over an image? Use a background image on a div. Many CSS solutions can be borrowed, but one should learn CSS on their own to create customized solutions, same with JS.

I learned about how to make a scrolling function for a Horizontal Carousel of Images, by borrowing from a prepared npm package. 

I learned that a lot of difficult problems have been solved already, and can be modified for your situation.

I learned React has limits on the number of updates it can do, and as such requires careful updating, and recursively modifying an array can cause absurd amount of updates to the DOM.

I learned about Session Storage, Caching, requesting and saving JSON data in React, 
