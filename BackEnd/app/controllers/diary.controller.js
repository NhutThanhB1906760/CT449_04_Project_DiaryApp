const ApiError = require("../api-error");
const MongoDB = require("../utils/mongodb.util");
const DiaryService = require("../services/diary.service");

//Diary
exports.create = async (req, res, next) => {
    if (!req.body?.title) {
        return next(new ApiError(400, "Title can not be empty"));
    }

    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        const document = await diaryService.create(req.body);
        
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the diary")
        );
    }
}

exports.findAll = async (req, res, next) => {
    let documents = []

    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        // const { phone } = req.query;
        documents = await diaryService.find({});

        // else{
        //     documents = await diaryService.find({})
        // }
    }
    catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        const document = await diaryService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Diary not found"));
        }
        return res.send(document);
    }
    catch (error) {
        return next(
            new ApiError(500, `Error retrieving diary with id=${req.parmas.id}`)
        );
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }

    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        const document = await diaryService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Diary not found"));
        }
        return res.send({ message: "Diary was updated successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating diary with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        const document = await diaryService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(404, "Diary not found"));
        }
        return res.send({ message: "Diary was deleted successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Could not delete diary with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        
        if(req.body){
            const deletedCount = await diaryService.deleteAll(req.body);
            return res.send({
                message: `${deletedCount} diary were deleted successfully`
            });}
        
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all diary")
        );
    }
};

exports.dropCollection = async (req, res, next) => {
    try {
        const diaryService = new DiaryService(MongoDB.client,req.params.name);
        const kq= await diaryService.drop()
        return res.send(kq)
        
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while removing all diary")
        );
    }
};


