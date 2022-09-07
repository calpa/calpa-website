---
slug: introduction-to-wikidata-and-sparql
date: 2022-09-06T00:00:00.000Z
title: Introduction to Wikidata and SPARQL
---

![](https://i.imgur.com/L7H6R6K.png)

Wikidata is a free multilingual database that available for everyone to query information from wikipedia. We can use it to get the statistics, dates, locations that stored in the wikipedia.

Let's take Japan as an example. The record is in [page](https://www.wikidata.org/wiki/Q17).

![](https://i.imgur.com/P2tCFPp.png)

## Item
> The Wikidata repository consists mainly of items, each one having a label, a description and any number of aliases. Items are uniquely identified by a Q followed by a number, such as Douglas Adams (Q42).

The id of item in wikidata is in the format of `Q{number}`, so for Japan, the id is Q17.

## Statement
> Statements describe detailed characteristics of an Item and consist of a property and a value.

Property is in the format of `Q{number}`, such as `instance of` (P31). So for example, Japan is instance of `country` (Q6256).

Let's query the more data using query language `SPARQL`.

## SPARQL
SPARQL language is a special query language that we can use to get all data from the wikidata.

We can use the online [Wikidata Query Service](https://query.wikidata.org/) to query the wikidata database.

### List all countries in the world
This is a simple query for listing all countries, so we can construct the query like this.

```SPARQL
SELECT ?item ?itemLabel
WHERE {
  ?item wdt:P31 wd:Q6256;
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
```

Select variables `item` and `itemLabel` that the record is `instance of`(P31) `country`(Q6256).

And we can translate the label in english by this:
```SPARQL
SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
```

![](https://i.imgur.com/qACOD3L.png)

### List the countries in the East Asia
Let's add one more criteria, the country is in the `East Asia` Geographic Region.

So scroll a little bit in the page, `Japan` is `part of` (P361) `East Asia`(Q27231). (`?item wdt:P361 wd:Q27231`)

So the SPARQL query will be:

```SPARQL
SELECT ?item ?itemLabel
WHERE {
  ?item wdt:P31 wd:Q6256;
        wdt:P361 wd:Q27231.
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en" }
}
```

So the difference is `?item wdt:P361 wd:Q27231`.

![](https://i.imgur.com/I1FOsAe.png)

## Homework
1. List the prefectures of Japan
2. List the regions of Japan
3. List all Shinto shrine
4. List all Japan Festival

## Thoughts
It's interesting to explore the world using the power of programming, and I find it's more important to build curiosity towards the world.