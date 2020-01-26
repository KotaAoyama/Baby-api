# Introduction

This project is creating an api service with express, postgresql and knex by myself
in Cooding Boot Camp, CodeChrysalis.
My service is a world popular baby name api.

## Endpoints

### GET /api/babies

response format:

```
[
 {"baby_name":"james","country_code":"IE"},{"baby_name":"emily","country_code":"IE"},{"baby_name":"grace","country_code":"IE"}
]
```

### POST /api/babies/:baby_name/:country_code

request body:

```
{ "baby_name": "emma", "country_code": "US" }
```

response format:

```
{
  "id": 1,
  "baby_name": "emma",
  "country_code": "US"
}
```

### PATCH /api/babies/:baby_name/:country_code

request body:

```
{ "baby_name": "olivia", "country_code": "US" }
```

response format:

```
{
"id": 1,
"baby_name": "olivia",
"country_code": "US"
}
```

### DELETE /api/babies/:baby_name/:country_code

request body:

```
{ "baby_name": "olivia", "country_code": "US" }
```

response format:
boolean
