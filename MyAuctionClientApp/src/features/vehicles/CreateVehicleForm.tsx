import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MdDirectionsCar, MdImage } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getUserFromToken } from '../../utils/auth';

const CreateVehicleForm = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const userId = user?.nameid || '';
  const [formError, setFormError] = useState('');

  const formik = useFormik({
    initialValues: {
      brandAndModel: '',
      color: '',
      manufacturingYear: '',
      engineCapacity: '',
      price: '',
      milage: '',
      plateNumber: '',
      additionalInformation: '',
      file: null,
    },
    validationSchema: Yup.object({
      brandAndModel: Yup.string().required('Zorunlu'),
      color: Yup.string().required('Zorunlu'),
      manufacturingYear: Yup.number().required('Zorunlu'),
      engineCapacity: Yup.number().required('Zorunlu'),
      price: Yup.number().required('Zorunlu'),
      milage: Yup.number().required('Zorunlu'),
      plateNumber: Yup.string().required('Zorunlu'),
      additionalInformation: Yup.string(),
      file: Yup.mixed().required('Görsel zorunludur'),
    }),
        onSubmit: async (values) => {
    try {
        const formData = new FormData();
        formData.append('BrandAndModel', values.brandAndModel);
        formData.append('Color', values.color);
        formData.append('ManufacturingYear', values.manufacturingYear.toString());
        formData.append('EngineCapacity', values.engineCapacity.toString().replace(',', '.'));
        formData.append('Price', values.price.toString());
        formData.append('Milage', values.milage.toString());
        formData.append('PlateNumber', values.plateNumber);
        formData.append('AuctionPrice', "50");
        formData.append('AdditionalInformation', values.additionalInformation);
        formData.append('StartTime', new Date().toISOString()); // ISO string olmalı
        formData.append('EndTime', new Date(Date.now() + 5 * 60 * 1000).toISOString());
        formData.append('IsActive', 'false'); // string olarak gönderilmeli
        formData.append('Image', ''); // backend'de zaten dolduruluyor
        formData.append('SellerId', userId); // string olmalı

        // file null değilse ekle
        if (values.file) {
        formData.append('File', values.file);
        }

        const response = await axios.post('http://localhost:5139/Vehicle/CreateVehicle', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (response.data.isSuccess) {
        navigate('/vehicles');
        } else {
        setFormError('Araç oluşturulamadı: ' + response.data.errorMessages.join(', '));
        }
    } catch (error) {
        setFormError('Bir hata oluştu. Lütfen tekrar deneyin.');
        console.error(error);
    }
    }

  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-4">
      <div className="w-full max-w-xl p-8 rounded-2xl bg-zinc-800 shadow-2xl border border-zinc-700">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Araç Oluştur</h2>

        {formError && <div className="text-red-400 text-sm mb-4 text-center">{formError}</div>}

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {[
            { name: 'brandAndModel', label: 'Marka & Model' },
            { name: 'color', label: 'Renk' },
            { name: 'manufacturingYear', label: 'Üretim Yılı', type: 'number' },
            { name: 'engineCapacity', label: 'Motor Hacmi (cc)', type: 'number' },
            { name: 'price', label: 'Fiyat (₺)', type: 'number' },
            { name: 'milage', label: 'Kilometre', type: 'number' },
            { name: 'plateNumber', label: 'Plaka' },
            { name: 'additionalInformation', label: 'Ek Bilgi' },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm text-zinc-300 mb-1">{field.label}</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={(formik.values as any)[field.name]}
                className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 focus:outline-none"
              />
              {(formik.touched as any)[field.name] && (formik.errors as any)[field.name] && (
                <div className="text-red-500 text-xs mt-1">{(formik.errors as any)[field.name]}</div>
              )}
            </div>
          ))}

          {/* File Upload */}
          <div>
            <label className="block text-sm text-zinc-300 mb-1 flex items-center gap-2">
              <MdImage className="text-indigo-400" /> Araç Görseli
            </label>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => formik.setFieldValue('file', e.currentTarget.files?.[0])}
              className="w-full px-4 py-2 rounded-lg bg-zinc-700 text-white file:bg-indigo-600 file:text-white file:border-0 file:py-2 file:px-4 file:rounded-lg"
            />
            {formik.touched.file && formik.errors.file && (
              <div className="text-red-500 text-xs mt-1">{formik.errors.file}</div>
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-semibold py-3 rounded-xl shadow-lg"
          >
            Aracı Oluştur
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateVehicleForm;
