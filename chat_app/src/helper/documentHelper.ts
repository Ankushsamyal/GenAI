import { context, MAX_TOKEN, encode } from '../index'

export function deleteOlderMessages() {
    let contextLength = getContextLength();
    while (contextLength > MAX_TOKEN) {
        for (let i = 0; i < context.length; i++) {
            const message = context[i];
            if (message.role != 'system') {
                context.splice(i, 1);
                contextLength = getContextLength();
                console.log('New context lenght' + contextLength)
                break;
            }
        }
    }
}

export function getContextLength() {
    let length = 0;
    context.forEach((message) => {
        if (typeof message.content == 'string') {
            length += encode.encode(message.content).length;
        } else if (Array.isArray(message.content)) {
            message.content.forEach((messageContent) => {
                if (messageContent.type == 'text') {
                    length += encode.encode(messageContent.text).length;
                }
            })
        }
    })
    return length;
}