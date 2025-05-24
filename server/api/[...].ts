export default defineEventHandler((event) => {
  // Handle Chrome DevTools and other well-known paths gracefully
  if (event.node.req.url?.includes('/.well-known/')) {
    setResponseStatus(event, 404)
    return { error: 'Not Found' }
  }
})