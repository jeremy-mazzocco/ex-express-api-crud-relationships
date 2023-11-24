const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();



async function store(req, res, next) {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
        return next(
            new ValidationError("Check your data", validation.array())
        );
    }

    const inputData = req.body;

    try {
        const newTag = await prisma.tag.create({
            data: {
                name: inputData.name,
                fake: inputData.fake,
                liked: inputData.liked,
            },
        });

        return res.json(newTag);
    } catch (error) {
        console.error("Error creating tag:", error);
        return res.status(500).json({ error: "Error creating tag" });
    }
}

module.exports = {
    store,
};
