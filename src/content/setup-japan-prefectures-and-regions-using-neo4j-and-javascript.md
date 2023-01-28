---
slug: setup-japan-prefectures-and-regions-using-neo4j-and-javascript
date: 2022-08-19T00:00:00.000Z
title: Setup Japan Prefectures and Regions using neo4j and JavaScript
tags:
  - Neo4j
  - JavaScript
---

![](https://i.imgur.com/M8RJBGn.png)

According to Wikipedia, Japan is divided into 47 `prefectures`（都道府県）, and these prefectures are grouped into eight `regions` （八大地方區分）.

First, we get the `prefectures` and `regions` from `jp-prefecture` package.

```js
const jpPrefecture = require("jp-prefecture");

const regions = jpPrefecture.getAll("region");

const prefectures = jpPrefecture.getAll("pref");
```

After that, we can peek the region data:

```js
[{
  id: 1,
  name: "北海道",
  kana: "ホッカイドウ",
  en: "hokkaido",
  neighbor: [2]
},
{
  id: 2,
  name: "東北",
  kana: "トウホク",
  en: "tohoku",
  neighbor: [1]
}
```

It means that hokkaido region (id `1`) has a neighbor tohoku region(id `2`), so we can link them together using the neighbor relationship.

We may also peek the prefectures data:

```js
[{
  id:1,
  region:1,
  name:"北海道",
  short:"北海道",
  kana:"ホッカイドウ",
  en:"hokkaido",
  neighbor:[2]
},
  {
  id:2,
  region:2,
  name:"青森県",
  short:"青森",
  kana:"アオモリ",
  en:"aomori",
  neighbor:[1, 3, 5]
}]
```

It means that hokkaido prefecture (id `1`) has a neigbor amori (id: `2`), and amori has three neigbor (id `1` hokkaido, `3` iwate, `5` akita).

## Neo4j

We create a cypher to loop all the regions, set `name`, `kana` and `en` property to the region node, and link the region to its neighbor. So the cypher is look like:

```cypher
UNWIND $regions as region
MERGE (r:Region{id: region.id})
SET r.name = region.name
SET r.kana = region.kana
SET r.en = region.en
WITH r, region.neighbor as neighbor
UNWIND neighbor as id
MERGE (r2:Region{id: id})
MERGE (r)-[:NEIGHBOR]-(r2)
```

Just like the region, we loop all the prefectures, set `name`, `short`, `kana` and `en` properties in the prefecture node. After creating the prefectures, we create a relationship from the `prefecture` to the `region`. Also we set the neighbor relationship for the `prefectures`. So the cypher looks like

```cypher
UNWIND $prefectures as prefecture
MERGE (p:Prefecture{id: prefecture.id})
SET p.name = prefecture.name
SET p.short = prefecture.short
SET p.kana = prefecture.kana
SET p.en = prefecture.en

WITH p, prefecture.region as region, prefecture.neighbor as neighbor
MATCH (r:Region{id: region})
MERGE (p)-[:REGION]->(r)

WITH p, neighbor
UNWIND neighbor as id
MERGE (p2:Prefecture{id: id})
MERGE (p)-[:NEIGHBOR]-(p2)
```

## Neo4j JavaScript Driver

Basically, we connect to the neo4j database using the `neo4j` package, create driver and create session. `NEO4J_URI`, `NEO4j_USERNAME` and `NEO4J_PASSWORD` are in the `.env` file or environment variable.

```js
const neo4j = require('neo4j')
const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4j_USERNAME, process.env.NEO4J_PASSWORD))

const session = driver.session()
```

You may also import and configure them using `dotenv` package:

```js
require('dotenv').config()
```

```
NEO4J_URI=
NEO4j_USERNAME=
NEO4J_PASSWORD=
```

In order to query in the database, we write the `cypher` and insert the `params`.

```js
const cypher = ``
const params = {}
await session.run(cypher, params)
```

So for writing the regions:

```js
const cypher = `
UNWIND $regions as region
MERGE (r:Region{id: region.id})
SET r.name = region.name
SET r.kana = region.kana
SET r.en = region.en
WITH r, region.neighbor as neighbor
UNWIND neighbor as id
MERGE (r2:Region{id: id})
MERGE (r)-[:NEIGHBOR]-(r2)
`

await session.run(cypher, { regions })
```

And for writing the prefectures:

```js
const cypher2 = `
UNWIND $prefectures as prefecture
MERGE (p:Prefecture{id: prefecture.id})
SET p.name = prefecture.name
SET p.short = prefecture.short
SET p.kana = prefecture.kana
SET p.en = prefecture.en

WITH p, prefecture.region as region, prefecture.neighbor as neighbor
MATCH (r:Region{id: region})
MERGE (p)-[:REGION]->(r)

WITH p, neighbor
UNWIND neighbor as id
MERGE (p2:Prefecture{id: id})
MERGE (p)-[:NEIGHBOR]-(p2)
`

await session.run(cypher2, { prefectures })
```

Don't forget to close the session.

## Putting things together
```js
require('dotenv').config()

async function main () {
    const jpPrefecture = require("jp-prefecture");

    const regions = jpPrefecture.getAll("region");

    const prefectures = jpPrefecture.getAll("pref");

    const neo4j = require('neo4j-driver')
    const driver = neo4j.driver(process.env.NEO4J_URI, neo4j.auth.basic(process.env.NEO4j_USERNAME, process.env.NEO4J_PASSWORD))

    const session = driver.session()

    try {
        const cypher = `
        UNWIND $regions as region
        MERGE (r:Region{id: region.id})
        SET r.name = region.name
        SET r.kana = region.kana
        SET r.en = region.en
        WITH r, region.neighbor as neighbor
        UNWIND neighbor as id
        MERGE (r2:Region{id: id})
        MERGE (r)-[:NEIGHBOR]-(r2)
    `

        await session.run(cypher, { regions })

        const cypher2 = `
        UNWIND $prefectures as prefecture
        MERGE (p:Prefecture{id: prefecture.id})
        SET p.name = prefecture.name
        SET p.short = prefecture.short
        SET p.kana = prefecture.kana
        SET p.en = prefecture.en

        WITH p, prefecture.region as region, prefecture.neighbor as neighbor
        MATCH (r:Region{id: region})
        MERGE (p)-[:REGION]->(r)

        WITH p, neighbor
        UNWIND neighbor as id
        MERGE (p2:Prefecture{id: id})
        MERGE (p)-[:NEIGHBOR]-(p2)
    `

        await session.run(cypher2, { prefectures })
        console.log('Finished')
    } finally {
        session.close()
        console.log('Session is closed')
        process.exit(0)
    }
}

main()
```

## Result
We now have all regions:

![](https://i.imgur.com/M2zHPB8.png)

And we also have all prefectures:

![](https://i.imgur.com/pH3vH4L.png)

We may also get the full picture of Japan using the following cypher query:

```cypher
MATCH (p:Prefecture)-[:REGION]->(r:Region)
RETURN p, r
```

![](https://i.imgur.com/Hxrnjsv.png)

If I want to know the region of Kyoto （京都府） Prefecture, I can use the following cypher query:

```cypher
MATCH (p:Prefecture{en: 'kyoto'})-[:REGION]->(r:Region)
RETURN p, r
```

![](https://i.imgur.com/vyzQodP.png)

So the answer is kinki （近畿）.

## Thoughts

I am really looking forward to travel to Japan one day, enjoying the Festival in Japan and playing maimai.

With neo4j, I can understand the relationship in Japan more easy.

btw, interesting thing that I find when I am writing this article.

![](https://i.imgur.com/AlJuAhP.png)

## Reference
1.  [wadackel/jp-prefecture - Github](https://github.com/wadackel/jp-prefecture)
2.  [motdotla/dotnev - Github](https://github.com/motdotla/dotenv)
3.  [List of regions of Japan - Wikipedia](https://en.wikipedia.org/wiki/List_of_regions_of_Japan)
4.  [Prefectures of Japan - Wikipedia](https://en.wikipedia.org/wiki/Prefectures_of_Japan)
