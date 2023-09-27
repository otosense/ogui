import React, { memo } from 'react';
import { ToastContainer, toast, ToastContent, Bounce, Flip, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            transition={Zoom}
        />
    );
}

// Define a type for the toast methods you'll use
type ToastMethods = {
    success: (content: ToastContent, options?: object) => React.ReactText;
    error: (content: ToastContent, options?: object) => React.ReactText;
    info: (content: ToastContent, options?: object) => React.ReactText;
    // Add more types as needed
};

// Use the type for toast methods
const toastMethods: ToastMethods = toast;

// Define the showToast function with the correct type
export function showToast(message: ToastContent = '', type: keyof ToastMethods = 'success', customId = 1) {
    toastMethods[type](message, {
        toastId: customId
    });
}

export default memo(Toast);
