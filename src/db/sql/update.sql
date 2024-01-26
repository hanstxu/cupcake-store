UPDATE cupcake
SET name = ${name},
    description = ${description},
    price = ${price},
    ingredients = ${ingredients}
WHERE id = ${id}
RETURNING *