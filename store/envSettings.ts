type Environment = 'staging' | 'development';

interface EnvironmentSettings {
    apiUrl: string;
    port: number;
    host: string;
}

interface GlobalSettingsType {
    staging: EnvironmentSettings;
    development: EnvironmentSettings;
}

const GlobalSettings: GlobalSettingsType = {
    staging: {
        apiUrl: "https://localhost:44322/",
        port: 3000,
        host: 'localhost'
    },
    development: {
        apiUrl: "https://localhost:44322/",
        port: 10000,
        host: '0.0.0.0'
    }
}

export { GlobalSettings };
export type { Environment };
