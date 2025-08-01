import { Order } from './OpenOrders';

interface OrderTableProps {
  orders: Order[];
  onOrderUpdate: (orderId: string, updates: Partial<Order>) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const OrderTable: React.FC<OrderTableProps> = ({ 
  orders, 
  onOrderUpdate, 
  getStatusColor, 
  getPriorityColor 
}) => {
  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    onOrderUpdate(orderId, { status: newStatus });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Order
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Customer
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Route
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                  <div className="text-sm text-gray-500">{order.productName}</div>
                  {order.trackingNumber && (
                    <div className="text-xs text-blue-600 font-mono">{order.trackingNumber}</div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{order.customerName}</div>
                  <div className="text-sm text-gray-500">{order.customerEmail}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm text-gray-900">
                    <span className="text-green-600">From:</span> {order.fromAddress.city}, {order.fromAddress.state}
                  </div>
                  <div className="text-sm text-gray-900">
                    <span className="text-blue-600">To:</span> {order.toAddress.city}, {order.toAddress.state}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                  {order.priority}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                ${order.totalAmount.toFixed(2)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
