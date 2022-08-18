---
slug: how-to-create-neo4j-database-using-docker-and-docker-compose
date: 2022-08-17T00:00:00.000Z
title: How to create Neo4j database using docker and docker compose
---

We can use the following command to start the Neo4j Container.

```bash
docker run \
    --name neo4j \
    -p 7474:7474 -p 7687:7687 \
    -d \
    -v $HOME/neo4j/data:/data \
    -v $HOME/neo4j/logs:/logs \
    -v $HOME/neo4j/import:/var/lib/neo4j/import \
    -v $HOME/neo4j/plugins:/plugins \
    --env NEO4J_AUTH=neo4j/test \
    neo4j:4.4.9-community
```

And the image is started smoothly in MacOS M1.

![](https://i.imgur.com/uHtOqU8.png)

The list of Neo4j docker images are available in: https://hub.docker.com/_/neo4j/tags

## Docker Compose

```yml
version: '3'

services:
  neo4j:
    image: neo4j:4.4.9-community
    network_mode: "bridge"
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - $HOME/neo4j/data:/data
      - $HOME/neo4j/logs:/logs
      - $HOME/neo4j/import:/var/lib/neo4j/import
      - $HOME/neo4j/plugins:/plugins
    environment:
      - NEO4J_AUTH=neo4j/test
```

We can also starts the neo4j service by using the following command:

```bash
docker-compose up
```

![](https://i.imgur.com/ocCIvw6.png)

To run the service in background, we can pass the `-d` flag (`detached` mode)

```bash
docker-compose up -d
```

You may also change the location of the database to current folder by changing the volume.

```yml
version: '3'

services:
  neo4j:
    image: neo4j:4.4.9-community
    network_mode: "bridge"
    ports:
      - "7474:7474"
      - "7687:7687"
    volumes:
      - ./neo4j/data:/data
      - ./neo4j/logs:/logs
      - ./neo4j/import:/var/lib/neo4j/import
      - ./neo4j/plugins:/plugins
    environment:
      - NEO4J_AUTH=neo4j/test
```

## Neo4j Browser

We can run the following cypher query in http://localhost:7474/browser/ to check if we have an empty database.

```cypher
MATCH (m)
RETURN m
```

![](https://i.imgur.com/W12bQaP.png)

To create a node, we can use the following cypher query:

```cypher
CREATE (n:Node)
RETURN n
```

And one node is created.

![](https://i.imgur.com/tWb4adF.png)

Now when we query all nodes, we can see the same result.

```cypher
MATCH (m)
RETURN m
```

![](https://i.imgur.com/h6ptpLM.png)

## Reference
1. [How-To: Run Neo4j in Docker](https://neo4j.com/developer/docker-run-neo4j/)