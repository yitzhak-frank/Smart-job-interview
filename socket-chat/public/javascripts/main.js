const socket = io.connect();

const MSG_SENT_EVENT = 'messageSent', MSG_RECEIVED_EVENT = 'messageReceived', SEND_BTN_SELECTOR = '.send';

let clientName, msg;

// On load run this function.
$(() => {
    // Listen to user clicks on send button.
    $(SEND_BTN_SELECTOR).on('click', sendMessage);
    socketListener();
});

const sendMessage = () => {
    // Get the message text and if empty return.
    const input = $('.message');
    if(!input.val()) return;

    setMessage(input);
    setElementsText(input);
    socket.emit(MSG_SENT_EVENT, msg);
}

// Set the message according to whether the user gave his name.
const setMessage = input => {
    if(isNameSent()) {
        msg = `${clientName}: ${input.val()}\n`;
    } else {
        clientName = input.val();
        msg = `${clientName} joined the room!\n`;
    }
    input.val('');
}

// Set the text of the button and placeholder, after the user gave his name.
const setElementsText = input => {
    const sendButton = $(SEND_BTN_SELECTOR);
    const sendButtonText = 'Send Message';

    if(!isNameSent() || sendButton.val() === sendButtonText) return;

    sendButton.html(sendButtonText);
    input.attr('placeholder', 'Enter Message');
}

// Listen to message received and update the chat box.
const socketListener = () => socket.on(MSG_RECEIVED_EVENT, msg => $('textarea').append(msg));

const isNameSent = () => !!clientName;
