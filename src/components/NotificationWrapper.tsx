import React from "react";
import { notification } from "antd";

const NotificationWrapper = {
  success: (content: string) => {
    notification.success({
      message: content,
      duration: 3,
    });
  },
  error: (content: string) => {
    notification.error({
      message: content,
      duration: 3,
    });
  },
  info: (content: string) => {
    notification.info({
      message: content,
      duration: 3,
    });
  },
  warning: (content: string) => {
    notification.warning({
      message: content,
      duration: 3,
    });
  },
};

export default NotificationWrapper;