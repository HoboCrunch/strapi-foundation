import path from "path";
import { parse } from "pg-connection-string";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  const connections = {
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          "..",
          "..",
          env("DATABASE_FILENAME", ".tmp/data.db")
        ),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: (() => {
        // Support DATABASE_URL for Railway/Supabase
        const databaseUrl = env("DATABASE_URL");
        if (databaseUrl) {
          const config = parse(databaseUrl);
          return {
            host: config.host,
            port: parseInt(config.port || "5432", 10),
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: env.bool("DATABASE_SSL", true)
              ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false) }
              : false,
          };
        }
        return {
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          ssl: env.bool("DATABASE_SSL", false)
            ? { rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", false) }
            : false,
        };
      })(),
      pool: {
        min: env.int("DATABASE_POOL_MIN", 2),
        max: env.int("DATABASE_POOL_MAX", 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int("DATABASE_CONNECTION_TIMEOUT", 60000),
    },
  };
};
