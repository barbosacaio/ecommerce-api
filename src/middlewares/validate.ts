import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export function validate(schema: z.ZodTypeAny) {
    return (request: Request, response: Response, next: NextFunction) => {
        const result = schema.safeParse({
            body: request.body,
            query: request.query,
            params: request.params
        });

        if (!result.success) {
            return response.status(400).json({
                error: 'Validation Error',
                details: z.treeifyError(result.error),
            });
        }

        next();
    };
}