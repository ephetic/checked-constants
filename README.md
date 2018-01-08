# checked-constants
### Grepable typo-resistant namespaced constants

## Example

```javascript
//// constants.js
const cc = require('checked-constants')

// define single
cc`my/namespace/pi ${3}`

// define multiple
cc`my/namespace/
                foo       ${'Fooooooo!')
                frobulate ${123}`

//// file1.js
const cc = require('checked-constants')

const msg = {type: cc`my/namespace/foo`}
```

## Purpose
String constants are easily mistyped.  Aggregating constants in objects makes constants harder to grep and can still be mistyped.  This libary is meant to provide a minimal syntax to define and reference constants in a safer and more consistent way.
