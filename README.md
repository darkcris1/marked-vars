# Marked Vars

A markdown compiler with accessible variables.

This package depends on [marked](https://marked.js.org/) compiler because it's popular and effecient.

> All the features in [marked](https://marked.js.org/) is accessible the only difference is the variables

# Documentation

- [Installation](#installation)
- [Usage](#usage)

# Installation

NPM

```bash
$ npm i marked-vars
```

Unpkg

```html
<script src="https://unpkg.com/marked-vars"></script>
```

# Usage

To assign a variable:

This is just like a javascript object, basic expressions will work

```bash
---vars
title: "Variables",
date: new Date().toDateString(),
age: 1 + 2 + 4,
name: "Cris"
---

# @(title) -> "Variables"
The date is @(date) -> Date Today
My name is @(name) -> "Cris"
My age is @(age) -> 7
```

> You need to put the variables at the **very top** of the file
> To Access the variables you need to warap it on **@(variable-name)** as you can see on the example

```javascript
import markedVars from 'marked-vars'

const markdown = `
---vars
title: "Marked Vars"

--- \n # @(title)
`

const compiled = markedVars(markdown)

compiled.html //-> "<h1 id='marked-vars'>Marked Vars</h1>"

compiled.vars //-> { title: "Marked Vars" }
```

## Changing the delimeter

It's a open and closing tag to match of the variables

**default**: ["---vars","----"]

```javascript
markedVars(markdown, { delims: ['---', '---'] })
```

## Converting to marked vars

markedVars.convertToMarkdown(**variables**, **markdown**, **delims**)

variables: **object**

markdown: **string**

delims?: **[string,string]**

```javascript
markedVars.convertToMarkdown(
  {
    title: 'Marked-Vars',
  },
  '# Hello world',
)
/*
  return `
  ---vars
  title: "Marked Vars"
  ---
  # Hello world
  `

```
