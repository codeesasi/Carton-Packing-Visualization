import { Order } from './OpenOrders';

interface OrderTimelineProps {
  orders: Order[];
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const OrderTimeline: React.FC<OrderTimelineProps> = ({ 
  orders, 
  getStatusColor, 
  getPriorityColor 
}) => {
  const sortedOrders = [...orders].sort((a, b) => 
    new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
  );

  const getTimelineIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return (
          <div className="w-4 h-4 bg-yellow-400 rounded-full border-2 border-white shadow"></div>
        );
      case 'processing':
        return (
          <div className="w-4 h-4 bg-blue-400 rounded-full border-2 border-white shadow"></div>
        );
      case 'shipped':
        return (
          <div className="w-4 h-4 bg-purple-400 rounded-full border-2 border-white shadow"></div>
        );
      case 'delivered':
        return (
          <div className="w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow"></div>
        );
      case 'cancelled':
        return (
          <div className="w-4 h-4 bg-red-400 rounded-full border-2 border-white shadow"></div>
        );
      default:
        return (
          <div className="w-4 h-4 bg-gray-400 rounded-full border-2 border-white shadow"></div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-gray-200"></div>
        
        {sortedOrders.map((order, index) => (
          <div key={order.id} className="relative flex items-start space-x-4 pb-6">
            {/* Timeline icon */}
            <div className="relative z-10 flex items-center justify-center">
              {getTimelineIcon(order.status)}
            </div>
            
            {/* Content */}
            <div className="flex-1 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{order.orderNumber}</h3>
                  <p className="text-sm text-gray-600">{order.productName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Created on {new Date(order.createdDate).toLocaleDateString()} at{' '}
                    {new Date(order.createdDate).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(order.priority)}`}>
                    {order.priority}
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Customer</p>
                  <p className="text-sm text-gray-600">{order.customerName}</p>
                  <p className="text-xs text-gray-500">{order.customerEmail}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Route</p>
                  <p className="text-sm text-gray-600">
                    <span className="text-green-600">From:</span> {order.fromAddress.city}, {order.fromAddress.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="text-blue-600">To:</span> {order.toAddress.city}, {order.toAddress.state}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-700">Details</p>
                  <p className="text-sm text-gray-600">Amount: <span className="font-semibold text-green-600">${order.totalAmount.toFixed(2)}</span></p>
                  <p className="text-sm text-gray-600">
                    Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                  </p>
                  {order.trackingNumber && (
                    <p className="text-xs text-blue-600 font-mono mt-1">{order.trackingNumber}</p>
                  )}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    Dimensions: {order.dimensions.length}" × {order.dimensions.width}" × {order.dimensions.height}" 
                    ({order.dimensions.weight} {order.dimensions.weightUnit})
                  </span>
                  <span className="text-gray-500">
                    {index === 0 ? 'Latest' : `${index + 1} of ${sortedOrders.length}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {sortedOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto h-12 w-12 text-gray-400">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders in timeline</h3>
          <p className="mt-1 text-sm text-gray-500">Orders will appear here as they are created.</p>
        </div>
      )}
    </div>
  );
};

export default OrderTimeline;
