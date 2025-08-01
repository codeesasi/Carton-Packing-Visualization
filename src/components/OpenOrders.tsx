import { useState, useEffect } from 'react';
import OrderCard from './OrderCard';
import OrderTable from './OrderTable';
import OrderKanban from './OrderKanban';
import OrderTimeline from './OrderTimeline';
import LoadingSpinner from './LoadingSpinner';
import Toast from './Toast';

export interface Order {
  id: string;
  orderNumber: string;
  productName: string;
  customerName: string;
  customerEmail: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdDate: string;
  estimatedDelivery: string;
  totalAmount: number;
  fromAddress: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  toAddress: {
    name: string;
    city: string;
    state: string;
    country: string;
  };
  dimensions: {
    length: number;
    width: number;
    height: number;
    weight: number;
    unit: string;
    weightUnit: string;
  };
  trackingNumber?: string;
}

type ViewType = 'card' | 'table' | 'kanban' | 'timeline';

const OpenOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState<ViewType>('card');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null);

  // Mock data - In real app, this would come from API
  const mockOrders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-2024-001',
      productName: 'Wireless Headphones',
      customerName: 'John Doe',
      customerEmail: 'john@example.com',
      status: 'processing',
      priority: 'high',
      createdDate: '2024-01-15',
      estimatedDelivery: '2024-01-20',
      totalAmount: 299.99,
      fromAddress: { name: 'Tech Store', city: 'New York', state: 'NY', country: 'USA' },
      toAddress: { name: 'John Doe', city: 'Los Angeles', state: 'CA', country: 'USA' },
      dimensions: { length: 8, width: 6, height: 3, weight: 1.2, unit: 'in', weightUnit: 'lb' },
      trackingNumber: 'TRK123456789'
    },
    {
      id: '2',
      orderNumber: 'ORD-2024-002',
      productName: 'Gaming Laptop',
      customerName: 'Jane Smith',
      customerEmail: 'jane@example.com',
      status: 'pending',
      priority: 'medium',
      createdDate: '2024-01-16',
      estimatedDelivery: '2024-01-25',
      totalAmount: 1299.99,
      fromAddress: { name: 'Computer Hub', city: 'Austin', state: 'TX', country: 'USA' },
      toAddress: { name: 'Jane Smith', city: 'Seattle', state: 'WA', country: 'USA' },
      dimensions: { length: 15, width: 10, height: 2, weight: 4.5, unit: 'in', weightUnit: 'lb' }
    },
    {
      id: '3',
      orderNumber: 'ORD-2024-003',
      productName: 'Smart Watch',
      customerName: 'Mike Johnson',
      customerEmail: 'mike@example.com',
      status: 'shipped',
      priority: 'low',
      createdDate: '2024-01-12',
      estimatedDelivery: '2024-01-18',
      totalAmount: 399.99,
      fromAddress: { name: 'Gadget Store', city: 'Chicago', state: 'IL', country: 'USA' },
      toAddress: { name: 'Mike Johnson', city: 'Miami', state: 'FL', country: 'USA' },
      dimensions: { length: 4, width: 4, height: 1, weight: 0.3, unit: 'in', weightUnit: 'lb' },
      trackingNumber: 'TRK987654321'
    },
    {
      id: '4',
      orderNumber: 'ORD-2024-004',
      productName: 'Bluetooth Speaker',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah@example.com',
      status: 'delivered',
      priority: 'medium',
      createdDate: '2024-01-10',
      estimatedDelivery: '2024-01-15',
      totalAmount: 149.99,
      fromAddress: { name: 'Audio Plus', city: 'Denver', state: 'CO', country: 'USA' },
      toAddress: { name: 'Sarah Wilson', city: 'Portland', state: 'OR', country: 'USA' },
      dimensions: { length: 6, width: 4, height: 4, weight: 2.1, unit: 'in', weightUnit: 'lb' },
      trackingNumber: 'TRK456789123'
    }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setOrders(mockOrders);
        setFilteredOrders(mockOrders);
      } catch (error) {
        setToast({ message: 'Failed to load orders', type: 'error' });
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(order => order.priority === priorityFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, priorityFilter]);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      urgent: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const handleOrderUpdate = (orderId: string, updates: Partial<Order>) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updates } : order
    ));
    setToast({ message: 'Order updated successfully', type: 'success' });
  };

  const renderViewSelector = () => (
    <div className="flex space-x-2">
      <button
        onClick={() => setViewType('card')}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
          viewType === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
        </svg>
        <span>Cards</span>
      </button>
      
      <button
        onClick={() => setViewType('table')}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
          viewType === 'table' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd"/>
        </svg>
        <span>Table</span>
      </button>
      
      <button
        onClick={() => setViewType('kanban')}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
          viewType === 'kanban' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h3a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM10 4a1 1 0 011-1h3a1 1 0 011 1v9a1 1 0 01-1 1h-3a1 1 0 01-1-1V4z"/>
        </svg>
        <span>Kanban</span>
      </button>
      
      <button
        onClick={() => setViewType('timeline')}
        className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
          viewType === 'timeline' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
        </svg>
        <span>Timeline</span>
      </button>
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <LoadingSpinner size="lg" />
        </div>
      );
    }

    switch (viewType) {
      case 'table':
        return (
          <OrderTable 
            orders={filteredOrders} 
            onOrderUpdate={handleOrderUpdate}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
          />
        );
      case 'kanban':
        return (
          <OrderKanban 
            orders={filteredOrders} 
            onOrderUpdate={handleOrderUpdate}
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
          />
        );
      case 'timeline':
        return (
          <OrderTimeline 
            orders={filteredOrders} 
            getStatusColor={getStatusColor}
            getPriorityColor={getPriorityColor}
          />
        );
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map(order => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onOrderUpdate={handleOrderUpdate}
                getStatusColor={getStatusColor}
                getPriorityColor={getPriorityColor}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Open Orders</h1>
              <p className="text-gray-600 mt-1">Manage and track your orders</p>
            </div>
            
            {/* View Selector */}
            {renderViewSelector()}
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Priorities</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {filteredOrders.length === 0 && !loading ? (
            <div className="text-center py-12">
              <div className="mx-auto h-12 w-12 text-gray-400">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            renderContent()
          )}
        </div>

        {/* Toast */}
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default OpenOrders;
