const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const NotFound = require("../exceptions/NotFound");
const ValidationError = require("../exceptions/ValidationError");



async function store(req, res, next) {

    const validation = validationResult(req);

    if (!validation.isEmpty()) {

        return next(
            new ValidationError("Check your data", validation.array())
        );
    }

    const inputData = req.body;

    const newPost = await prisma.post.create({
        data: {
            slug: inputData.slug,
            image: inputData.image,
            content: inputData.content,
            published: inputData.published,
            category: {
                connect: { id: inputData.categoryID },
            },
            tags: {
                connect: inputData.tags.map((idTag) => ({
                    id: idTag,
                })),
            },
        },
        include: {
            category: true,
            tags: true,
        },
    });

    return res.json(newPost);
}





module.exports = {
    store,
};