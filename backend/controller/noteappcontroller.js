    const notemodel=require('../models/noteappmodel')

    const notecreate=async (req, res) => {
    try {
        const { title, description } = req.body;
        const lastNote = await notemodel.findOne().sort({ userId: -1 });
        const newUserId = lastNote ? lastNote.userId + 1 : 1;
        const newNote = await notemodel.create({
            userId: newUserId,
            title,
            description
        });

        res.status(201).json({
            success: true,
            message: "Note created successfully",
            data: newNote
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

    const getall=async (req, res) => {
        try {
            const notes = await notemodel.find();
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    const search = async (req, res) => {
        try {
            const { title } = req.query;
            const notes = await notemodel.find({
                title: { $regex: title, $options: "i" } 
            });
            res.status(200).json(notes);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    module.exports={notecreate,getall,search}