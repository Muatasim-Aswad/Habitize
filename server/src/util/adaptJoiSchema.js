const adaptJoiSchema = (baseSchema, options = {}) => {
  const { makeOptional = [], forbidFields = [] } = options;

  // Modify the schema dynamically
  return baseSchema
    .fork(makeOptional, (field) => field.optional())
    .fork(forbidFields, (field) => field.forbidden());
};

export default adaptJoiSchema;
