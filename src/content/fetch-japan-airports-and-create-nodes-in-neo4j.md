---
slug: fetch-japan-airports-and-create-nodes-in-neo4j
date: 2022-08-22T00:00:00.000Z
title: Fetch Japan Airports and create nodes in neo4j
tags:
  - Neo4j
  - cypher
  - JavaScript
---

I would like to know more about Japan, such as visualizing the relationship and nodes of the `First-Class` Airports in Japan, and the city it located and the prefecture.

With the following cypher query, my curiosity can be fulfilled.

```cypher
MATCH (p:Prefecture)<-[:IN]-(c1:City)-[:HAS]->(a:Airport)-[:IS]->(c2:Classification)
WHERE c2.name = 'First-class'
RETURN p, c1, a, c2
```

![](https://i.imgur.com/uUCpGTp.png)

## Setup database

Convert the table in the List of airports in Japan in Wikipedia to json, and import them to the neo4j database.

The airport node should contain the `name`, `ICAO`, `IATA`, `node` properties and link to the `municipality` (city), a new node with the label `Classification` (`First-class`, `Second-class`, `Third-class`, `Other`, `Military`).

So we use `axios` to fetch the data, and the code should be like this:

```js
const createAirports = async (ctx) => {
  const url = `https://www.wikitable2json.com/api/List_of_airports_in_Japan?table=0&keyRows=1`
  const { data } = await axios.get(url)

  const airports = data[0].map((airport) => {
    const object = airport;
    object.cities = object.Municipality.split(' / ')
    object.name = object['Airport name']
    object.classification = object['Classification']
    object.prefecture = object['Prefecture'].split(' / ')
    return object;
  })

  const result = await ctx.session.run(geography.createAirports, { airports })

  logger.info(`Airports created`)
  return data
}
```

And we can use the following cypher to create the airport node, relate the airport to the city:

```cypher
UNWIND $airports as airport
MERGE (a:Airport{name: airport.name})
SET a.ICAO = airport.ICAO,
    a.IATA = airport.IATA

WITH a, airport
MERGE (c1:Classification{name: airport.classification})
MERGE (a)-[:IS]->(c1)

WITH a, airport
UNWIND airport.cities as city
UNWIND airport.prefecture as prefecture
MATCH (c2:City{en: city})-[:IN]->(p:Prefecture)
WHERE p.en = toLower(prefecture)
MERGE (c2)-[:HAS]->(a)
```

The source code is available in [calpa - japan - Github](https://github.com/calpa/japan).

## Reference
1. [calpa - japan - Github](https://github.com/calpa/japan)
2. [List of airports in Japan](https://en.wikipedia.org/wiki/List_of_airports_in_Japan)