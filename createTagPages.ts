import type { CreatePagesArgs } from 'gatsby';
import path from "path";
import getTags from "./src/gatsby/getTags";
import generateFlattenedList from './src/utils/generateFlattenedList';

export const createTagPages = async ({ graphql, actions }: Pick<CreatePagesArgs, "graphql" | "actions">) => {
  const { createPage } = actions;

  // Run the GraphQL query to get all tags
  const result = await getTags({ graphql, actions })
  if (result.data === undefined) {
    return;
  }
  const tags = generateFlattenedList(result.data)

  Object.entries(tags).map(async ([tag]) => {
    createPage({
      path: `/blog/tag/${tag}`,
      component: path.resolve('./src/templates/tag-template.tsx'),
      context: {
        tag
      },
    })
  });
};
