import { useEffect } from 'react'

import { Button } from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Logo from '../components/atoms/Logo'
import Fullpage from '../components/layout/Fullpage'
import LoadingPage from '../components/layout/Loading'
import { useAuth } from '../lib/auth'
import { useRedirectNext } from '../lib/useRedirectNext'

const LoginPage = () => {
  const redirectNext = useRedirectNext('/')
  const { isLoading, isAuthenticated, signin, error } = useAuth()

  useEffect(() => {
    if (isAuthenticated) redirectNext()
  }, [isAuthenticated])

  if (isLoading || isAuthenticated) {
    return <LoadingPage />
  }

  return (
    <Fullpage>
      <main className="sm:mx-auto sm:w-full sm:max-w-md">
        <Logo className="mx-auto w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Sign in to your account
        </h2>
        <Card className="mt-8 sm:mx-auto sm:w-full sm:max-w-md space-y-4">
          <h1>Log in with one of the following:</h1>
          <Button primary onClick={() => signin('google')} block>
            Sign in with Google
          </Button>
          <Button primary onClick={() => signin('twitter')} block>
            Sign in with Twitter
          </Button>
          <Button primary onClick={() => signin('github')} block>
            Sign in with GitHub
          </Button>
          {error && <p>{error}</p>}
        </Card>
      </main>
    </Fullpage>
  )
}

export default LoginPage
