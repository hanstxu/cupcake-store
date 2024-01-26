#!/bin/bash

# Create
curl --location 'http://localhost:7500/v2/cupcake' \
     --header 'Content-Type: application/json' \
     --data '{
                 "name": "Strawberry cupcake",
                 "description": "description",
                 "price": 14.99,
                 "ingredients": [
                     "strawberry",
                      "milk",
                      "flour",
                      "eggs",
                      "sugar",
                      "butter",
                      "baking powder",
                      "baking soda"
                 ]
             }'
      
# Read All
curl --location 'http://localhost:7500/v2/cupcake'

# Read
curl --location 'http://localhost:7500/v2/cupcake/1'

# Update
curl --location --request PUT 'http://localhost:7500/v2/cupcake/1' \
     --header 'Content-Type: application/json' \
     --data '{
                 "name": "Strawberry cupcake",
                 "price": 14.99
             }'

# Delete
curl --location --request DELETE 'http://localhost:7500/v2/cupcake/1'