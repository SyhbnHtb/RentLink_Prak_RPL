import { useAuth } from "../contexts/AuthContext";
import AdminLayout from "../components/AdminLayout";
import UserLayout from "../components/UserLayout";

export default function ProfilPengguna() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  // Pilih layout berdasarkan role
  const Layout = isAdmin ? AdminLayout : UserLayout;

  return (
    <Layout title="Profil Pengguna">
      <div className="flex flex-col gap-8 w-full max-w-3xl">

        {/* Avatar & Info */}
        <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-secondary font-bold text-4xl">
              {user?.name?.charAt(0) || "U"}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-gray-900 font-sans text-3xl font-bold">{user?.name || "Pengguna"}</h2>
            <p className="text-gray-500 font-sans text-lg">@{user?.username || "username"}</p>
            <span className={`mt-1 w-fit mx-auto md:mx-0 px-3 py-1 rounded-full text-sm font-medium text-white ${isAdmin ? "bg-primary" : "bg-success"}`}>
              {isAdmin ? "Administrator" : "Penyewa"}
            </span>
          </div>
        </div>

        {/* Form Edit Profil */}
        <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
          <h3 className="text-gray-900 font-sans text-xl font-bold">Edit Profil</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nama</label>
              <input type="text" defaultValue={user?.name || ""} className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Username</label>
              <input type="text" defaultValue={user?.username || ""} className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email</label>
              <input type="email" defaultValue={user?.email || ""} className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nomor Telepon</label>
              <input type="text" placeholder="08xxxxxxxxxx" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer self-end">
            Simpan Perubahan
          </button>
        </div>

        {/* Ganti Password */}
        <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
          <h3 className="text-gray-900 font-sans text-xl font-bold">Ganti Password</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Password Lama</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Password Baru</label>
              <input type="password" placeholder="••••••••" className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50" />
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors cursor-pointer self-end">
            Update Password
          </button>
        </div>

      </div>
    </Layout>
  );
}
