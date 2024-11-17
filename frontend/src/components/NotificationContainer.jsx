import React from 'react';

const NotificationContainer = ({ notifications }) => {
  return (
    <div className="notificationContainer">
      {notifications.map((notification, index) => (
        <div key={index} className="notification">
          {notification}
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
