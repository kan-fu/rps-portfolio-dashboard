exports.createPages = ({ actions }) => {
  const { createRedirect } = actions
  createRedirect({
    fromPath: '/',
    toPath: '/etf',
    isPermanent: true,
  })
}
