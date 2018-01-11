# checked-constants

### Grepable typo-resistant namespaced constants

## Installation

```javascript
yarn add @ephetic/checked-constants
#``

## Example

```javascript
//// constants.js
const cc = require('@ephetic/checked-constants')

// define single
cc`my/namespace/pi-is-exactly ${3}`

// define multiple
cc`my/namespace/
                foo       ${'Fooooooo!'}
                frobulate ${123}`

//// file1.js
const cc = require('checked-constants')

const msg = { type: cc`my/namespace/foo` } // reference shared constant
```

## Purpose

String constants are easily mistyped. Aggregating constants in objects makes constants harder to
grep and can still be mistyped. This libary is meant to provide a minimal syntax to define and
reference constants in a safer and more consistent way.

## Downsides

* Users could still use names other than `cc` and format the template in hard to grep ways.
* Constant is only checked if called. Better would be if this were a Babel transform to at least get
  compile-time errors if not editor feedback.
