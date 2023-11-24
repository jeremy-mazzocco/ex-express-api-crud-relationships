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
        const newCategory = await prisma.category.create({
            data: {
                name: inputData.name,
            },
        });

        return res.json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        return res.status(500).json({ error: "Error creating category" });
    }
}

module.exports = {
    store,
};
