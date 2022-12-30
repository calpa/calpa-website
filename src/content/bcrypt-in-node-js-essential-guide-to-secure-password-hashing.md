---
slug: bcrypt-in-node-js-essential-guide-to-secure-password-hashing
date: 2022-12-29T00:00:00.000Z
title: "Bcrypt in Node.js: The Essential Guide to Secure Password Hashing"
description: "Bcrypt is a password hashing function that is designed to be computationally expensive, meaning that it takes a lot of time and resources to compute. It is commonly used to store hashed passwords in databases so that the original password cannot be easily determined if the database is compromised."
tags:
    - bcrypt
    - node.js
    - security
    - database
    - salt
    - hashing algorithm
---

![](https://i.imgur.com/39tRZV1.png)

## Introduction

Bcrypt is a **password hashing function** that is designed to be computationally expensive, meaning that it takes a lot of time and resources to compute. It is commonly used to **store hashed passwords** in databases so that the original password cannot be easily determined if the database is compromised.

When a user creates a new account or changes their password, the password is passed through the bcrypt function, which creates a hash of the password. This hash is then stored in the database in place of the original password. When the user logs in, their entered password is also passed through the bcrypt function, and the resulting hash is compared to the hash stored in the database. If the two hashes match, the user is authenticated.

One of the key benefits of bcrypt is that it includes a **salt**, which is a random string of characters that is added to the password before hashing. This helps to further protect against dictionary attacks, in which an attacker attempts to guess the password by hashing a list of common words and comparing the resulting hashes to the one stored in the database. Because the salt is different for each password, dictionary attacks are less effective against bcrypt hashes.

## Example

```js
const bcrypt = require('bcrypt');

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

(async function() {
  const password = 'mypassword';
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);
  // Output: "$2b$10$r8O2Q0IzcjJhZcwzO3N0W.TvCY1YQJj.N8b/WtTvMtMZ/pT0J8uG6"
})();
```

This code will create a hash of the password `mypassword` using the bcrypt library. The saltRounds parameter determines the complexity of the hashing process, with higher values resulting in more secure but slower hashes.

## Hashed value

The hashed value of a password using bcrypt has a specific structure that includes several pieces of information. Here is an example of a bcrypt hash:

`$2b$10$r8O2Q0IzcjJhZcwzO3N0W.TvCY1YQJj.N8b/WtTvMtMZ/pT0J8uG6`

The first part of the hash, `$2b$`, indicates the version of the bcrypt algorithm that was used to create the hash. The second part, `10`, indicates the "cost" or computational difficulty of the hashing process. This value is a parameter that can be adjusted to increase or decrease the security of the hash. The higher the cost, the more secure the hash, but also the longer it will take to compute.

The third part of the hash, `r8O2Q0IzcjJhZcwzO3N0W`, is the salt. This is a random string of characters that is added to the password before hashing to help protect against dictionary attacks. The salt is unique for each password, and is included in the hash to ensure that the same password will produce a different hash every time it is hashed.

The final part of the hash, `TvCY1YQJj.N8b/WtTvMtMZ/pT0J8uG6`, is the actual hash of the password. This is the result of the hashing process, and is what is stored in the database in place of the original password.

## Compare the value

To check if a user-entered password matches a stored hash, you can use the bcrypt.compare() function like this:

```js
async function checkPassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

(async function() {
  const password = 'mypassword';
  const isMatch = await checkPassword(password, hashedPassword);
  console.log(isMatch); // true
})();
```

This will compare the user-entered password to the stored hash and return true if they match, or false if they do not.

## Summary

Overall, `bcrypt` is a useful tool for securely storing passwords in a way that makes it difficult for an attacker to determine the original password, even if they have access to the hashed version of the password.

This article is powered by `ChatGPT`.