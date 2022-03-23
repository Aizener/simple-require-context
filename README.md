### Based on node.js automation module introduction

```js
const requireContext = require('simple-require-context')

const context = requireContext('./', false, /\.js$/)
console.log(context.keys())
context.keys().forEach(m => {
  console.log(context(m))
})
```


