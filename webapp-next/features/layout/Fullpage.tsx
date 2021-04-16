import React, { ReactNode } from 'react'

type Props = { children?: ReactNode }

const Fullpage = ({ children }: Props) => {
  return (
    <div className="bg-primary-800 min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}

export default Fullpage
