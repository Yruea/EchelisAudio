const localDb = {
  auth: {
    isAuthenticated: async () => false,
    me: async () => null,
    logout: async () => {},
    redirectToLogin: () => {},
  },
  app: {
    getPublicSettings: async () => ({ id: 'local', public_settings: {} }),
  },
  entities: new Proxy(
    {},
    {
      get: () => ({
        filter: async () => [],
        get: async () => null,
        create: async () => ({}),
        update: async () => ({}),
        delete: async () => ({}),
      }),
    }
  ),
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: '' }),
    },
  },
};

export const db = globalThis.__B44_DB__ || localDb;
export const base44 = db;
export default db;
