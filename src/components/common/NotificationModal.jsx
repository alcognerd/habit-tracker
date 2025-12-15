import { useNotification } from "../../context/NotificationContext";
import { motion } from "framer-motion";

const NotificationModal = () => {
  const { showModal, requestNotificationAccess, dismissModal } =
    useNotification();

  if (!showModal) return null;

  return (
    <div className="absolute top-16 right-4 z-[9999]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="bg-white dark:bg-zinc-900 border border-neutral-700 shadow-xl rounded-xl p-4 w-72">
        <h2 className="text-lg font-semibold mb-1 text-white">
          Enable Notifications
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Allow notifications so you get instant updates.
        </p>

        <div className="flex justify-end gap-3">
          <button
            className="px-3 py-1.5 bg-gray-300 dark:bg-gray-700 rounded-md"
            onClick={dismissModal}>
            Later
          </button>

          <button
            className="px-3 py-1.5 bg-blue-600 text-white rounded-md"
            onClick={requestNotificationAccess}>
            Allow
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotificationModal;
