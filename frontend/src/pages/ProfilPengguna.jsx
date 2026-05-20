import { useAuth } from "../contexts/AuthContext";
import AdminLayout from "../components/AdminLayout";
import UserLayout from "../components/UserLayout";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import api from "../services/api";

export default function ProfilPengguna() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const Layout = isAdmin ? AdminLayout : UserLayout;

  // Profile state
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    ktp: "",
    asal: "",
  });
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Password state
  const [passwords, setPasswords] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoadingProfile(true);
      try {
        const response = await api.get("/profile/me");
        if (response.data.success) {
          const p = response.data.data;
          setProfile({
            name: p.name || "",
            email: p.email || "",
            phone: p.phone || "",
            ktp: p.ktp || "",
            asal: p.asal || "",
          });
        }
      } catch (error) {
        console.error("Gagal mengambil profil:", error);
        toast.error("Gagal memuat profil.");
      } finally {
        setIsLoadingProfile(false);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileChange = (field, value) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profile.name || !profile.email) {
      toast.error("Nama dan email wajib diisi!");
      return;
    }
    setIsSavingProfile(true);
    try {
      const response = await api.put("/profile/me", profile);
      if (response.data.success) {
        toast.success("Profil berhasil diperbarui!");
        // Update localStorage user data
        const storedUser = localStorage.getItem("rentlink_user");
        if (storedUser) {
          const parsed = JSON.parse(storedUser);
          parsed.name = profile.name;
          parsed.email = profile.email;
          localStorage.setItem("rentlink_user", JSON.stringify(parsed));
        }
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal memperbarui profil.";
      toast.error(msg);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwords.old_password || !passwords.new_password || !passwords.confirm_password) {
      toast.error("Semua field password wajib diisi!");
      return;
    }
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error("Konfirmasi password tidak cocok!");
      return;
    }
    if (passwords.new_password.length < 6) {
      toast.error("Password baru minimal 6 karakter!");
      return;
    }
    setIsSavingPassword(true);
    try {
      const response = await api.put("/profile/change-password", passwords);
      if (response.data.success) {
        toast.success("Password berhasil diganti!");
        setPasswords({ old_password: "", new_password: "", confirm_password: "" });
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Gagal mengganti password.";
      toast.error(msg);
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <Layout title="Profil Pengguna">
      <div className="flex flex-col gap-8 w-full max-w-3xl relative">

        {isLoadingProfile && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-10 flex items-center justify-center min-h-[300px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Avatar & Info */}
        <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center shrink-0">
            <span className="text-secondary font-bold text-4xl">
              {profile.name?.charAt(0)?.toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-center md:text-left">
            <h2 className="text-gray-900 font-sans text-3xl font-bold">{profile.name || "Pengguna"}</h2>
            <p className="text-gray-500 font-sans text-lg">{profile.email}</p>
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
              <input
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange("name", e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange("email", e.target.value)}
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Nomor Telepon</label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => handleProfileChange("phone", e.target.value)}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">No. KTP</label>
              <input
                type="text"
                value={profile.ktp}
                onChange={(e) => handleProfileChange("ktp", e.target.value)}
                placeholder="Nomor KTP"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Asal</label>
              <input
                type="text"
                value={profile.asal}
                onChange={(e) => handleProfileChange("asal", e.target.value)}
                placeholder="Kota asal"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={isSavingProfile}
            className="w-full md:w-auto px-8 py-3 bg-primary hover:bg-primary/90 text-white font-bold rounded-full transition-colors cursor-pointer self-end disabled:opacity-50"
          >
            {isSavingProfile ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

        {/* Ganti Password */}
        <div className="bg-surface rounded-2xl border border-gray-100 shadow-md p-8 flex flex-col gap-6">
          <h3 className="text-gray-900 font-sans text-xl font-bold">Ganti Password</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Password Lama</label>
              <input
                type="password"
                value={passwords.old_password}
                onChange={(e) => handlePasswordChange("old_password", e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Password Baru</label>
              <input
                type="password"
                value={passwords.new_password}
                onChange={(e) => handlePasswordChange("new_password", e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-primary/70 text-xs font-bold uppercase tracking-wider">Konfirmasi Password Baru</label>
              <input
                type="password"
                value={passwords.confirm_password}
                onChange={(e) => handlePasswordChange("confirm_password", e.target.value)}
                placeholder="••••••••"
                className="w-full bg-gray-100 border-none rounded-xl px-4 py-3 text-gray-800 font-sans outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            disabled={isSavingPassword}
            className="w-full md:w-auto px-8 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold rounded-full transition-colors cursor-pointer self-end disabled:opacity-50"
          >
            {isSavingPassword ? "Memproses..." : "Update Password"}
          </button>
        </div>

      </div>
    </Layout>
  );
}
