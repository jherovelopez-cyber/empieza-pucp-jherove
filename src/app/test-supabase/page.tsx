"use client";

import { useEffect, useState } from "react";

import { createBrowserSupabaseClient } from "@/services/supabase/client";

type Faculty = {
  id: string;
  name: string;
  code: string | null;
  letter: string | null;
};

export default function TestSupabasePage() {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createBrowserSupabaseClient();

        const { data, error } = await supabase
          .from("faculties")
          .select("id, name, code, letter")
          .limit(10);

        if (error) {
          throw error;
        }

        setFaculties(data ?? []);
      } catch (err) {
        console.error("Error completo de Supabase:", err);

        if (err && typeof err === "object") {
            const supabaseError = err as {
            message?: string;
            details?: string;
            hint?: string;
            code?: string;
            };

            const errorMessage = [
            supabaseError.message,
            supabaseError.details,
            supabaseError.hint,
            supabaseError.code
                ? `Código: ${supabaseError.code}`
                : null,
            ]
            .filter(Boolean)
            .join("\n");

            setError(errorMessage || JSON.stringify(err, null, 2));
        } else {
            setError(String(err));
        }
        } finally {
        setLoading(false);
      }
    }

    testConnection();
  }, []);

  if (loading) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">
          Probando conexión con Supabase...
        </h1>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold text-red-600">
          Error de conexión
        </h1>

        <pre className="mt-4 whitespace-pre-wrap">
          {error}
        </pre>
      </main>
    );
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">
        ✅ Conexión con Supabase exitosa
      </h1>

      <p className="mt-2">
        Facultades encontradas: {faculties.length}
      </p>

      <div className="mt-6 space-y-3">
        {faculties.map((faculty) => (
          <div
            key={faculty.id}
            className="rounded-xl border p-4"
          >
            <h2 className="font-semibold">
              {faculty.name}
            </h2>

            <p>Código: {faculty.code ?? "—"}</p>
            <p>Letra: {faculty.letter ?? "—"}</p>
          </div>
        ))}
      </div>

      {faculties.length === 0 && (
        <p className="mt-6">
          La conexión funciona, pero todavía no existen
          facultades registradas.
        </p>
      )}
    </main>
  );
}