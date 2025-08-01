import { Order } from './OpenOrders';

interface OrderCardProps {
  order: Order;
  onOrderUpdate: (orderId: string, updates: Partial<Order>) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const OrderCard: React.FC<OrderCardProps> = ({ 
  order, 
  onOrderUpdate, 
  getStatusColor, 
  getPriorityColor 
}) => {
  const handleStatusChange = (newStatus: Order['status']) => {
    onOrderUpdate(order.id, { status: newStatus });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
            <p className="text-sm text-gray-600">{order.productName}</p>
          </div>
          <div className="flex space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
              {order.priority}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-700">Customer</p>
            <p className="text-sm text-gray-600">{order.customerName}</p>
            <p className="text-xs text-gray-500">{order.customerEmail}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">From</p>
              <p className="text-xs text-gray-600">{order.fromAddress.city}, {order.fromAddress.state}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">To</p>
              <p className="text-xs text-gray-600">{order.toAddress.city}, {order.toAddress.state}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Created</p>
              <p className="text-xs text-gray-600">{new Date(order.createdDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Estimated Delivery</p>
              <p className="text-xs text-gray-600">{new Date(order.estimatedDelivery).toLocaleDateString()}</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-700">Amount</p>
            <p className="text-lg font-semibold text-green-600">${order.totalAmount.toFixed(2)}</p>
          </div>

          {order.trackingNumber && (
            <div>
              <p className="text-sm font-medium text-gray-700">Tracking Number</p>
              <p className="text-sm text-blue-600 font-mono">{order.trackingNumber}</p>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Update Status</label>
          <select
            value={order.status}
            onChange={(e) => handleStatusChange(e.target.value as Order['status'])}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
