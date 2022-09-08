---
slug: how-to-fetch-wikidata-using-javascript-and-sparql-query
date: 2022-09-07T00:00:00.000Z
title: How to fetch Wikidata using JavaScript and SPARQL query
---

We can use `wikidata-sdk` to get the data from the Wikidata.

1. Import the `wikidata-sdk` package as variable `wdk`.

```javascript
const wdk = require('wikidata-sdk')
```

2. Write your SPARQL query

```javascript
const sparql = `
SELECT ?item ?itemLabel
WHERE {
  ?item wdt:P31 wd:Q6256;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
`
```

3. Get the url and parsed body

```javascript
const [baseUrl, body] = wdk.sparqlQuery(sparql).split('?')
```

4. Use `axios` to POST and get the response

```javascript
const axios = require('axios')

const { data } = await axios.post(url, body)

console.log(data)
```

So let's combine the code together.

```js
const axios = require('axios')
const wdk = require('wikidata-sdk')
const sparql = `
SELECT ?item ?itemLabel
WHERE {
  ?item wdt:P31 wd:Q6256;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
`

const [url, body] = wdk.sparqlQuery(sparql).split('?')

const { data } = await axios.post(url, body)

console.log(data)
```

We can run the above code in runkit and inspect the response:

![](https://i.imgur.com/imHMWNH.png)

Or you may click the following link to play with the source code.

https://runkit.com/calpa/example-of-fetching-all-countries-from-wikidata