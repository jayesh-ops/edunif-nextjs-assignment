// pages/addSchool.jsx
import { useForm } from 'react-hook-form';

export default function AddSchool() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    formData.append('image', data.image[0]);

    const res = await fetch('/api/addSchool', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      alert('School added successfully');
      reset(); // Reset the form fields
    } else {
      alert('Error adding school');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add School</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Name</label>
          <input {...register('name', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Address</label>
          <input {...register('address', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.address && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">City</label>
          <input {...register('city', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.city && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">State</label>
          <input {...register('state', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.state && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Contact</label>
          <input type="number" {...register('contact', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.contact && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Email</label>
          <input type="email" {...register('email_id', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.email_id && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">Image</label>
          <input type="file" {...register('image', { required: true })} className="border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:border-indigo-500" />
          {errors.image && <span className="text-red-500 text-sm">This field is required</span>}
        </div>
        <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-200">Submit</button>
      </form>
    </div>
  );
}
