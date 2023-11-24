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



async function show(req, res, next) {

    const { id } = req.params;

    const data = await prisma.post.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            tags: true,
            categories: true,
        },
    });

    if (!data) {

        return next(new NotFound("Post not found."));
    }

    return res.json(data);
}



module.exports = {
    store,
    show
};