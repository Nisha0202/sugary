import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const AddMenu = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const questionsPerPage = 4;
  const totalQuestions = 10; // Total number of fields to be paginated
  const pages = Math.ceil(totalQuestions / questionsPerPage);

  const onSubmit = (data) => {
    data.ingredients = data.ingredients.split(',').map(ingredient => ingredient.trim());
    console.log(data);
    // Add your form submission logic here
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setValue('image', file.name); // Set the file name or handle it as needed

      // Create a preview of the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (currentPage < pages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderFormFields = () => {
    const fields = [
      { name: 'title', label: 'Title', type: 'text', required: true },
      { name: 'description', label: 'Description', type: 'textarea', required: true },
      { name: 'pricePerSix', label: 'Price Per Six', type: 'number', required: true },
      { name: 'pricePerTwelve', label: 'Price Per Twelve', type: 'number', required: true },
      { name: 'category', label: 'Category', type: 'select', options: ['Select category', 'Non-Vegan', 'Vegan'], required: true },
      { name: 'weight', label: 'Weight (grams)', type: 'number', required: true },
      { name: 'ingredients', label: 'Ingredients', type: 'text', required: true },
      { name: 'others', label: 'Others', type: 'text' },
      { name: 'image', label: 'Image', type: 'file', required: true }, // Image field moved to the last position
    ];

    return fields
      .slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage)
      .map(field => (
        <div className="relative mb-6" key={field.name}>
          {field.type === 'textarea' ? (
            <textarea
              name={field.name}
              id={field.name}
              {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
              className="block w-full px-4 py-1.5 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer"
              placeholder=" "
            />
          ) : field.type === 'select' ? (
            <select
              name={field.name}
              id={field.name}
              {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
              className="block w-full px-4 py-1.5 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer"
            >
              {field.options.map(option => (
                <option className='py-2.5 text-text' key={option} value={option === 'Select category' ? '' : option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === 'file' ? (
            <>
              <input
                type="file"
                name={field.name}
                id={field.name}
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full px-4 py-1.5 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              />
              {imagePreview && (
                <div className="mt-4 flex w-20 h-20 justify-center">
                  <img src={imagePreview} alt="Image preview" className="max-w-full h-auto rounded-md shadow-md" />
                </div>
              )}
            </>
          ) : (
            <input
              type={field.type}
              name={field.name}
              id={field.name}
              {...register(field.name, { required: field.required ? `${field.label} is required` : false })}
              className="block w-full px-4 py-1.5 text-gray-900 bg-white border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent peer"
              placeholder=" "
            />
          )}
          <label htmlFor={field.name} className="absolute top-0 left-4 px-1 text-gray-500 bg-white transition-all transform -translate-y-1/2 scale-75 origin-top-left peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-focus:scale-75 peer-focus:-translate-y-1/2">
            {field.label}
          </label>
          {errors[field.name] && <p className="tracking-wide text-red-500 text-xs mt-1.5">{errors[field.name].message}</p>}
        </div>
      ));
  };

  return (
    <div className='mt-1 min-h-[calc(100vh-300px)]'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto px-2 py-14 rounded-md text-sm">
        <h2 className="text-xl font-semibold mb-6 text-primary tracking-wider text-center">Add New Cupcake!</h2>
        
        {renderFormFields()}

        <div className="flex justify-between mt-6">
          {currentPage > 0 && (
            <button
              type="button"
              onClick={handlePrevious}
              className="py-2 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Previous
            </button>
          )}
          {currentPage < pages - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="py-2 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="py-2 px-4 bg-gray-100 text-green-600 font-semibold rounded-md hover:bg-gray-300 transition-colors"
            >
              Add
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddMenu;
