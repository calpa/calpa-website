import type { CreatePagesArgs } from 'gatsby';
export const getTagsQuery = `
query getTags {
  allMarkdownRemark(
    filter: {
      fileAbsolutePath: {
        regex: "/content.*/"
      }
    }
  ) {
    edges {
      node {
        frontmatter {
          tags
        }
      }
    }
  }
}
`

type TagsPageQueryResult = {
  readonly allMarkdownRemark: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly frontmatter: {
          readonly tags: ReadonlyArray<string | null> | null
        } | null
      }
    }>
  }
};


async function getTags(props: Pick<CreatePagesArgs, "graphql" | "actions">) {
  const graphql: CreatePagesArgs["graphql"] = props.graphql;
  // Run the GraphQL query to get all the tags
  return await graphql<TagsPageQueryResult>(getTagsQuery)
}

export default getTags