"use client"

import { useEffect, useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSistema } from "@/components/sistema-provider"
import { LayoutGrid, LogOut, Plus, Trash2, Users, X } from "lucide-react"

type Vista = "resumen" | "crear" | "listar"

export default function PanelPage() {
  const router = useRouter()
  const { autenticado, usuarioActual, usuarios, cerrarSesion, crearUsuario, eliminarUsuario } = useSistema()
  const [vista, setVista] = useState<Vista>("resumen")

  useEffect(() => {
    if (!autenticado) router.replace("/login")
  }, [autenticado, router])

  if (!autenticado) return null

  function handleCerrarSesion() {
    cerrarSesion()
    router.replace("/")
  }

  return (
    <div className="min-h-dvh">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutGrid className="size-5" aria-hidden="true" />
            </div>
            <span className="font-semibold text-card-foreground">Sistema de Gestión</span>
          </div>
          <Button variant="ghost" size="sm" onClick={handleCerrarSesion} className="gap-2">
            <LogOut className="size-4" aria-hidden="true" />
            Cerrar sesión
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Bienvenido, {usuarioActual}
        </h1>
        <p className="mt-1 text-muted-foreground">Panel de administración del sistema</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-6 sm:col-span-1">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="size-4" aria-hidden="true" />
              <span className="text-sm font-medium">Usuarios registrados</span>
            </div>
            <p className="mt-3 text-4xl font-bold text-card-foreground">{usuarios.length}</p>
          </div>

          <nav className="grid gap-3 sm:col-span-2 sm:grid-cols-3" aria-label="Acciones del panel">
            <AccionCard
              activo={vista === "crear"}
              onClick={() => setVista("crear")}
              icon={<Plus className="size-5" aria-hidden="true" />}
              label="Crear usuario"
            />
            <AccionCard
              activo={vista === "listar"}
              onClick={() => setVista("listar")}
              icon={<Users className="size-5" aria-hidden="true" />}
              label="Ver usuarios"
            />
            <AccionCard
              activo={false}
              onClick={() => setVista("listar")}
              icon={<Trash2 className="size-5" aria-hidden="true" />}
              label="Eliminar usuario"
            />
          </nav>
        </div>

        <section className="mt-8">
          {vista === "resumen" && (
            <div className="rounded-xl border border-dashed border-border bg-card/50 p-10 text-center">
              <p className="text-muted-foreground">
                Selecciona una acción para comenzar a gestionar los usuarios del sistema.
              </p>
            </div>
          )}
          {vista === "crear" && <CrearUsuarioForm onCrear={crearUsuario} onHecho={() => setVista("listar")} />}
          {vista === "listar" && <ListaUsuarios usuarios={usuarios} onEliminar={eliminarUsuario} />}
        </section>
      </main>
    </div>
  )
}

function AccionCard({
  activo,
  onClick,
  icon,
  label,
}: {
  activo: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        activo
          ? "border-primary bg-accent text-accent-foreground"
          : "border-border bg-card text-card-foreground hover:border-primary/40 hover:bg-accent/40"
      }`}
    >
      <span className={activo ? "text-primary" : "text-muted-foreground"}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </button>
  )
}

function CrearUsuarioForm({
  onCrear,
  onHecho,
}: {
  onCrear: (datos: { nombre: string; correo: string; rol: string }) => void
  onHecho: () => void
}) {
  const [nombre, setNombre] = useState("")
  const [correo, setCorreo] = useState("")
  const [rol, setRol] = useState("Usuario")

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onCrear({ nombre, correo, rol })
    setNombre("")
    setCorreo("")
    setRol("Usuario")
    onHecho()
  }

  const inputClass =
    "h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground outline-none transition-shadow focus-visible:ring-2 focus-visible:ring-ring"

  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold text-card-foreground">Crear usuario</h2>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nombre" className="text-sm font-medium text-card-foreground">
            Nombre
          </label>
          <input
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="nuevo-correo" className="text-sm font-medium text-card-foreground">
            Correo
          </label>
          <input
            id="nuevo-correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="rol" className="text-sm font-medium text-card-foreground">
            Rol
          </label>
          <select id="rol" value={rol} onChange={(e) => setRol(e.target.value)} className={inputClass}>
            <option>Usuario</option>
            <option>Editor</option>
            <option>Administrador</option>
          </select>
        </div>
        <div className="flex items-end">
          <Button type="submit" className="gap-2">
            <Plus className="size-4" aria-hidden="true" />
            Crear usuario
          </Button>
        </div>
      </form>
    </div>
  )
}

function ListaUsuarios({
  usuarios,
  onEliminar,
}: {
  usuarios: { id: number; nombre: string; correo: string; rol: string }[]
  onEliminar: (id: number) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-card-foreground">Usuarios registrados</h2>
        <span className="text-sm text-muted-foreground">{usuarios.length} en total</span>
      </div>
      <ul className="divide-y divide-border">
        {usuarios.length === 0 && (
          <li className="px-6 py-8 text-center text-sm text-muted-foreground">No hay usuarios registrados.</li>
        )}
        {usuarios.map((u) => (
          <li key={u.id} className="flex items-center justify-between gap-4 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground">
                {u.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-card-foreground">{u.nombre}</p>
                <p className="text-sm text-muted-foreground">{u.correo}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground sm:inline">
                {u.rol}
              </span>
              <button
                onClick={() => onEliminar(u.id)}
                className="inline-flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                aria-label={`Eliminar a ${u.nombre}`}
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
