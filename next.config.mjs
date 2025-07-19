import nextra from 'nextra'

// Set up Nextra with its configuration
const withNextra = nextra({
  // ... Add Nextra-specific options here
  latex: true,
})

// Export the final Next.js config with Nextra included
export default withNextra({
  // ... Add regular Next.js options here
})