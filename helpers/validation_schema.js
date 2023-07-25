/*
Joi will help us to validate Schema, to validate request body even before hitting the db, otherwise if you have a simple fun api for local use , you can ignore JOI, but if ur building an enterprise grade app, then definitely use JOI/ZOD/Yup, now they recommend ZOD because of automatic type generation.
*/

const Joi = require('@hapi/joi')

const authSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(6).required(),
})

module.exports = {
  authSchema,
}
