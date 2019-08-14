import { ApolloServer, gql } from "apollo-server";
import { idArg, queryType, stringArg } from "nexus";
import { makePrismaSchema, prismaObjectType } from "nexus-prisma";
import * as path from "path";
import datamodelInfo from "./generated/nexus-prisma";
import { prisma } from "./generated/prisma-client";

const User = prismaObjectType({
  name: "User",
  definition(t) {
    t.prismaFields([
      "id",
      "name",
      "email",
      {
        name: "posts",
        args: [] // remove the arguments from the `posts` field of the `User` type in the Prisma schema
      }
    ]);
  }
});

const Post = prismaObjectType({
  name: "Post",
  definition(t) {
    t.prismaFields(["*"]);
  }
});

const Query = queryType({
  definition(t) {
    t.list.field("feed", {
      type: "Post",
      resolve: (parent, args, ctx) => {
        return ctx.prisma.posts({
          where: { published: true }
        });
      }
    });

    t.list.field("filterPosts", {
      type: "Post",
      args: {
        searchString: stringArg({ nullable: true })
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.posts({
          where: {
            OR: [{ description_contains: searchString }]
          }
        });
      }
    });

    t.field("post", {
      type: "Post",
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.post({ id });
      }
    });
  }
});

const Mutation = prismaObjectType({
  name: "Mutation",
  definition(t) {
    t.field("createUser", {
      type: "User",
      args: {
        name: stringArg(),
        email: stringArg()
      },
      resolve: (parent, { name, email }, ctx) => {
        return ctx.prisma.createUser({
          name,
          email
        });
      }
    });

    t.field("createDraft", {
      type: "Post",
      args: {
        description: stringArg(),
        url: stringArg({ nullable: false }),
        authorEmail: stringArg()
      },
      resolve: (parent, { description, url, authorEmail }, ctx) => {
        return ctx.prisma.createPost({
          description,
          url,
          author: {
            connect: { email: authorEmail }
          }
        });
      }
    });

    t.field("deletePost", {
      type: "Post",
      nullable: true,
      args: {
        id: idArg()
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.deletePost({ id });
      }
    });

    t.field("publish", {
      type: "Post",
      nullable: true,
      args: {
        id: idArg()
      },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.updatePost({
          where: { id },
          data: { published: true }
        });
      }
    });
  }
});

const schema = makePrismaSchema({
  // Provide all the GraphQL types we've implemented
  types: [Query, Mutation, User, Post],

  // Configure the interface to Prisma
  prisma: {
    datamodelInfo,
    client: prisma
  },

  // Specify where Nexus should put the generated files
  outputs: {
    schema: path.join(__dirname, "./generated/schema.graphql"),
    typegen: path.join(__dirname, "./generated/nexus.ts")
  },

  // Configure nullability of input arguments: All arguments are non-nullable by default
  nonNullDefaults: {
    input: false,
    output: false
  },

  // Configure automatic type resolution for the TS representations of the associated types
  typegenAutoConfig: {
    sources: [
      {
        source: path.join(__dirname, "./types.ts"),
        alias: "types"
      }
    ],
    contextType: "types.Context"
  }
});

const engineSettings = {
  apiKey: process.env.PRISMA_ENDPOINT,
  generateClientInfo: ({ request }) => {
    const headers = request.http && request.http.headers;
    if (headers) {
      return {
        clientName: headers["apollo-client-name"],
        clientVersion: headers["apollo-client-version"]
      };
    } else {
      return {
        clientName: "Unknown Client",
        clientVersion: "Unversioned"
      };
    }
  }
};
const __DEV__ = process.env.NODE_ENV === "development";
const ENGINE = __DEV__ ? undefined : engineSettings;

const server = new ApolloServer({
  schema,
  context: { prisma },
  playground: __DEV__,
  introspection: true,
  engine: ENGINE
});

server.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000`)
);
