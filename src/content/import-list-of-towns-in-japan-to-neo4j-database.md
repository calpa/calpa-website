---
slug: import-list-of-towns-in-japan-to-neo4j-database
date: 2022-09-04T00:00:00.000Z
title: Import List of Towns in Japan to neo4j database
tags:
  - Neo4j
---

![](https://i.imgur.com/cJ4YV4F.png)

A town is contained within a district.

The list of towns in Japan is available in the wikipedia.

Town, Japanese, Prefecture, District, Area

For each town in towns, the town node has property: `name`, `jp`. The town is in Prefecture, and the town is also in the District.

So the cypher is quiet simple

```cypher
UNWIND $towns as town
MATCH (p:Prefecture)
WHERE p.en = toLower(town.prefecture)
  OR p.en = toLower(
    replace(
      replace(town.prefecture, 'ō', 'o'),
      'Ō',
      'O'
    )
  )

MERGE (t:Town:Municipal{name: town.name})-[:IN]->(p)
SET t.en = town.en

WITH t, town
MERGE (d:District {name: town.district})
MERGE (t)-[:IN]->(d)
MERGE (m:Metric{name: 'area'})
MERGE (t)-[hm:HAS_METRIC]->(m)
SET hm.value = apoc.number.parseFloat(town.area)
```

## Question
I would like to know which prefecture is `Nishiki` （錦町） located.

```cypher
MATCH (t:Town)-[:IN]->(p:Prefecture)
WHERE t.en = 'Nishiki'
RETURN t, p
```

So `Nishiki` is located in the `Kumamoto` Prefecture.

## Reference
1. [List of towns in Japan](https://en.wikipedia.org/wiki/List_of_towns_in_Japan)