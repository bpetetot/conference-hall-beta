# APIs description

## Get event

### Endpoint

`GET /api/v1/event/{event_id}`

### Parameters

| parameter    | type      | description                                               | required |
| ------------ | --------- | --------------------------------------------------------- | -------- |
| `key`        | `string`  | API key                                                   | Yes      |
| `state`      | `string`  | State of the talk (submitted, accepted, backup, rejected) | No       |

### Example

```js
{
  "id": "",                 // event id
  "name": "",               // event name
  "categories": [           // array of categories
    {
      "id": ""              // id of the category
      "name": ""            // name of the category
      "description": ""     // description of the category
    }
  ],
  "formats": [              // array of formats
    {
      "id": ""              // id of the format
      "name": ""            // name of the format
      "description": ""     // description of the format
    }
  ],
  "talks": [                // array of talks
    {
      "id": "",             // talk id
      "title": "",          // title
      "level": "",          // level (beginner, intermediate, advanced)
      "abstract": "",       // abstract
      "categories": "",     // category id
      "formats": "",        // format id
      "speakers": [""]      // array of speakers uid
    }
  ],
  "speakers": [             // array of speakers
    {
      "uid": "",            // speaker id
      "displayName": "",    // fullname
      "bio": "",            // biography
      "company": "",        // company
      "photoURL": "",       // photo URL
      "twitter": "",        // twitter username
      "github": "",         // github username
      "email": "",          // email
      "phone": "",          // phone
    }
  ]
}
```
