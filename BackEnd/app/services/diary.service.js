const { ObjectId } = require("mongodb");

class DiaryService {
    constructor(client,name) {
        this.Diary = client.db().collection(name);
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractContactData(payload) {
        const diary = {
            title: payload.title,
            time: payload.time,
            content: payload.content,
        };
        // remove undefined fields.
        Object.keys(diary).forEach(
            (key) => diary[key] === undefined && delete diary[key]
        );
        return diary;
    }
    
    async create(payload) {
        const diary = this.extractContactData(payload);
        diary.time=new Date();
            const result = await this.Diary.findOneAndUpdate(
                diary,
                { $set: diary },
                { returnDocument: "after", upsert: true }
            );
            return result.value;
    }
    
    async find(filter){
        const cursor = await this.Diary.find(filter).sort({time:1});
        return await cursor.toArray();
    }

    async findByName(phone){
        return await this.find({phone: {$regex: new RegExp(phone), $options: "i"},});
    }

    async findById(id){
        return await this.Diary.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Diary.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result.value;
        }
    
        async delete(id) {
            const result = await this.Diary.findOneAndDelete({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result.value;
        }
        async deleteAll(filter) {
            const result = await this.Diary.deleteMany(filter);
            return result.deletedCount;
        }
        async drop(){
            const result = await this.Diary.drop()
            return result
        }
}

module.exports = DiaryService;