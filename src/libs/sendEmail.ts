import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const SES_CONFIG = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    },
    region: process.env.AWS_REGION || ''
};

const sesClient = new SESClient(SES_CONFIG);

export const sendEmail = async (email: string, name: string, code: string) => {
    const params = {
        Source: email,
        Destination: {
            ToAddresses: [email]
        },
        ReplyToAddresses: [],
        Message: {
            Body: {
                Html: {
                    Charset: 'UTF-8',
                    Data: `<h1>Este es tu codigo ${code}</h1>`
                },
                Text: {
                    Charset: 'UTF-8',
                    Data: 'Hola body'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: `Hola ${name}`
            }
        }
    };

    try {
        const sendEmailCommand = new SendEmailCommand(params);
        const res = await sesClient.send(sendEmailCommand);
        console.log('Email has been sent ->', res)
    } catch (error) {
        console.error(error);
    }
}

