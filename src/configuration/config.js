const Joi = require('joi');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object().keys({ 
    SERVER_PORT: Joi.number().default(8080),
    SECRET_KEY: Joi.string().required(),

}).unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error)
    throw new Error(`Config validation error: ${error.message}`);

    module.exports = {
        serverPort: envVars.SERVER_PORT,

        jwt: {
            secret: envVars.SECRET_KEY,
            accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
            refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
            resetPasswordExpirationMinutes: 10,
            mailVerificationExpirationDays: envVars.JWT_MAIL_VERIFICATION_EXPIRATION_DAYS
        
          
        },


    }