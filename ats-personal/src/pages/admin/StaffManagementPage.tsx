import { useState } from "react";
import MainLayout from "../../components/layout/MainLayout";
import { useStaff } from "../../hooks/useStaff";
import { User, Trash2, Mail, UserPlus, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { Card } from "../../components/ui/Card";

export const StaffManagementPage = () => {
  const { staff, loading, submitting, inviteRecruiter, removeMember } =
    useStaff();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ nombre: "", email: "" });

  const handleCreateStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await inviteRecruiter(newStaff.nombre, newStaff.email);
      toast.success("Reclutador invitado exitosamente");
      setIsModalOpen(false);
      setNewStaff({ nombre: "", email: "" });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error al crear reclutador");
    }
  };

  const handleDeleteStaff = async (id: string) => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas eliminar a este miembro del equipo?",
      )
    ) {
      return;
    }

    try {
      await removeMember(id);
      toast.success("Miembro eliminado");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Gestión de Staff
            </h1>
            <p className="text-zinc-500">
              Administra los accesos de reclutadores y administradores.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20"
          >
            <UserPlus size={20} />
            <span>Invitar Reclutador</span>
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member) => (
              <Card
                key={member.id}
                className="group hover:border-zinc-700 transition-all border-zinc-800 bg-zinc-900/50"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <User size={24} />
                    </div>
                    <button
                      onClick={() => handleDeleteStaff(member.id)}
                      className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {member.nombre}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-zinc-500 mt-1">
                      <Mail size={14} />
                      <span>{member.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-800 mt-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        member.rol === "admin"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-cyan-500/10 text-cyan-500"
                      }`}
                    >
                      {member.rol}
                    </span>
                    <span className="text-xs text-zinc-600 font-mono">
                      Unido: {new Date(member.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Modal Simplificado para Invitar */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <h2 className="text-2xl font-bold text-white mb-2">
                Nuevo Reclutador
              </h2>
              <p className="text-zinc-500 mb-6">
                Se le enviará un correo automático para completar su perfil.
              </p>

              <form onSubmit={handleCreateStaff} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaff.nombre}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, nombre: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="Ej. Maria Garcia"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={newStaff.email}
                    onChange={(e) =>
                      setNewStaff({ ...newStaff, email: e.target.value })
                    }
                    className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-all font-medium"
                    placeholder="maria@empresa.com"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 rounded-xl border border-zinc-800 text-zinc-400 hover:bg-zinc-800 transition-all font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl font-bold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <Loader2 className="animate-spin" size={20} />
                    ) : (
                      "Invitar"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
