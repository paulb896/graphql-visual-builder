# GraphQL Visual Builder

Simple Apollo GraphQL Server using GraphQL Voyager.

## Setup

    npm i

## Running Server

    npm run dev
    npm start

By default the Graph visualization will be available here:

* [Graph Visualization](http://localhost:5000/voyager)
* [GraphQL Query Tool](http://localhost:5000/graphql)


## Usage

### Example GraphQL Query Tool Request/Response

**Query**
```
{
  dependenciesAlive
  users {
    name
    person {
      name
      isOnline
    }
  }
}
```

**Response Body**
The `dependenciesAlive` property is returned by the resolver, while the `users` property returns random mock data based on the scalar type.
```
{
  "data": {
    "dependenciesAlive": true,
    "users": [
      {
        "name": "Hello World",
        "person": {
          "name": "Hello World",
          "isOnline": false
        }
      },
      {
        "name": "Hello World",
        "person": {
          "name": "Hello World",
          "isOnline": true
        }
      }
    ]
  }
}
```

### Example cURL Request

```curl 'http://localhost:5000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:5000' --data-binary '{"query":"{\n  dependenciesAlive\n  users {\n    name\n    person {\n      name\n      isOnline\n    }\n  }\n}"}' --compressed```