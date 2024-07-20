# JsonDiffPatch
JsonDiffPatch is a library that allows for the diffing and patching of JSON objects.

```bash
npm install json-diff-patch-v2
```

1. Import JsonDiffPatch in your project:

```javascript
import { DiffPatcher } from 'json-diff-patch-v2';
```

2. Create a `DiffPatcher` instance:

```javascript
const diffPatcher = new DiffPatcher();
```

3. Use the `diff`, `patch`, and `reverse` methods to work with your JSON objects:

- **Diff**: To find the difference between two objects.
- **Patch**: To apply a patch to an object.
- **Reverse**: To reverse a patch.

## Examples

### Diffing Two Objects

```javascript
const left = { name: 'John', age: 25 };
const right = { name: 'John', age: 26 };

const delta = diffPatcher.diff(left, right);
console.log(delta);
// Output: { age: [25, 26] }
```

### Patching an Object

```javascript
const original = { name: 'John', age: 25 };
const delta = { age: [25, 26] };

const patched = diffPatcher.patch(original, delta);
console.log(patched);
// Output: { name: 'John', age: 26 }
```

### Using Property Filter

In scenarios where you want to ignore certain properties during diffing, you can use the `propertyFilter` option.

```javascript
const options = {
  propertyFilter: function(name) {
    return name.slice(0, 1) !== '$';
  },
};
const diffPatcherWithFilter = new DiffPatcher(options);

const left = { data: { $volatile: 123, stable: 456 } };
const right = { data: { $volatile: 124, stable: 456 } };

const delta = diffPatcherWithFilter.diff(left, right);
console.log(delta);
// Output: undefined (since the change is in a filtered property)
```
