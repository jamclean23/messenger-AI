// Controller for chat routes


// ====== IMPORTS ======

const addRoom = require('../functions/addRoom.js');
const getRoomById = require('../functions/getRoomById.js');
const addInviteToUserByName = require('../functions/addInviteToUserByName.js');


// ====== FUNCTIONS ======

async function chatPage (req, res) {
    const room = await getRoomById(req.params.roomId);
    console.log('ROOM OBJECT');
    console.log(room);
    res.render('chat', { chatName: room.name, roomId: req.params.roomId, userId: req.user.id, username: req.user.username});
}

async function startChat (req, res) {
    const newRoomId = await addRoom(req.user._id);    
    res.redirect(`/chat/${newRoomId}`);
}

async function getRoomObj (req, res) {
    if (!req.params.roomId) {
        res.status(404).json({
            msg: 'Id not provided'
        });
    }

    try {
        res.json(await getRoomById(req.params.roomId));
    } catch (err) {
        res.json({
            msg: 'Room not found with provided id'
        });
    }
}

async function sendInvite (req, res) {
    const recipient = req.params.recipient;
    const roomId = req.body.roomId;

    const result = await addInviteToUserByName(req.user.username, recipient, roomId);

    if (result) {
        res.json({
            msg: 'Success'
        });
    } else {
        res.json({
            msg: 'Failed'
        });
    }
}

// NOT USED IN CURRENT IMPLEMENTATION, SEE SOCKET CONTROLLER
async function addMessage (req, res) {
    console.log('***\nAdd Message');

    const roomId = req.params.roomId;
    const message = req.body.msg;
    const userId = req.user.id;
    const username = req.user.username;
    
    let room;
    if (roomId && message && userId) {
        try {
            room = await getRoomById(roomId);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                msg: 'Room not found'
            });
        }

        room.messages.push({
            user: userId,
            content: message,
            username: username
        });

        try {
            await room.save();
        } catch (err) {
            console.log(err);
        }
        res.status(200).json({
            msg: 'Message added successfully',
            success: true
        });
    } else if (!roomId) {
        res.status(400).json({
            msg: 'Room Id not provided',
            success: false
        });        
    } else if (!message) {
        res.status(400).json({
            msg: 'Cannot send an empty message',
            success: false
        });
    }else if (!userId) {
        res.status(400).json({
            msg: 'Missing uid',
            success: false
        });
    } else {
        res.status(400).json({
            msg: 'An unknown Error occurred',
            success: false
        });
    }
}


// ====== EXPORTS ======

module.exports = {
    chatPage,
    startChat,
    getRoomObj,
    addMessage,
    sendInvite
}