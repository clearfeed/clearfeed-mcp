import { z } from 'zod';

const entityTypeSchema = z.enum(['request', 'customer']);
const fieldTypeSchema = z.enum(['select', 'multi_select', 'text', 'date', 'number', 'user_select']);

const selectOptionSchema = z.object({
  value: z.string().min(1)
});

const updateSelectOptionSchema = z.object({
  id: z.string().nullable().optional(),
  value: z.string().min(1)
});

const selectConfigSchema = z.object({
  options: z.array(selectOptionSchema).min(1),
  default_value: z.string().optional(),
  ai_prompt: z.string().optional()
});

const multiSelectConfigSchema = z.object({
  options: z.array(selectOptionSchema).min(1),
  default_value: z.array(z.string()).min(1).optional(),
  ai_prompt: z.string().optional()
});

const textConfigSchema = z.object({
  max_length: z.number().int().min(1).max(3000),
  single_line: z.boolean(),
  default_value: z.string().optional(),
  ai_prompt: z.string().optional()
});

const dateConfigSchema = z
  .object({
    default_value: z.string().optional(),
    ai_prompt: z.string().optional()
  })
  .optional();

const numberConfigSchema = z
  .object({
    default_value: z.number().optional(),
    ai_prompt: z.string().optional()
  })
  .optional();

const userSelectConfigSchema = z
  .object({
    default_value: z.string().optional()
  })
  .optional();

const updateSelectConfigSchema = z.object({
  options: z.array(updateSelectOptionSchema).min(1),
  default_value: z.string().optional(),
  ai_prompt: z.string().optional()
});

const updateMultiSelectConfigSchema = z.object({
  options: z.array(updateSelectOptionSchema).min(1),
  default_value: z.array(z.string()).min(1).optional(),
  ai_prompt: z.string().optional()
});

const createConfigUnionSchema = z
  .union([
    selectConfigSchema,
    multiSelectConfigSchema,
    textConfigSchema,
    dateConfigSchema,
    numberConfigSchema,
    userSelectConfigSchema
  ])
  .optional();

const updateConfigUnionSchema = z
  .union([
    updateSelectConfigSchema,
    updateMultiSelectConfigSchema,
    textConfigSchema,
    dateConfigSchema,
    numberConfigSchema,
    userSelectConfigSchema
  ])
  .optional();

export const customFieldListSchema = z.object({
  entity_type: entityTypeSchema.optional()
});

export const customFieldCreateSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().nullable().optional(),
    entity_type: entityTypeSchema.optional(),
    type: fieldTypeSchema,
    config: createConfigUnionSchema
  })
  .superRefine((value, ctx) => {
    validateConfigByType(value, ctx, createConfigSchemaMap, true);
  });

export const customFieldUpdateSchema = z
  .object({
    id: z.number().int().min(1),
    name: z.string().min(1),
    description: z.string().nullable().optional(),
    version: z.number().int().min(0),
    type: fieldTypeSchema,
    config: updateConfigUnionSchema
  })
  .superRefine((value, ctx) => {
    validateConfigByType(value, ctx, updateConfigSchemaMap, true);
  });

export const customFieldDeleteSchema = z.object({
  id: z.number().int().min(1)
});

export { fieldTypeSchema };

type ConfigSchemaMap = Record<
  z.infer<typeof fieldTypeSchema>,
  z.ZodTypeAny
>;

const createConfigSchemaMap: ConfigSchemaMap = {
  select: selectConfigSchema,
  multi_select: multiSelectConfigSchema,
  text: textConfigSchema,
  date: dateConfigSchema,
  number: numberConfigSchema,
  user_select: userSelectConfigSchema
};

const updateConfigSchemaMap: ConfigSchemaMap = {
  select: updateSelectConfigSchema,
  multi_select: updateMultiSelectConfigSchema,
  text: textConfigSchema,
  date: dateConfigSchema,
  number: numberConfigSchema,
  user_select: userSelectConfigSchema
};

const requiredConfigTypes = new Set(['select', 'multi_select', 'text']);

function validateConfigByType(
  value: { type: z.infer<typeof fieldTypeSchema>; config?: unknown },
  ctx: z.RefinementCtx,
  schemaMap: ConfigSchemaMap,
  requireConfig: boolean
) {
  const { type, config } = value;
  if (requireConfig && requiredConfigTypes.has(type) && config === undefined) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `config is required for type '${type}'`,
      path: ['config']
    });
    return;
  }

  if (config === undefined) {
    return;
  }

  const schema = schemaMap[type];
  const parsed = schema.safeParse(config);
  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: issue.message,
        path: ['config', ...issue.path]
      });
    }
  }
}
