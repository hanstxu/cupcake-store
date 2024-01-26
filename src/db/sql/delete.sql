DELETE FROM cupcake
WHERE id = ${id}
RETURNING *