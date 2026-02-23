const { z } = require('zod');

const businessSchema = z.object({
  businessName: z
    .string()
    .trim()
    .min(2, "Business name must be at least 2 characters"),

  businessType: z
    .string()
    .trim()
    .min(2, "Business type must be at least 2 characters"),

  location: z
    .string()
    .trim()
    .min(2, "Business location must be at least 2 characters"),

  operatingHours: z
    .string()
    .trim()
    .min(3, "Operating hours must be valid")
    .optional()
}).strict();

const updateBusinessSchema = z.object({
  businessName: z.string().min(2).optional(),
  businessType: z.string().min(2).optional(),
  location: z.string().min(2).optional(),
  operatingHours: z.string().min(3).optional()
}).strict();


const inventorySchema = z.object({
  businessId: z
    .string()
    .uuid("Business ID must be a valid UUID"),

  productName: z
    .string()
    .trim()
    .min(2, "Product name must be at least 2 characters"),

  productType: z
    .string()
    .trim()
    .optional(),

  quantityAvailable: z
    .coerce.number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),

  productionDate: z
    .string()
    .date({ message: "Production date must be a valid ISO date" })
    .optional()
}).strict();

const updateInventorySchema = inventorySchema
  .omit({ businessId: true }) // businessId should NOT be updated
  .partial()
  .strict();


const dailySalesSchema = z.object({
  businessId: z
    .string()
    .uuid("Business ID must be a valid UUID"),

  inventoryId: z
    .string()
    .uuid("Inventory ID must be a valid UUID"),

  date: z
    .string()
    .date({ message: "Date must be a valid ISO date (YYYY-MM-DD)" }),

  quantitySold: z
    .coerce.number()
    .int("Quantity sold must be a whole number")
    .min(0, "Quantity sold cannot be negative"),

  stockLeft: z
    .coerce.number()
    .int("Stock left must be a whole number")
    .min(0, "Stock left cannot be negative")
}).strict();

const updateDailySalesSchema = dailySalesSchema
  .omit({ businessId: true, inventoryId: true })
  .partial()
  .strict();



module.exports = {
  dailySalesSchema, updateDailySalesSchema,
  inventorySchema,updateInventorySchema,
  businessSchema, updateBusinessSchema
};