# Merklizer

Merklizer is a JavaScript package for converting healthcare data to Merkle Patricia tree.  
Merklizer provides consistent conversion between various medical data format standards. (Currently, support DICOM to FHIR only.)  

## Key Features (version 0.2.1)
* Transform FHIR Resources to Merkle tree
  * Support Merkle Patricia tree which is described in the [Ethereum's Yellow Paper](https://ethereum.github.io/yellowpaper/paper.pdf)
* Validate FHIR Resources by [MediBloc defined FHIR Protocol buffers](https://github.com/medibloc/merklizer/tree/master/proto/fhir-stu3)
  * Support STU3
* Convert DICOM image to FHIR Resource
  * Support DICOM image to Media Resource

## Todo
* Auto-generate Protocol buffers
  * Support Base Resources in HL7 FHIR STU3
* Convert DICOM image to FHIR Resource
  * Support to involved all known meta-data in DICOM file

## Dependencies
### [protoc 3.6.0](https://github.com/google/protobuf/tree/v3.6.0)

### npm packages
* [merkle-patricia-tree 2.3.1](https://github.com/ethereumjs/merkle-patricia-tree/tree/v2.3.1)
* [protobufjs 6.8.6](https://github.com/dcodeIO/protobuf.js/tree/6.8.6)
* [dicom-parser 1.8.1](https://github.com/cornerstonejs/dicomParser/tree/1.8.1)


## Installation

```
npm install medibloc/merklizer
```

## Usage
### FHIR Resource to Merkle Patricia tree

```node
import { utils, fhir, merkle } from 'merklizer';

// let resource = OBJECT_OF_FHIR_RESOURCE;
let plain = fhir.filter(resource); // returns filtered object
let flat = utils.flat(plain); // returns flatted object
let arr = utils.objectToArray(flat); // returns array
merkle.createTrie(arr, (e,r) => {
  let trie = r;
  merkle.proveTrie(trie, arr, (e,r) => {
    let trie = r;
  }
}
```

### DICOM to Merkle Patricia tree

```node
import { utils, dicom, fhir, merkle } from 'merklizer';

// let dicomArray = UINT8ARRAY_OF_DICOM
let media= dicom.createMedia(dicomArray); // returns media object
let plain = fhir.filter(media); // returns filtered object
let flat = utils.flat(plain); // returns flatted object
let arr = utils.objectToArray(flat); // returns array
merkle.createTrie(arr, (e,r) => {
  let trie = r;
  merkle.proveTrie(trie, arr, (e,r) => {
    let trie = r;
  }
}
```

## API Reference

| Components | Descriptions
|------------|-----------------------------------
| fhir | HL7 FHIR related
| dicom | DICOM related
| merkle | Merkle Patricia tree related
| utils | extra functions to deal with object

### fhir.filter
An object is processed as defined [MediBloc FHIR Protocol buffers](https://github.com/medibloc/merklizer/tree/master/proto/fhir-stu3)

#### Parameters
* `resource` **[Object]** An JSON typed FHIR Resource
#### Returns
* `filter` **[Object]** A filtered FHIR Resource

**Examples**
```javascript
const resource = {
  resourceType: 'Media',
  type: { value: 1 },
  content: {
    data: { value: '' },
  },
};
let filtered = fhir.filter(resource);
```

### dicom.createMedia
Transform DICOM to Media Resource  

#### Parameters
* `dicomArray` **[Uint8Array]** A Uint8Array typed DICOM
#### Returns
* `media` **[Object]** An Object of Media Resource

**Examples**
```javascript
const dicomArray = new Uint8Array(buffer);
let media = dicom.createMedia(dicomArray);
```

### merkle.createTrie
Create trie using an array of Resource components

#### Parameters
* `items` **[Array]** An array, which is composed of key and value
* `cb` **[Function]** A callback `Function` (arguments {Error}`e`, {Trie}`r`)

**Examples**
```javascript
merkle.createTrie(items, cb);
```

### merkle.proveTrie
Prove trie using an array of Resource components that is used to create the trie

#### Parameters
* `trie` **[Trie]** A trie to prove
* `items` **[Array]** An array, which is composed of key and value
* `cb` **[Function]** A callback `Function` (arguments {Error}`e`, {Trie}`r`)

**Examples**
```javascript
merkle.proveTrie(trie, items, cb);
```

### utils.flat
Flat object's depth

#### Parameters
* `obj` **[Object]** An object, which is composed of key and value
#### Returns
* `flat` **[Object]** A flatten object

**Examples**
```javascript
let obj = {
  key1: {
    keyA: 'valueI'
  },
  key2: {
    keyB: 'valueII'
  },
  key3: { a: { b: { c: 2 } } },
};
let flatted = utils.flat(obj);
```

### utils.objectToArray
Transform object to array

#### Parameters
* `obj` **[Object]** An object
#### Returns
* `arr` **[Array]** An array

**Examples**
```javascript
let obj = {
  name: 'Bob',
  email: 'bob@gmail.com',
};
let array = utils.objectToArray(obj);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
```
Copyright 2018 MediBloc

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
