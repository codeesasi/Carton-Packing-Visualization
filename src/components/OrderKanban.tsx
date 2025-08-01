import { Order } from './OpenOrders';

interface OrderKanbanProps {
  orders: Order[];
  onOrderUpdate: (orderId: string, updates: Partial<Order>) => void;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const OrderKanban: React.FC<OrderKanbanProps> = ({ 
  orders, 
  onOrderUpdate, 
  getStatusColor, 
  getPriorityColor 
}) => {
  const statuses: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  const getOrdersByStatus = (status: Order['status']) => {
    return orders.filter(order => order.status === status);
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    onOrderUpdate(orderId, { status: newStatus });
  };

  const statusConfig = {
    pending: { title: 'Pending', color: 'border-yellow-200 bg-yellow-50' },
    processing: { title: 'Processing', color: 'border-blue-200 bg-blue-50' },
    shipped: { title: 'Shipped', color: 'border-purple-200 bg-purple-50' },
    delivered: { title: 'Delivered', color: 'border-green-200 bg-green-50' },
    cancelled: { title: 'Cancelled', color: 'border-red-200 bg-red-50' }
  };

  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {statuses.map((status) => {
        const statusOrders = getOrdersByStatus(status);
        const config = statusConfig[status];
        
        return (
          <div key={status} className={`flex-shrink-0 w-80 border-2 rounded-lg ${config.color}`}>
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {config.title}
                <span className="ml-2 text-sm font-normal text-gray-600">
                  ({statusOrders.length})
                </span>
              </h3>
            </div>
            
            <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
              {statusOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">{order.orderNumber}</h4>
                      <p className="text-xs text-gray-600">{order.productName}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                      {order.priority}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-700">{order.customerName}</p>
                      <p className="text-xs text-gray-500">{order.customerEmail}</p>
                    </div>
                    
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>{order.fromAddress.city} → {order.toAddress.city}</span>
                      <span className="font-medium text-green-600">${order.totalAmount}</span>
                    </div>
                    
                    {order.trackingNumber && (
                      <p className="text-xs text-blue-600 font-mono">{order.trackingNumber}</p>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value as Order['status'])}
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
              
              {statusOrders.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <p className="text-sm">No orders in {config.title.toLowerCase()}</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderKanban;
