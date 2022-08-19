---
slug: crud-operations-in-neo4j
date: 2022-08-18T00:00:00.000Z
title: CRUD Operations in neo4j
---

## Create
```cypher
CREATE (n:Node{id: 1})
RETURN n
```

## Read
We can use the `MATCH` clause to search the patterns. In order to get all Nodes that are labelled `Node`, we can use the following cypher query:

```cypher
MATCH (n:Node)
RETURN
```

## Update
We can use `SET` clause to update the property on the node or relationship

```cypher
MATCH (n:Node)
SET n.modifiedAt = datetime()
RETURN n
```

## Delete
We can use the `DETACH DELETE` clause to delete a nodes and any relationships going or from it.

```cypher
MATCH (n:Node{id: 1})
DETACH DELETE n
```

## Reference
1. [CREATE - neo4j cypher user manual](https://neo4j.com/docs/cypher-manual/current/clauses/create/)
2. [MATCH - neo4j cypher user manual](https://neo4j.com/docs/cypher-manual/current/clauses/match/)
3. [SET - neo4j cypher user manual](https://neo4j.com/docs/cypher-manual/current/clauses/set/)
4. [DELETE - neo4j cypher user manual](https://neo4j.com/docs/cypher-manual/current/clauses/delete/)