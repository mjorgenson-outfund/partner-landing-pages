const path = require("path")

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const landingPages = await graphql(`
    query landingPages {
      allLandingPagesYaml {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `)

  if (landingPages.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query')
  }

  const createLandingPages = landingPages.data.allLandingPagesYaml.edges

  createLandingPages.forEach(({ node }, index) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve(`./src/components/LandingPageLayout.js`),
      context: { pageId: node.id },
    })
  })
}
