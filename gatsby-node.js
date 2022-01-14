exports.createPages = ({ actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: '/',
    toPath: '/stock',
    isPermanent: true,
  })
}
