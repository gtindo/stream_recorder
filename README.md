# Stream service

## Overview

Micro service for recording audio stream of online radio channels

## How to install

- Clone repository
- use npm or yarn to install dependencies

````
npm install
````

## How to run project

* create .env file like .env.example

* start project

````
npm start
````

## How to run test
````
npm run test
````

## Messages

* Input message

```json
{
	"action": "/record-stream",
	"link": "https://stream/link",
	"ext": "mp3 or other extension",
	"time": "10 // duration of record in seconds" 
}
```

* Output message

```json
{
	"action": "/record-stream",
	"url": "/url/of/recorded/audio",
	"error": "possible error message",
	"status": "true or false"
}
```

## Author
G_T_Y