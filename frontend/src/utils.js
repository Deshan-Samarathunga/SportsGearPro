import moment from "moment"

export const analyze = (text) => {
    text = text.toLowerCase(); // Make the text lowercase to handle case-insensitivity.

    if (text.includes('hi') || text.includes('hello') || text.includes('hey')) {
        return 'Hi! Welcome to our food delivery service. How can I assist you today?';
    } 
    else if (text.includes('order status')) {
        return 'You can track your order status by visiting the "My Orders" section in your account.';
    } 
    else if (text.includes('delivery time')) {
        return 'Delivery typically takes 30-45 minutes. You can check the exact time by going to your orders page.';
    } 
    else if (text.includes('menu') || text.includes('food')) {
        return 'You can browse our full menu on the homepage under the "Menu" section.';
    } 
    else if (text.includes('payment methods') || text.includes('payment options')) {
        return 'We accept credit/debit cards, net banking, and popular e-wallets like PayPal.';
    } 
    else if (text.includes('cancel order')) {
        return 'To cancel your order, please visit the "My Orders" section or contact our customer support.';
    } 
    else if (text.includes('date')) {
        return moment().format('MMM Do YYYY');
    } 
    else if (text.includes('time')) {
        return moment().format('h:mm:ss a');
    } 
    else if (text.includes('thank you') || text.includes('thanks')) {
        return 'Thank you for choosing us! Have a great day!';
    } 
    else if (text.includes('support') || text.includes('customer service')) {
        return 'You can reach our customer support at support@fooddelivery.com or call us at 1-800-FOOD';
    }
    return "I'm sorry, I didn't understand that. Can you please rephrase your question?";
};