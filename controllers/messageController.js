
import Message from "../models/Message.js";


export const getPrivateMessages = async (req, res) => {
    const { senderId, receiverId } = req.body;
    console.log(senderId, receiverId, "details")
    console.log(`Sender ID: ${senderId}, Receiver ID: ${receiverId}`);

    try {
        const messages = await Message.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        }).sort({ timestamp: 1 }); // Sorting by timestamp in ascending order

        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching private messages:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

export const sendPrivateMessage = async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    try {
        const newMessage = new Message({ senderId, receiverId, message });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error sending private message:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
