---
slug: import-list-of-villages-in-japan-to-neo4j-database
date: 2022-08-23T00:00:00.000Z
title: Import List of Villages in Japan to neo4j Database
---

![](https://i.imgur.com/3lgGBfN.png)

A `village` is contained within a prefecture, and a `district` has many `villages` or `towns` that not overlap an no uncovered area.

By importing the table from wikipedia, we can get the `name`, `en` (english name), `prefecture`, `district` and `area` details of the village.

So we can use the following code to get the data and run the cypher query.

```js
const createVillages = async (ctx) => {
  const url = `https://www.wikitable2json.com/api/List_of_villages_in_Japan?table=0&keyRows=1`;
  const { data } = await axios.get(url);

  const villages = data[0].map((village) => {
    return {
      area: village["Area (in km²)"],
      district: village["District"],
      name: village["Japanese"],
      prefecture: village["Prefecture"],
      en: village["Village"],
    };
  });

  const result = await ctx.session.run(geography.createVillages, { villages });

  logger.info(`Villages created`);

  return result;
};
```

And the cypher is pretty simple, for each village, create Village node and set `area`, `en` property. Create a district node and bind the village, district and prefecture relationships.

```cypher
UNWIND $villages as village
MERGE (v:Village:Municipal{name: village.name})
SET v.area = village.area,
    v.en = village.en

WITH v, village
MERGE (d:District{name: village.district})
MERGE (v)-[:IN]->(d)

WITH v, village, village.prefecture as prefecture, d
MATCH (p:Prefecture)
WHERE p.en = toLower(prefecture)
  OR p.en = toLower(
    replace(
      replace(prefecture, 'ō', 'o'),
      'Ō',
      'O'
    )
  )
MERGE (v)-[:IN]->(p)
MERGE (d)-[:IN]->(p)
```

## Thoughts

By building the fundamentals of data in the database, I know more than yesterday.

## Reference
1. [List of villages in Japan - Wikipedia](https://en.wikipedia.org/wiki/List_of_villages_in_Japan)