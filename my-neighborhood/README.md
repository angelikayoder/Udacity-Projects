This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# My Neighborhood Project

This is Angelika Yoder's "My Neighborhood" project for Udacity's Front End Nanodegree Program.
It's a map app, built with React,  that shows you Czech resturants on Chicago's West Side. You can filter the list of restaurants, which is provided through the Foursquare API, by typing in the search box on the left side.

The following were also used in the creation of this app:
* EventBus to communicate info between components https://github.com/krasimir/EventBus
* react-google-maps was used for map-based components https://github.com/tomchentw/react-google-maps
* Recompose which is a dependency of react-google-maps https://github.com/acdlite/recompose

## To get started viewing the project in development mode:

* install all project dependencies with `npm install`
* start the development server with `npm start`

After completing the previous steps, the project can be viewed on http://localhost:3000/

## To get started viewing the project in production mode to make use of the project's service worker:

* make sure you have npm "serve" installed on your machine https://www.npmjs.com/package/serve
* install all project dependencies with `npm run build`
* start the development server with `serve build`

After completing the previous steps, the project can be viewed on http://localhost:5000/


Some future steps for this project may involve changing the search box to accommodate the input of the user's chosen city which would then search the Foursquare API for any/all Czech restaurants in the user's own city. Another possible change may be to change the map markers to little Czech flags to go along with the Czech theme of the project.
