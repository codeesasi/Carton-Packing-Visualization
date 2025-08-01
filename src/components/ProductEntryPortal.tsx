import { useState } from "react";
import AddressForm, { AddressData } from "./AddressForm";

interface ProductData {
  name: string;
  orderNumber: string;
  fromAddress: AddressData;
  toAddress: AddressData;
  price: number;
  category: string;
  brand: string;
  sku: string;
  quantity: number;
  images: string[];
  specifications: { [key: string]: string };
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: string;
    weightUnit: string;
  };
}

const ProductEntryPortal: React.FC = () => {
  const [productData, setProductData] = useState<ProductData>({
    name: "",
    orderNumber: "",
    fromAddress: {
      name: "",
      company: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      email: "",
    },
    toAddress: {
      name: "",
      company: "",
      street1: "",
      street2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
      email: "",
    },
    price: 0,
    category: "",
    brand: "",
    sku: "",
    quantity: 0,
    images: [],
    specifications: {},
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
      weight: 0,
      unit: "in",
      weightUnit: "lb",
    },
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [accordionState, setAccordionState] = useState({
    basicInfo: true,
    pricing: true,
    dimensions: false,
    additional: false,
  });

  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Other",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name.startsWith("dimensions.")) {
      const dimensionField = name.split(".")[1];
      setProductData((prev) => ({
        ...prev,
        dimensions: {
          ...prev.dimensions,
          [dimensionField]:
            dimensionField === "unit" || dimensionField === "weightUnit"
              ? value
              : parseFloat(value) || 0,
        },
      }));
    } else {
      setProductData((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "quantity"
            ? parseFloat(value) || 0
            : value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!productData.name.trim()) newErrors.name = "Product name is required";
    if (!productData.orderNumber.trim())
      newErrors.orderNumber = "Order number is required";
    
    // Validate from address
    if (!productData.fromAddress.name.trim()) newErrors["fromAddress.name"] = "Sender name is required";
    if (!productData.fromAddress.street1.trim()) newErrors["fromAddress.street1"] = "Sender street address is required";
    if (!productData.fromAddress.city.trim()) newErrors["fromAddress.city"] = "Sender city is required";
    if (!productData.fromAddress.state.trim()) newErrors["fromAddress.state"] = "Sender state is required";
    if (!productData.fromAddress.zipCode.trim()) newErrors["fromAddress.zipCode"] = "Sender ZIP code is required";
    if (!productData.fromAddress.country.trim()) newErrors["fromAddress.country"] = "Sender country is required";
    if (!productData.fromAddress.phone.trim()) newErrors["fromAddress.phone"] = "Sender phone is required";
    if (!productData.fromAddress.email.trim()) newErrors["fromAddress.email"] = "Sender email is required";
    
    // Validate to address
    if (!productData.toAddress.name.trim()) newErrors["toAddress.name"] = "Recipient name is required";
    if (!productData.toAddress.street1.trim()) newErrors["toAddress.street1"] = "Recipient street address is required";
    if (!productData.toAddress.city.trim()) newErrors["toAddress.city"] = "Recipient city is required";
    if (!productData.toAddress.state.trim()) newErrors["toAddress.state"] = "Recipient state is required";
    if (!productData.toAddress.zipCode.trim()) newErrors["toAddress.zipCode"] = "Recipient ZIP code is required";
    if (!productData.toAddress.country.trim()) newErrors["toAddress.country"] = "Recipient country is required";
    if (!productData.toAddress.phone.trim()) newErrors["toAddress.phone"] = "Recipient phone is required";
    if (!productData.toAddress.email.trim()) newErrors["toAddress.email"] = "Recipient email is required";
    
    if (productData.price <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!productData.category) newErrors.category = "Category is required";
    if (!productData.sku.trim()) newErrors.sku = "SKU is required";
    if (productData.quantity < 0)
      newErrors.quantity = "Quantity cannot be negative";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Product submitted:", productData);
      alert("Product added successfully!");

      // Reset form
      setProductData({
        name: "",
        orderNumber: "",
        fromAddress: {
          name: "",
          company: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phone: "",
          email: "",
        },
        toAddress: {
          name: "",
          company: "",
          street1: "",
          street2: "",
          city: "",
          state: "",
          zipCode: "",
          country: "",
          phone: "",
          email: "",
        },
        price: 0,
        category: "",
        brand: "",
        sku: "",
        quantity: 0,
        images: [],
        specifications: {},
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
          weight: 0,
          unit: "in",
          weightUnit: "lb",
        },
      });
    } catch (error) {
      alert("Error submitting product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleAccordion = (section: keyof typeof accordionState) => {
    setAccordionState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleFromAddressChange = (address: AddressData) => {
    setProductData(prev => ({
      ...prev,
      fromAddress: address
    }));
    
    // Clear related errors
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith("fromAddress.")) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  const handleToAddressChange = (address: AddressData) => {
    setProductData(prev => ({
      ...prev,
      toAddress: address
    }));
    
    // Clear related errors
    setErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(key => {
        if (key.startsWith("toAddress.")) {
          delete newErrors[key];
        }
      });
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">
              Product Entry Portal
            </h1>
            <p className="text-blue-100 mt-1">
              Add new product details to the inventory
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Basic Information Accordion */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleAccordion("basicInfo")}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">
                  Basic Information
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    accordionState.basicInfo ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {accordionState.basicInfo && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter product name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Order Number *
                      </label>
                      <input
                        type="text"
                        name="orderNumber"
                        value={productData.orderNumber}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.orderNumber ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter order number"
                      />
                      {errors.orderNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.orderNumber}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <AddressForm
                        title="Origin"
                        addressData={productData.fromAddress}
                        onAddressChange={handleFromAddressChange}
                        errors={Object.keys(errors).reduce((acc, key) => {
                          if (key.startsWith("fromAddress.")) {
                            acc[key.replace("fromAddress.", "")] = errors[key];
                          }
                          return acc;
                        }, {} as { [key: string]: string })}
                        required={true}
                      />
                      {errors.fromAddress && (
                        <p className="text-red-500 text-sm mt-1">{errors.fromAddress}</p>
                      )}
                    </div>

                    <div>
                      <AddressForm
                        title="Destination"
                        addressData={productData.toAddress}
                        onAddressChange={handleToAddressChange}
                        errors={Object.keys(errors).reduce((acc, key) => {
                          if (key.startsWith("toAddress.")) {
                            acc[key.replace("toAddress.", "")] = errors[key];
                          }
                          return acc;
                        }, {} as { [key: string]: string })}
                        required={true}
                      />
                      {errors.toAddress && (
                        <p className="text-red-500 text-sm mt-1">{errors.toAddress}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU *
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={productData.sku}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.sku ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Enter SKU"
                      />
                      {errors.sku && (
                        <p className="text-red-500 text-sm mt-1">{errors.sku}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                      </label>
                      <input
                        type="text"
                        name="brand"
                        value={productData.brand}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter brand name"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Pricing & Inventory Accordion */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleAccordion("pricing")}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">
                  Pricing & Inventory
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    accordionState.pricing ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {accordionState.pricing && (
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price * ($)
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={productData.price || ""}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.price ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0.00"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={productData.category}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.category ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantity
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        value={productData.quantity || ""}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.quantity ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="0"
                      />
                      {errors.quantity && (
                        <p className="text-red-500 text-sm mt-1">{errors.quantity}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dimensions Accordion */}
            <div className="border border-gray-200 rounded-lg">
              <button
                type="button"
                onClick={() => toggleAccordion("dimensions")}
                className="w-full px-4 py-3 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 flex items-center justify-between"
              >
                <span className="font-medium text-gray-900">Product Dimensions</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    accordionState.dimensions ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {accordionState.dimensions && (
                <div className="p-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Length
                      </label>
                      <input
                        type="number"
                        name="dimensions.length"
                        value={productData.dimensions.length || ""}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Width
                      </label>
                      <input
                        type="number"
                        name="dimensions.width"
                        value={productData.dimensions.width || ""}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Height
                      </label>
                      <input
                        type="number"
                        name="dimensions.height"
                        value={productData.dimensions.height || ""}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Unit
                      </label>
                      <select
                        name="dimensions.unit"
                        value={productData.dimensions.unit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="cm">cm</option>
                        <option value="in">inches</option>
                        <option value="mm">mm</option>
                        <option value="ft">feet</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight
                      </label>
                      <input
                        type="number"
                        name="dimensions.weight"
                        value={productData.dimensions.weight || ""}
                        onChange={handleInputChange}
                        step="0.1"
                        min="0"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="0.0"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weight Unit
                      </label>
                      <select
                        name="dimensions.weightUnit"
                        value={productData.dimensions.weightUnit}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="kg">kg</option>
                        <option value="lb">pounds</option>
                        <option value="g">grams</option>
                        <option value="oz">ounces</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Dimensions Preview:</span>{" "}
                      {productData.dimensions.length || 0} ×{" "}
                      {productData.dimensions.width || 0} ×{" "}
                      {productData.dimensions.height || 0}{" "}
                      {productData.dimensions.unit}
                      {productData.dimensions.weight > 0 && (
                        <>
                          , Weight: {productData.dimensions.weight}{" "}
                          {productData.dimensions.weightUnit}
                        </>
                      )}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    setProductData({
                      name: "",
                      orderNumber: "",
                      fromAddress: {
                        name: "",
                        company: "",
                        street1: "",
                        street2: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        country: "",
                        phone: "",
                        email: "",
                      },
                      toAddress: {
                        name: "",
                        company: "",
                        street1: "",
                        street2: "",
                        city: "",
                        state: "",
                        zipCode: "",
                        country: "",
                        phone: "",
                        email: "",
                      },
                      price: 0,
                      category: "",
                      brand: "",
                      sku: "",
                      quantity: 0,
                      images: [],
                      specifications: {},
                      dimensions: {
                        length: 0,
                        width: 0,
                        height: 0,
                        weight: 0,
                        unit: "in",
                        weightUnit: "lb",
                      },
                    });
                    setErrors({});
                  }}
                >
                  Reset
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-6 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting ? "Adding Product..." : "Add Product"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEntryPortal;
