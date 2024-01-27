const Joi = require('joi');

const PlaylistsPayloadSchema = Joi.object({
  name: Joi.string(),
});

module.exports = { PlaylistsPayloadSchema };
