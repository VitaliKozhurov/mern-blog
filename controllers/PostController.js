import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
   try {
      const posts = await PostModel.find().populate('user').exec();

      res.json(posts);
   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'Не удалось получить статьи'
      })
   }
}

export const getOne = async (req, res) => {
   try {
      const postId = req.params.id;

      const post = await PostModel.findOneAndUpdate(
         {
            _id: postId,
         },
         {
            $inc: { viewsCount: 1 },
         },
         {
            returnDocument: 'after',
         },
      )
      console.log(post)

      if (!post) {
         console.log(error);
         res.status(500).json({
            message: 'Не удалось получить статью'
         })
      }
      res.json(post);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'Не удалось получить статью'
      })
   }
}


export const create = async (req, res) => {

   try {
      const doc = new PostModel({
         title: req.body.title,
         text: req.body.text,
         tags: req.body.tags,
         imageUrl: req.body.imageUrl,
         user: req.userId,
      })

      const post = await doc.save();
      res.json(post);

   } catch (error) {
      console.log(error);
      res.status(500).json({
         message: 'Не удалось создать статью'
      })
   }
}