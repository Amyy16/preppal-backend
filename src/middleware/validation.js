const { ZodError } = require('zod');

function validateRequest(schema, source = "body") {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];

      const validatedData = schema.parse(dataToValidate);

      // overwrite with validated & sanitized data
      req[source] = validatedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues.map(err => ({
            field: err.path.join("."),
            message: err.message
          }))
        });
      }

      return res.status(500).json({
        success: false,
        message: "validation error"
      });
    }
  };
};

module.exports = validateRequest;