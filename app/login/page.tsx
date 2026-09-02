"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useSistema } from "@/components/sistema-provider"
import { ArrowLeft, LayoutGrid } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { iniciarSesion } = useSistema()
  const [correo, setCorreo] = useState("")
  const [contrasena, setContrasena] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const ok = iniciarSesion(correo, contrasena)
    if (ok) {
      router.push("/panel")
    } else {
      setError("Ingresa un correo y una contraseña válidos.")
    }
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Volver al inicio
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <LayoutGrid className="size-6" aria-hidden="true" />
            </div>
            <h1 className="text-xl font-bold text-card-foreground">Iniciar sesión</h1>
            <p className="mt-1 text-sm text-muted-foreground">Accede al panel de administración</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="correo" className="text-sm font-medium text-card-foreground">
                Correo
              </label>
              <input
                id="correo"
                type="email"
                autoComplete="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="admin@sistema.com"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="contrasena" className="text-sm font-medium text-card-foreground">
                Contraseña
              </label>
              <input
                id="contrasena"
                type="password"
                autoComplete="current-password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                placeholder="••••••••"
                className="h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" className="mt-2 w-full">
              Ingresar
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
