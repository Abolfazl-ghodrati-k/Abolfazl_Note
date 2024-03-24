import Link from 'next/link'
import React from 'react'

type UnAuthorizedProps = {
  error?: string
}

function UnAuthorized({ error }: UnAuthorizedProps) {
  return (
    <div>
      <p>{error ?? "Unauthorized"}</p>
      <Link href="/" >Go back to login page</Link>
    </div> 
  )
}

export default UnAuthorized