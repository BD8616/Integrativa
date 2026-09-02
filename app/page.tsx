import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutGrid, ShieldCheck, Users } from "lucide-react"

export default function HomePage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/25">
          <LayoutGrid className="size-8" aria-hidden="true" />
        </div>

        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Sistema informático
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Sistema de Gestión
        </h1>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
          Plataforma central para administrar usuarios, controlar accesos y gestionar la información de tu organización.
        </p>

        <div className="mt-8">
          <Button render={<Link href="/login" />} nativeButton={false} size="lg" className="px-8 text-base">
            Iniciar sesión
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5 text-left">
            <Users className="mb-3 size-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold text-card-foreground">Gestión de usuarios</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Crea, consulta y elimina usuarios registrados en el sistema.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5 text-left">
            <ShieldCheck className="mb-3 size-5 text-primary" aria-hidden="true" />
            <h2 className="font-semibold text-card-foreground">Acceso seguro</h2>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              Inicio de sesión protegido con panel de administración privado.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
