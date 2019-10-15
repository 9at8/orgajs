const fs = require(`fs`)
const path = require(`path`)
const mkdirp = require(`mkdirp`)
const withDefaults = require('./utis/default-options')
const { createPages, createIndexPage } = require('./paginate')
const _ = require('lodash/fp')
const reduce = _.reduce.convert({ cap: false })

// Ensure that content directories exist at site-level
exports.onPreBootstrap = ({ store }, themeOptions) => {
  const { program } = store.getState()
  const { contentPath } = withDefaults(themeOptions)

  const dirs = [
    path.join(program.directory, contentPath),
  ]

  dirs.forEach(dir => {
    // debug(`Initializing ${dir} directory`)
    if (!fs.existsSync(dir)) {
      mkdirp.sync(dir)
    }
  })
}

// These templates are simply data-fetching wrappers that import components
const PostTemplate = require.resolve(`./src/templates/post-query`)
const PostsTemplate = require.resolve(`./src/templates/posts-query`)

exports.createPages = async ({ graphql, actions, reporter }, themeOptions) => {
  const { createPage } = actions
  const options = withDefaults(themeOptions)

  const { filter, basePath, pagination, buildIndexPage, buildCategoryIndexPage } = options

  // create note pages
  const result = await graphql(`
  {
    allOrgContent {
      edges {
        node {
          id
          metadata
          fields { slug }
        }
      }
    }
  }`)

  if (result.errors) {
    reporter.panic(result.errors)
  }

  const items = result.data.allOrgContent.edges.filter(e => {
    const { metadata } = e.node
    return reduce((final, v, k) => {
      const d = metadata[k]
      return final && d === v
    }, true)(filter)
  })

  if (buildIndexPage) {
    createIndexPage({
      items,
      createPage,
      pageLength: pagination,
      basePath,
      component: PostsTemplate,
    })
  }


  if (buildCategoryIndexPage) {
    _.flow([
      _.groupBy(_.get('node.metadata.category')),
      _.toPairs,
      _.map(([category, _items]) => {
        // const bp =
        // console.log(category, basePath)
        createIndexPage({
          items: _items,
          createPage,
          pageLength: pagination,
          basePath: path.posix.join(...[basePath, `${category}`]),
          component: PostsTemplate,
        })
      })
    ])(items)
  }


  createPages({
    items,
    createPage,
    getPath: _.get(['fields', 'slug']),
    getId: _.get('id'),
    component: PostTemplate,
  })
}

// Add custom url pathname for blog posts.

exports.onCreateNode = ({ node, actions }, themeOptions) => {
  const { basePath, slug } = withDefaults(themeOptions)
  if (node.internal.type !== `OrgContent`) return
  const { createNodeField } = actions
  const paths = [ basePath ]
        .concat(slug.map(k => _.get(k)(node.metadata)))
        .filter(lpath => lpath)
  createNodeField({
    node,
    name: `slug`,
    value: path.posix.join(...paths),
  })
}
