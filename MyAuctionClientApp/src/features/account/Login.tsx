import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdEmail, MdLock } from 'react-icons/md';
import { fetchLoginUser } from './accountApi'; // API fonksiyonun varsa buna göre ayarla

const inputBase =
  'w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

const validationSchema = Yup.object({
  userName: Yup.string().email('Geçerli bir email girin').required('Email zorunludur'),
  password: Yup.string().required('Şifre zorunludur'),
});

export default function LoginForm() {
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetchLoginUser(values);

      if (!response.isSuccess) {
        setFormError(response.errorMessages?.[0] || 'Giriş başarısız oldu');
      } else {
        const token = response.result?.token;
        if (token) {
          localStorage.setItem("token", token);
        }

        window.location.href = "/vehicles";
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-800 shadow-2xl border border-zinc-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Giriş Yap</h2>

        {formError && <div className="text-red-400 text-sm mb-4 text-center">{formError}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <MdEmail className="text-indigo-400" /> E-posta
            </label>
            <input
              type="text"
              name="userName"
              className={inputBase}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder="E-posta"
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.userName}</div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <MdLock className="text-indigo-400" /> Parola
            </label>
            <input
              type="password"
              name="password"
              className={inputBase}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Parola"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Login
          </button>
        </form>

        {/* Kayıt Ol Linki */}
        <div className="mt-6 text-center text-sm text-zinc-400">
          Henüz hesabınız yok mu?{' '}
          <Link
            to="/register"
            className="text-indigo-500 hover:underline font-medium"
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}
