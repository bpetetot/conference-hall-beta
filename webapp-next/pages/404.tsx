import Link from 'next/link'

import Logo from '../components/atoms/Logo'
import Fullpage from '../components/layout/Fullpage'

const NotFoundPage = () => {
  return (
    <Fullpage>
      <main className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          404 - Page not found
        </h2>
        <div className="text-center mt-6">
          <Link href="/">
            <a className="text-primary-200 hover:text-white text-base">Back to home</a>
          </Link>
        </div>
      </main>
    </Fullpage>
  )
}

export default NotFoundPage
