import Link from 'next/link'

export const components = {
  a: ({ href, children, ...props }) => {
    // External links - use regular <a> tag
    if (href?.startsWith('http') || href?.startsWith('mailto:')) {
      return (
        <a 
          href={href} 
          className="text-[#803635] hover:text-[#6B2D2C] hover:underline"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      )
    }
    
    // Internal links - use Next.js Link
    return (
      <Link 
        href={href || '#'} 
        className="text-[#803635] hover:text-[#6B2D2C] hover:underline"
        {...props}
      >
        {children}
      </Link>
    )
  }
}