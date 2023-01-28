export type DataType = {
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

function generateFlattenedList(data: DataType) {
    let tagCount: { [key: string]: number } = {};
    data.allMarkdownRemark.edges.forEach(edge => {
        if (edge?.node?.frontmatter?.tags) {
            edge.node.frontmatter.tags.forEach(tag => {
                if (tag === null) {
                    return;
                }
                if (!tagCount[tag]) {
                    tagCount[tag] = 1;
                } else {
                    tagCount[tag]++;
                }
            });
        }
    });

    return tagCount;
}

export default generateFlattenedList