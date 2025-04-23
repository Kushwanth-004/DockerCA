import axios from 'axios';

const ACTIVITY_BUFFER_KEY = 'user_activities';
const FLUSH_INTERVAL = 5 * 60 * 1000; // 5 minutes

export const ActivityTypes = {
  PAGE_VIEW: 'page-view',
  PRODUCT_VIEW: 'product-view',
  ADD_TO_CART: 'cart',
  CHECKOUT: 'checkout',
  WISHLIST: 'wishlist',
  LOGIN: 'login',
  REGISTER: 'register'
};

const calculateScore = (type) => {
  const scores = {
    [ActivityTypes.CHECKOUT]: 100,
    [ActivityTypes.ADD_TO_CART]: 70,
    [ActivityTypes.WISHLIST]: 50,
    [ActivityTypes.PRODUCT_VIEW]: 30,
    [ActivityTypes.REGISTER]: 20,
    [ActivityTypes.LOGIN]: 20,
    [ActivityTypes.PAGE_VIEW]: 10
  };
  return scores[type] || 0;
};

const getStoredActivities = () => {
  const stored = localStorage.getItem(ACTIVITY_BUFFER_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const trackActivity = (type, productId = null, user = null) => {
  const activities = getStoredActivities();
  activities.push({
    type,
    productId,
    timestamp: Date.now(),
    score: calculateScore(type)
  });
  localStorage.setItem(ACTIVITY_BUFFER_KEY, JSON.stringify(activities));
};

const flushActivities = async (user) => {
  const activities = getStoredActivities();
  if (activities.length === 0) return;

  try {
    await axios.post('/api/activities/batch', {
      activities,
      userId: user?._id,
      email: user?.email
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    localStorage.removeItem(ACTIVITY_BUFFER_KEY);
  } catch (error) {
    console.error('Failed to flush activities:', error);
  }
};

// Auto-flush every 5 minutes
setInterval(() => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  flushActivities(user);
}, FLUSH_INTERVAL);

// Flush on page unload
window.addEventListener('beforeunload', () => {
  const user = JSON.parse(localStorage.getItem('user')) || null;
  flushActivities(user);
});