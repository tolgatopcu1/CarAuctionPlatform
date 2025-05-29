import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdPerson, MdEmail, MdLock, MdSupervisedUserCircle } from 'react-icons/md';
import { FaUserTag } from 'react-icons/fa';
import { fetchRegisterUser } from './accountApi';
import ToastrNotify from '../../app/ToastrNotify';

const inputBase = 'w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500';

const validationSchema = Yup.object({
  userName: Yup.string().required('Email is required'),
  fullName: Yup.string().required('Full name is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  userType: Yup.string()
    .oneOf(['administration', 'Seller', 'NormalUser'], 'Invalid user type')
    .required('User type is required'),
});


export default function RegisterForm() {
  const [formError, setFormError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      userName: '',
      fullName: '',
      password: '',
      userType: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const response = await fetchRegisterUser(values);
      if (!response.isSuccess) {
        setFormError(response.errorMessages?.[0] || 'Kayıt başarısız oldu');
      } else {
        ToastrNotify("Başarıyla Kayıt Oldunuz.", "success");
          navigate("/login")
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-zinc-800 shadow-2xl border border-zinc-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Register</h2>

        {formError && <div className="text-red-400 text-sm mb-4 text-center">{formError}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <MdEmail className="text-indigo-400" /> Email
            </label>
            <input
              type="text"
              name="userName"
              className={inputBase}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.userName}
              placeholder="Email"
            />
            {formik.touched.userName && formik.errors.userName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.userName}</div>
            )}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <MdPerson className="text-indigo-400" /> Ad Soyad
            </label>
            <input
              type="text"
              name="fullName"
              className={inputBase}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.fullName}
              placeholder="Ad Soyad"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.fullName}</div>
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

          <div>
            <label className="flex items-center gap-2 text-sm text-zinc-300">
              <FaUserTag className="text-indigo-400" /> Kullanıcı Tipi
            </label>
            <select
            name="userType"
            className={`${inputBase} bg-zinc-800 text-white`}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userType}
            >
            <option value="" disabled hidden>
                Select
            </option>
            <option value="Seller">Seller</option>
            <option value="NormalUser">Normal User</option>
            </select>
            {formik.touched.userType && formik.errors.userType && (
            <div className="text-red-500 text-xs mt-1">{formik.errors.userType}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}