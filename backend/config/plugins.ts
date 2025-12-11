export default ({ env }) => ({
  // Upload provider - Cloudinary for production, local for dev
  upload: {
    config: {
      provider: env("CLOUDINARY_NAME") ? "@strapi/provider-upload-cloudinary" : "local",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
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
