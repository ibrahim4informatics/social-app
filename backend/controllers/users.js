import uuidValidator from "../helpers/validation/uuidValidator.js";
import prisma from '../config/prisma.config.js';
const getUserProfile = async (req, res) => {
    const { user_id: id } = req;
    try {
      const { password, ...user } = await prisma.user.findUnique({
        where: { id },
        include: {
          posts: {
            include: { comments: { include: { user: true } } },
          },
        },
      });
      if (!user) throw new Error("user doesn't exist");
      return res.status(200).json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err || "unknown server error" });
    }
  }


  const sendUserFriendRequest = async (req, res) => {
    //* curent user id
    const { user_id: id } = req;
    //* receiver user id
    const receiver_id = req.body.rid;
    //* check receiver user id to be uuid to protect
    if (!uuidValidator(receiver_id) || id === receiver_id)
      return res.status(400).json({ msg: "invalid data" });
    try {
      //* make sure that the reciever does not received previous friend request and is not already a friend
      const ruser = await prisma.user.findUnique({
        where: { id: receiver_id, friendof: { none: { id } } },
      });
      if (!ruser)
        return res
          .status(404)
          .json({ msg: "can not send freind request to this user" });
      //* updating curent user to add the receiver to his friends
      await prisma.user.update({
        where: { id },
        data: { firends: { connect: { id: ruser.id } } },
      });
      //* returning status of 200 and success message
      return res.status(200).json({ msg: "friend request sent" });
    } catch (err) {
      return res.status(500).json({ msg: err || "unknowm server error" });
    }
  }

  const acceptUserFriendRequest = async (req, res) => {
    //* curent user id
    const { user_id: id } = req;
    //* the id of the user who sent a freind request
    const sender_id = req.body.sid;
    //* validating the id with function to protect
    if (!uuidValidator(sender_id) || id === sender_id)
      return res.status(400).json({ msg: "invalid data" });
    try {
      //* get sender user and make sure that is not already a friend and make sure that is send a request to the current user
      const suser = await prisma.user.findUnique({
        where: {
          id: sender_id,
          friendof: { none: { id } },
          firends: { some: { id } },
        },
      });
      if (!suser)
        return res
          .status(404)
          .json({ msg: "can not accept freind request to this user" });
      //* updating the sender user and make the current user a friend to him (accepting process)
      await prisma.user.update({
        where: { id: sender_id },
        data: { friendof: { connect: { id } } },
      });
      //* returning a status of 200 of success
      return res.status(200).json({ msg: "friend request accepted" });
    } catch (err) {
      //* hundling unexprected errors
      return res.status(500).json({ msg: err || "unknowm server error" });
    }
  }


  const deleteUserProfile =  async (req, res) => {
    const { user_id } = req;
    try {
      await prisma.user.delete({ where: { id: user_id } });
      res.cookie("access-token", null, { maxAge: 0 });
      res.cookie("refresh-token", null, { maxAge: 0 });
      return res.status(200).json({ msg: `user deleted successfully` });
    } catch (err) {
      return res.status(500).json({ msg: err || `unknown server error` });
    }
  }

  const getUserFriendsList = async (req, res) => {
    const { user_id } = req;
    const { username, first_name, last_name } = req.query;
    try {
      // const friends = [];
      const friends = await prisma.user.findMany({
        where: {
          ...(username ? { username: { contains: username } } : {}),
          ...(first_name ? { first_name: { contains: first_name } } : {}),
          ...(last_name ? { last_name: { contains: last_name } } : {}),
          AND: {
            firends: { some: { id: user_id } },
            friendof: { some: { id: user_id } },
          },
        },
        select: { id: true, first_name: true, last_name: true, username: true },
      });
      return res.status(200).json({ friends });
    } catch (err) {
      return res.status(500).json({ msg: err || "unknown server error" });
    }
  }

  const getSingleUserProfile = async (req, res) => {
    const { id } = req.params;
    const { user_id } = req;
    if(!uuidValidator(id)) return res.status(400).json({msg:`invalid param`})
    if (id === user_id) return res.status(302).json({ msg: 'need to go to profile route' })
    try {
      const { password, email, ...user } = await prisma.user.findUnique({
        where: {
          id
        },
        include: { firends: true, friendof: true, posts: { include: { comments: { include: { user: { select: { id: true, first_name: true, last_name: true, username: true } } } } } } }
      })
  
      return res.status(200).json({ user })
    }
    catch (err) {
      return res.status(500).json({ msg: err || `uknown server error` });
    }
  }

export {
    getUserProfile, sendUserFriendRequest, acceptUserFriendRequest, 
    deleteUserProfile, getUserFriendsList, getSingleUserProfile
}