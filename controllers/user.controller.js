import followModel from "../model/follow.model.js";
import User from "../model/user.model.js";
async function followController(req, res) {
  const followerUserName = req.user.userName;
  const followeeUserName = req.params.userName;

  if (followeeUserName == followerUserName) {
    return res.status(400).json({
      message: "You can't follow yourself",
    });
  }

  const isFolloweeExists = await User.findOne({
    userName: followeeUserName,
  });
  if (!isFolloweeExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });
  if (isFollowing) {
    return res.status(409).json({
      message: "You are already following this user",
    });
  }

  const followRecord = await followModel.create({
    follower: followerUserName,
    followee: followeeUserName,
  });
  res.status(201).json({
    message: `you are now following ${followeeUserName}`,
    follow: followRecord,
  });
}

async function unfollowController(req, res) {
  const followerUserName = req.user.userName;
  const followeeUserName = req.params.userName;
  const isUserExists = await User.findOne({
    userName: followeeUserName,
  });
  if (!isUserExists) {
    return res.status(404).json({
      message: "User not found",
    });
  }
  if (followeeUserName == followerUserName) {
    return res.status(400).json({
      message: "You can't unfollow or follow yourself",
    });
  }
  const isFollowing = await followModel.findOne({
    follower: followerUserName,
    followee: followeeUserName,
  });
  if (!isFollowing) {
    return res.status(404).json({
      message: "You are not following this user",
    });
  }
  const unfollowRecord = await followModel.deleteOne({
    follower: followerUserName,
    followee: followeeUserName,
  });
  res.status(200).json({
    message: `you are now unfollowing ${followeeUserName}`,
    unfollow: unfollowRecord,
  });
}

export default { followController, unfollowController };
