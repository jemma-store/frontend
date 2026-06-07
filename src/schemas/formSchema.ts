import { z } from "zod";

import { checkoutSchema } from "@/schemas";

export type IFormSchema = z.infer<typeof checkoutSchema>;