import { useState } from "react";

export interface AddressData {
  name: string;
  company: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}

interface AddressFormProps {
  title: string;
  addressData: AddressData;
  onAddressChange: (address: AddressData) => void;
  errors?: { [key: string]: string };
  required?: boolean;
}

const AddressForm: React.FC<AddressFormProps> = ({
  title,
  addressData,
  onAddressChange,
  errors = {},
  required = false
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onAddressChange({
      ...addressData,
      [name]: value
    });
  };

  const countries = [
    "United States",
    "Canada", 
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Other"
  ];

  const usStates = [
    "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
    "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
    "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
    "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
    "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
  ];

  const getTruckIcon = () => {
    if (title.toLowerCase().includes('from') || title.toLowerCase().includes('origin')) {
      return (
        <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8 5a1 1 0 100 2h5.586l-1.293 1.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L13.586 5H8zM12 15a1 1 0 100-2H6.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L6.414 15H12z"/>
        </svg>
      );
    } else if (title.toLowerCase().includes('to') || title.toLowerCase().includes('destination')) {
      return (
        <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 text-gray-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
      </svg>
    );
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {getTruckIcon()}
          <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        </div>
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {isCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
      
      {!isCollapsed && (
        <div className="space-y-6">
          {/* Name and Company */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  Full Name 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <input
                type="text"
                name="name"
                value={addressData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.name ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter full name"
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company (Optional)
              </label>
              <input
                type="text"
                name="company"
                value={addressData.company}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                placeholder="Enter company name"
              />
            </div>
          </div>

          {/* Street Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                Street Address 
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
            <div className="space-y-3">
              <input
                type="text"
                name="street1"
                value={addressData.street1}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.street1 ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Street address line 1"
              />
              {errors.street1 && (
                <p className="text-red-600 text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.street1}
                </p>
              )}
              <input
                type="text"
                name="street2"
                value={addressData.street2}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent hover:border-gray-400 transition-all duration-200"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
          </div>

          {/* City, State, ZIP */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  City 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <input
                type="text"
                name="city"
                value={addressData.city}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.city ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter city"
              />
              {errors.city && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.city}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  State 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <select
                name="state"
                value={addressData.state}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.state ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <option value="">Select state</option>
                {usStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.state}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  ZIP Code 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <input
                type="text"
                name="zipCode"
                value={addressData.zipCode}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.zipCode ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="Enter ZIP code"
                maxLength={10}
              />
              {errors.zipCode && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.zipCode}
                </p>
              )}
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="flex items-center">
                Country 
                {required && <span className="text-red-500 ml-1">*</span>}
              </span>
            </label>
            <select
              name="country"
              value={addressData.country}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                errors.country ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <option value="">Select country</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
            {errors.country && (
              <p className="text-red-600 text-sm mt-2 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.country}
              </p>
            )}
          </div>

          {/* Phone and Email */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  Phone Number 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <input
                type="tel"
                name="phone"
                value={addressData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.phone ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="(555) 123-4567"
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <span className="flex items-center">
                  Email Address 
                  {required && <span className="text-red-500 ml-1">*</span>}
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={addressData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                  errors.email ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-gray-400"
                }`}
                placeholder="example@email.com"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-2 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
