export default ({ env }) => ({
  // Upload provider for Supabase Storage
  upload: {
    config: {
      provider: env("UPLOAD_PROVIDER", "local"),
      providerOptions: {},
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
  // Users & Permissions plugin
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "7d",
      },
    },
  },
});
