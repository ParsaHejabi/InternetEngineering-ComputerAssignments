# Computer assignments of Internet Engineering course

This repository was created for Internet Engineering course at Shahid Beheshti University and it has the first assignments given to students through the Fall 2019 (1398) Term.

## HW1

In this homework we had to run a webserver in NodeJS that performs some GIS functionality. The GIS information was given to us as a JSON file. we had to load the file in memory once the server was booting. Then each request that came to the server we had to process the data and return appropriate response.

In server initial input file we will be receiving number of polygons with it's GPS coordinates (lat, long). The basic functionality is to be given a GPS coordinate and tell which polygons the point is inside them.

## Heroku link

Click on [**this**](https://node-gis-functionality.herokuapp.com/) link to view this application on Heroku.

## Dependencies and DevDependencies

- Express
- turf for geo spatial functionalities
- whiskers for rendering
- winston for logging
- nodemon

## APIs

- `GET: ('/')`: index
- `GET: (/gis/testpoint)`: endpoint that receives a pair of parameters (lat, long) and returns a JSON structure which has a member called polygons and it contains the name of the polygons that the point is inside them
- `PUT: (/gis/addpolygon)`: endpoint that we can add a new polygon to server for subsequent get calls.

## Artillery result

Just to test the `/` API I tested this application with one scenario using Artillery and here is the result:

```bash
All virtual users finished
Summary report @ 21:48:47(+0330) 2019-10-25
  Scenarios launched:  3600
  Scenarios completed: 3595
  Requests completed:  3595
  RPS sent: 30.33
  Request latency:
    min: 933.8
    max: 60421.7
    median: 1229.9
    p95: 50041.3
    p99: 53731.9
  Scenario counts:
    0: 3600 (100%)
  Codes:
    200: 3595
  Errors:
    ECONNRESET: 5
```
