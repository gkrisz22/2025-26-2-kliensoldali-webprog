import { useState, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { selectToken, setCredentials } from '@/store/authSlice'
import { useLoginMutation } from '@/store/webshopApi'

// Cookie alapú megoldás: ehhez importálnánk a useGetMeQuery-t
// import { useGetMeQuery, useLoginMutation } from '@/store/webshopApi'

interface RequireAuthProps {
  children: ReactNode
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  // Bearer token: a tokent a Redux store-ból olvassuk
  const token = useAppSelector(selectToken)

  // Cookie alapú megoldás: a szerver validálja a sütit, és visszaadja a felhasználót.
  // Újratöltés után is működik, mert a süti a böngészőben marad.
  // const { data: user, isLoading } = useGetMeQuery()
  // if (isLoading) return <main className="max-w-sm mx-auto px-4 py-16"><p className="text-muted-foreground">Ellenőrzés...</p></main>
  // if (!user) return <LoginForm />
  // return <>{children}</>

  if (!token) {
    return <LoginForm />
  }

  return <>{children}</>
}

function LoginForm() {
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const result = await login({ email, password }).unwrap()
      dispatch(setCredentials({ token: result.token, user: result.user }))
    } catch {
      // a hibát az RTK Query `error` state-je kezeli
    }
  }

  return (
    <main className="max-w-sm mx-auto px-4 py-16">
      <h1 className="text-2xl font-bold mb-6">Admin bejelentkezés</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@webshop.dev"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Jelszó</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            required
          />
        </div>
        {error && <p className="text-sm text-destructive">Hibás email vagy jelszó.</p>}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Bejelentkezés...' : 'Bejelentkezés'}
        </Button>
      </form>
    </main>
  )
}

export default RequireAuth
