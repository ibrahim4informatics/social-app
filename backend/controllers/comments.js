const createComment = async (req, res) => {
    const { user_id } = req;
    const { post_id, content } = req.body;
    if (!uuidValidator(post_id)) return res.status(400).json({ msg: "invalid data" });
    try {
        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(400).json({ msg: "can not perform this action" });
        const post = await prisma.post.findUnique({ where: { id: post_id, user: { followers: { some: { id: user_id } } } } });
        if (!post) return res.status(404).json({ msg: "can not fin post" });
        const comment = await prisma.comment.create({ data: { content: sanitize(content) || null, user_id, post_id } });
        return res.status(201).json({ comment });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
const updateCommentById = async (req, res) => {
    const { user_id } = req;
    const { id } = req.params;
    const { content } = req.body;
    if (!uuidValidator(user_id) || !uuidValidator(id)) return res.status(400).json({ msg: "invalid params passed" });
    const criteriaComment = { id, user_id };
    try {

        const user = await prisma.user.findUnique({ where: { id: user_id } });
        if (!user) return res.status(403).json({ msg: "can not perform this action" });
        const comment = await prisma.comment.findUnique({ where: criteriaComment });
        if (!comment) return res.status(404).json({ msg: "can not find comment" });

        await prisma.comment.update({ where: criteriaComment, data: { content: sanitize(content) } });
        return res.status(200).json({ msg: "comment update suceess" });

    }
    catch (err) {
        return res.status(500).json({ msg: err || "unknown server error" });
    }
}
const deleteCommentById = async (req, res) => {
    const { user_id } = req;
    const { id } = req.params;
    if (!uuidValidator(id)) return res.status(400).json({ msg: "invalid url parameter" });
    const commentCrieria = { id: sanitize(id), user_id: sanitize(user_id) }
    try {
        const comment = await prisma.comment.findUnique({ where: commentCrieria });
        if (!comment) return res.status(404).json({ msg: "can not find this comment" });
        await prisma.comment.delete({ where: commentCrieria });
        return res.status(200).json({ msg: "comment delete success" });
    }
    catch (err) {
        return res.sendStatus(500).json({ msg: err || "unknown server error" });
    };
}





export { createComment, updateCommentById,deleteCommentById }