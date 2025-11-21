import Link from "next/link";
import * as React from "react";

export default function AddProduct() {
  return (
    <main className="p-4 md:p-8">
      <div className="w-full bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between items-center">
        <h3 className="text-2xl font-medium mb-4 md:mb-0">New Product</h3>
        <div className="flex flex-row gap-4">
          <button className="bg-transparent hover:bg-red-500 text-red-500 hover:text-white border border-red-500 px-2 py-1 rounded-md cursor-pointer mr-2">
            Discard Changes
          </button>
          <button className="bg-[#615cf6] hover:bg-transparent text-white hover:text-[#615cf6] border border-[#615cf6] px-2 py-1 rounded-md cursor-pointer">
            Save
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:gap-6">
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-md p-6 mt-6 md:my-6">
          <h3 className="text-2xl font-medium">General Information</h3>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Product Image
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
                Product Name
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
                SKU / Barcode
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
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  defaultValue={""}
                />
              </div>
              <p className="mt-3 text-sm/6 text-gray-600">
                Write a few sentences about the product.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
            <h3 className="text-2xl font-medium">Pricing & Stock</h3>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="cost_price"
                  className="block text-sm/6 font-medium"
                >
                  Cost Price
                </label>
                <div className="mt-2">
                  <input
                    id="cost_price"
                    name="cost_price"
                    type="text"
                    autoComplete="cost_price"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="selling_price"
                  className="block text-sm/6 font-medium"
                >
                  Selling Price
                </label>
                <div className="mt-2">
                  <input
                    id="selling_price"
                    name="selling_price"
                    type="text"
                    autoComplete="selling_price"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="stock_qty"
                  className="block text-sm/6 font-medium"
                >
                  Initial Stock Quantity
                </label>
                <div className="mt-2">
                  <input
                    id="stock_qty"
                    name="stock_qty"
                    type="text"
                    autoComplete="stock_qty"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="low_stock_alert"
                  className="block text-sm/6 font-medium"
                >
                  Low Stock Alert Level
                </label>
                <div className="mt-2">
                  <input
                    id="low_stock_alert"
                    name="low_stock_alert"
                    type="text"
                    autoComplete="low_stock_alert"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-2xl shadow-md p-6 my-6">
            <h3 className="text-2xl font-medium">Categorization</h3>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="category"
                  className="block text-sm/6 font-medium"
                >
                  Category
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
                <div className="mt-2">
                  <Link
                    href="/dashboard/categories/add"
                    className="text-indigo-600 hover:text-indigo-500 text-sm/6"
                  >
                    Add New Category
                  </Link>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="brand" className="block text-sm/6 font-medium">
                  Brand
                </label>
                <div className="mt-2">
                  <input
                    id="brand"
                    name="brand"
                    type="text"
                    autoComplete="brand"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label htmlFor="tags" className="block text-sm/6 font-medium">
                  Tags
                </label>
                <div className="mt-2">
                  <input
                    id="tags"
                    name="tags"
                    type="text"
                    autoComplete="tags"
                    className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-2xl font-medium">Advance</h3>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="Variation" className="block text-sm/6 font-medium">
              Variations
            </label>
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    defaultChecked
                    id="enable_variations"
                    name="enable_variations"
                    type="checkbox"
                    aria-describedby="enable_variations-description"
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
                  htmlFor="enable_variations"
                  className="font-medium text-gray-900"
                >
                  Enable Variations
                </label>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1">
              <label
                htmlFor="custom_barcode"
                className="block text-sm/6 font-medium"
              >
                Add Variation Attributes
              </label>
              <div className="border border-gray-300 rounded-lg mt-2 p-4 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <div>
                    <label
                      htmlFor="variation_attribute"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Attribute
                    </label>
                    <input
                      id="variation_attribute"
                      name="variation_attribute"
                      type="text"
                      placeholder="e.g., Size, Color, Weight"
                      className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="variation_values"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Values
                    </label>
                    <input
                      id="variation_values"
                      name="variation_values"
                      type="text"
                      placeholder="Comma-separated or add chips"
                      className="mt-1 block w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                </div>
                <button className="bg-[#615cf6] hover:bg-transparent text-sm text-white hover:text-[#615cf6] border border-[#615cf6] mt-4 px-2 py-1 rounded-md cursor-pointer">
                  Add Attribute
                </button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="auto_generate_barcode"
              className="block text-sm/6 font-medium"
            >
              Barcode
            </label>
            <div className="flex gap-3">
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
                  Auto-generate Barcode
                </label>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1">
              <label
                htmlFor="custom_barcode"
                className="block text-sm/6 font-medium"
              >
                Custom Barcode
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="custom_barcode"
                  name="custom_barcode"
                  type="text"
                  autoComplete="off"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder="Enter custom barcode"
                />
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-md text-sm font-medium"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-3">
            <label
              htmlFor="tax_setting"
              className="block text-sm/6 font-medium"
            >
              Tax Settings
            </label>
            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    defaultChecked
                    id="tax_setting"
                    name="tax_setting"
                    type="checkbox"
                    aria-describedby="tax_setting-description"
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
                  htmlFor="tax_setting"
                  className="font-medium text-gray-900"
                >
                  Enable Tax
                </label>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1">
              <label htmlFor="tax_type" className="block text-sm/6 font-medium">
                Tax Type
              </label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  id="tax_type"
                  name="tax_type"
                  autoComplete="tax-type"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="GST">GST</option>
                  <option value="VAT">VAT</option>
                  <option value="Sales Tax">Sales Tax</option>
                </select>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-1">
              <label
                htmlFor="tax_percentage"
                className="block text-sm/6 font-medium"
              >
                Tax Percentage (%)
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="tax_percentage"
                  name="tax_percentage"
                  type="text"
                  autoComplete="off"
                  className="block w-full rounded-md bg-gray-100 px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
                  placeholder="Enter tax percentage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
