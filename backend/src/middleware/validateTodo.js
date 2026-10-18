import { todoSchema } from "../validators/todoValidator.js";

export default function validateTodo(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            res.status(400).json({
                message: "Validation failed",
                errors: result.error.issues
            });
            return;
        }

        req.body = result.data;
        next();
    }
}