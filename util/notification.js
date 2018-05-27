import React from "react";
import { View, StyleSheet, AsyncStorage } from "react-native";
import { Notifications, Permissions } from "expo";

const NOTIFICATION_KEY = "thio.notifications";

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
    Notifications.cancelAllScheduledNotificationsAsync
  );
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then(data => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === "granted") {
            Notifications.cancelAllScheduledNotificationsAsync();

            // lets remind at 8pm every day
            let nextDate = new Date();
            nextDate.setDate(nextDate.getDate()+1);
            nextDate.setHours(20);
            nextDate.setMinutes(0);

            Notifications.scheduleLocalNotificationAsync(createNotification(), {
              time: nextDate,
              repeat: "day"
            });

            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
          }
        });
      }
    });
}

function createNotification() {
  return {
    title: "⌛ Quiz Time! ⌛",
    body: "⌛⌛⌛⌛QUIZTIME!⌛⌛⌛⌛",
    sound: true,
    priority: "high",
    sticky: false,
    vibrate: true
  };
}
