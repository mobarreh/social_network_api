const { User, Thought } = require("../models");

module.exports = {
    // GET all users
    async getUsers(req, res) {
      try {
        const users = await User.find();
  
        res.json(users);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // GET a single user
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId })
          .select('-__v');
  
        if (!user) {
          return res.status(404).json({ message: 'Not Found' })
        };
  
        res.json({
          user,
        });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const user = await User.create(req.body);
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    async updateUser(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          res.status(404).json({ message: 'Not Found' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // DELETE user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndRemove({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'Not Found' });
        }
  
        const thought = await Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
        });
  
        if (!thought) {
          return res.status(404).json({
            message: 'User deleted, but no thoughts found',
          });
        }
  
        res.json({ message: 'User deleted' });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
    },
  
    // ADD a friend to a user
    async addFriend(req, res) {
      console.log('Adding friend');
      console.log(req.body);
  
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.body.friendId } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Not found a user' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // DELETE friend from a user
    async removeFriend(req, res) {
      try {
        const user = await User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.body.friendId } },
          { runValidators: true, new: true }
        );
  
        if (!user) {
          return res
            .status(404)
            .json({ message: 'Not found a user' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };
  