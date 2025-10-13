import * as React from "react";

export default function AddCategory() {
  return (
    <main className="p-8">
      <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-2xl font-medium mb-4 md:mb-0">New Category</h3>
        <div>
          <button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer mr-2">
            Discard Changes
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-row gap-6">
        <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Category Image
              </label>
              <div className="mt-2 flex justify-center rounded-lg bg-gray-100 outline-1 -outline-offset-1 outline-gray-300 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" /> */}
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-transparent font-semibold text-indigo-600 focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-indigo-600 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm/6 font-medium">
                Category Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="sku" className="block text-sm/6 font-medium">
                Slug / Code
              </label>
              <div className="mt-2">
                <input
                  id="sku"
                  name="sku"
                  type="text"
                  autoComplete="sku"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm/6 font-medium">
                Parent Category
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option>Medicine</option>
                  <option>Health Supplements</option>
                  <option>Personal Care</option>
                  <option>Medical Equipment</option>
                </select>
              </div>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm/6 font-medium">
                Status
              </label>
              <div className="flex gap-3 mt-2">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      defaultChecked
                      id="auto_generate_barcode"
                      name="auto_generate_barcode"
                      type="checkbox"
                      aria-describedby="auto_generate_barcode-description"
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                    <svg
                      fill="none"
                      viewBox="0 0 14 14"
                      className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                    >
                      <path
                        d="M3 8L6 11L11 3.5"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-checked:opacity-100"
                      />
                      <path
                        d="M3 7H11"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-0 group-has-indeterminate:opacity-100"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm/6">
                  <label
                    htmlFor="auto_generate_barcode"
                    className="font-medium text-gray-900"
                  >
                    Active
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
