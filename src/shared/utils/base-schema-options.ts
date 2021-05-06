export const baseSchemaOptions = {
  toObject: {
    virtuals: true, transform: (obj, res, options) => {
      const { _id, ...rest } = res;
      return rest
    }
  },
  toJSON: {
    virtuals: true, transform: (obj, res, options) => {
      const { _id, ...rest } = res;
      return rest
    }
  }
};
