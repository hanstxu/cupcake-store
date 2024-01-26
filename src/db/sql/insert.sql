INSERT INTO cupcake(name, description, price, ingredients)
VALUES(${name}, ${description}, ${price}, ${ingredients})
RETURNING *