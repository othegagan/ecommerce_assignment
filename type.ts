declare namespace NodeJS {
    export interface ProcessEnv {
        DATABASE_URL: string;
        MAIL_SERVICE_ID: string;
        MAIL_TEMPLATE_ID: string;
    }
}
